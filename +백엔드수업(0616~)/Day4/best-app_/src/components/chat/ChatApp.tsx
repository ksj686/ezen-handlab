import { IoChatboxEllipsesOutline } from "react-icons/io5";
import "./Chat.css";
import { useAuthStore } from "../../stores/authStore";
import { useEffect, useRef, useState } from "react";
import socket from "./socket";
// npm i react-icons
// npm i socket.io-client
type ChatMessage = {
  sender: string;
  message: string;
};

export default function ChatApp() {
  const authUser = useAuthStore((s) => s.authUser);
  const isLoading = useAuthStore((s) => s.isLoading);

  //   const [nickName, setNickName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chatList, setChatList] = useState<ChatMessage[]>([]); // 서버가 보내오는 대화내용

  const messageRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (
      //   !nickName?.trim() ||
      !authUser?.name.trim()
    ) {
      console.log("닉네임이 없거나 인증 사용자가 없음");

      return;
    }
    socket.emit("sendMessage", { sender: authUser?.name, message: message }); // 이벤트를 발생시키는 emit
    setMessage("");
    messageRef.current?.focus();
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect(); // 챗서버에 연결
      console.log("챗서버와 연결됨");
    }

    //   서버가 보내오는 메시지를 들어서 chatList에 출력
    socket.on("receiveMessage", (data: ChatMessage) => {
      setChatList((prev) => [...prev, data]);
    });
    return () => {
      // unmount 될때 실행되는 cleanup 함수
      if (socket.connected) {
        console.log("useEffect cleanup 소켓 연결 끊음...");
        socket.off("receiveMessage"); // 이벤트 receiveMessage 제거
        socket.disconnect(); // 챗서버 연결 중지
      }
    };
  }, []);

  useEffect(() => {
    // if (!isLoading && authUser) { // loading이 완료된 다음에 authUser가 있어야한다.
    //   setNickName(authUser.name);
    // }

    // 새 메시지가 추가될 때 마다 해당 요소로 스크롤 하도록
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList, isLoading, authUser]);

  if (isLoading || !authUser) {
    return (
      <div className="alert alert-primary">
        <h2>
          <IoChatboxEllipsesOutline /> 실시간 채팅
        </h2>
        <h3>로그인 해야 이용 가능합니다</h3>
      </div>
    );
  }

  return (
    <div className="wrap">
      <h2>
        <IoChatboxEllipsesOutline />
        실시간 채팅
      </h2>
      {authUser && (
        <input
          type="text"
          name="nickName"
          className="input"
          placeholder="닉네임 입력"
          value={authUser?.name}
          //   onChange={(e) => setNickName(e.target.value)}
        />
      )}
      <div className="divMsg">
        {chatList.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender} : </strong>
            <span>{msg.message}</span>
          </div>
        ))}
        <div ref={endRef} />
        {/* ref 설정. 스크롤 되도록 empty div를 챗팅 메시지 목록 끝에 위치시킴 */}
      </div>
      <input
        type="text"
        placeholder="메시지 입력"
        name="message"
        className="input_msg"
        value={message}
        ref={messageRef}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button className="btn btn-info mx-1" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
