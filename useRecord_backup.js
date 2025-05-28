import { postVideo } from "@/api/interviewApi";
import { useMediaDeviceStore } from "@/store/mediaDeviceStore";
import { useRef, useState } from "react";
import { DagloAPI } from "https://actionpower.github.io/dagloapi-js-beta/lib/daglo-api.module.js";

export const useVideoRecord = () => {
  const mediaRecorderRef = useRef(null);
  const { selectedMicId, selectedCameraId } = useMediaDeviceStore();
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  // Voice recording state and refs
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const transcriberRef = useRef(null);
  const voiceStreamRef = useRef(null);
  const transcriptHandlerRef = useRef(null);

  const startVideoRecording = async (interviewId, curNum) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: selectedMicId },
        video: { deviceId: selectedCameraId },
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const filename = `${interviewId}_${curNum}.webm`;
        // 파일 업로드
        await postVideo(blob, filename);

        chunksRef.current = [];
      };
      recorder.start();
    } catch (error) {
      console.error("🎥 녹화 시작 실패", error);
      alert("녹화를 시작할 수 없습니다. 장치 설정을 확인하세요.");
    }
  };

  const stopVideoRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const releaseCamera = () => {
    // 1. 명시적으로 저장된 스트림 해제
    [streamRef.current, voiceStreamRef?.current].forEach((stream) => {
      if (!stream) return;
      stream.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
          console.log(`스트림 트랙(${track.kind}) 해제됨`);
        }
      });
    });

    // 2. 미디어 레코더 정리
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      try {
        mediaRecorderRef.current.stop();
        console.log("미디어 레코더 정지됨");
      } catch (e) {
        console.warn("미디어 레코더 정지 실패:", e);
      }
    }

    // 3. 음성 트랜스크라이버 정리
    if (transcriberRef.current) {
      try {
        transcriberRef.current.on("stop", () => {});
        console.log("음성 트랜스크라이버 정지됨");
      } catch (e) {
        console.warn("음성 트랜스크라이버 정지 실패:", e);
      }
    }

    // 4. 페이지의 모든 미디어 장치 트랙 강제 해제
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => {
          track.stop();
        });

        // 모든 활성 미디어 장치 확인하고 강제 해제
        if (typeof navigator.mediaDevices.enumerateDevices === "function") {
          navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
              console.log("모든 미디어 장치 해제 시도");
            })
            .catch((err) => console.warn("장치 열거 실패:", err));
        }
      })
      .catch((err) => console.warn("미디어 스트림 접근 실패:", err));

    // 5. 참조 초기화
    streamRef.current = null;
    voiceStreamRef.current = null;
    mediaRecorderRef.current = null;
    transcriberRef.current = null;
    transcriptHandlerRef.current = null;

    // 6. 음성 녹음 상태 리셋
    setIsRecording(false);

    console.log("모든 미디어 장치 연결 해제 완료");
  };

  // const releaseCamera = (...streams) => {
  //   streams.forEach((stream) => {
  //     if (!stream) return;
  //     stream.getTracks().forEach((track) => {
  //       if (track.readyState === "live") {
  //         try {
  //           track.stop();
  //         } catch (e) {
  //           console.warn("트랙 정지 실패:", e);
  //         }
  //       }
  //     });
  //   });
  // };

  // Voice recording functions
  const startVoiceRecording = async () => {
    const dagloToken = import.meta.env.VITE_REACT_APP_DAGLO_API_KEY;

    // Daglo API Client 초기화
    const client = new DagloAPI({
      apiToken: dagloToken,
    });

    // Transcriber 초기화
    const transcriber = client.stream.transcriber();
    transcriberRef.current = transcriber;

    // Transcript 수신 이벤트 처리
    const transcriptHandler = (data) => {
      if (data?.text) {
        setTranscripts((prev) => [...prev, data.text]);
      }
    };

    // 리스너 참조 저장
    transcriptHandlerRef.current = transcriptHandler;
    transcriber.on("transcript", transcriptHandler);

    try {
      // 마이크 스트림 요청
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      transcriber.connect(stream);
      voiceStreamRef.current = stream;
      setIsRecording(true);
      console.log("음성 녹음 시작");
    } catch (error) {
      setIsRecording(false);
      console.error("Failed to start voice recording:", error);
    }
  };

  const stopVoiceRecording = () => {
    // Transcriber 연결 해제 (이벤트 제거)
    if (transcriberRef.current && transcriptHandlerRef.current) {
      transcriberRef.current.on("stop", () => {});
      transcriberRef.current = null;
      transcriptHandlerRef.current = null;
    }

    // 오디오 스트림 중단
    if (voiceStreamRef.current) {
      voiceStreamRef.current.getTracks().forEach((track) => track.stop());
      console.log("Microphone stream stopped");
      voiceStreamRef.current = null;
    }
    setIsRecording(false);
  };

  return {
    startVideoRecording,
    stopVideoRecording,
    releaseCamera,
    startVoiceRecording,
    stopVoiceRecording,
    transcripts,
    setTranscripts,
    isRecording,
  };
};
