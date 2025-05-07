import React, { useEffect } from "react";
import Button from "@/components/common/Button";
import { useInterviewTabStore, useSetupNavigationStore } from "@/store/store";

const DeviceSetup = () => {
  const setTabSelect = useInterviewTabStore((state) => state.setTabSelect);
  const { navigateTo } = useSetupNavigationStore((state) => state);

  useEffect(() => {
    setTabSelect("설정");
  }, []);

  const handleNext = () => {
    navigateTo("DiffSetup");
  };

  return (
    <div className="mx-auto flex w-[92%] flex-col items-center px-4 py-8">
      <div className="text-zik-text mt-8 mb-8 text-[30px] font-bold">
        연결된 기기를 확인하세요
      </div>

      <div className="flex w-full flex-col gap-4 md:flex-row">
        {/* Left side - Device guides */}
        <div className="border-zik-border w-full rounded-lg border p-6 md:w-3/5">
          <div className="mb-8">
            <div className="text-zik-text/75 mb-3 text-[24px] font-bold">
              마이크 / 카메라 가이드
            </div>
            <ul className="list-disc space-y-2 pl-5 text-[14px]/3.5">
              <li>마이크가 PC(노트북)에 연결되어 있는 지 확인해주세요.</li>
              <li>상단 팝업의 마이크 권한을 '허용'으로 선택해 주세요.</li>
              <li>영상은 녹화되어 분석결과 페이지에서 확인하실 수 있습니다.</li>
            </ul>
          </div>

          <hr className="border-zik-border -mt-2 mb-2 border-t" />

          <div className="mb-8">
            <div className="text-zik-text/75 mb-3 text-[24px] font-bold">
              소음
            </div>
            <ul className="list-disc space-y-2 pl-5 text-[14px]/3.5">
              <li>조용한 공간에서 면접을 진행해 주세요.</li>
              <li>
                이어폰 사용 시 마이크에 닿는 옷 또는 머리카락 때문에 소음이 생길
                수 있으니 주의해주세요.
              </li>
              <li>다른 사람의 음성이 녹음되지 않도록 해주세요.</li>
            </ul>
          </div>

          <hr className="border-zik-border -mt-2 mb-2 border-t" />

          <div className="mb-8">
            <div className="text-zik-text/75 mb-3 text-[24px] font-bold">
              오류를 일으키는 주요원인
            </div>
            <ul className="list-disc space-y-2 pl-5 text-[14px]/3.5">
              <li>
                마이크 사용 중 하울링(소리 증폭 현상)이 발생하면 소리가 커져서
                음성 검출이 어려워질 수 있습니다.
              </li>
              <li>이어폰 사용 시에는 마이크가 있는 기기를 사용해 주세요.</li>
              <li>음성 전달에 영향을 미치는 마스크를 착용하지 말아 주세요.</li>
            </ul>
          </div>

          <hr className="border-zik-border -mt-2 mb-2 border-t" />

          <div>
            <div className="text-zik-text/75 mb-3 text-[24px] font-bold">
              답변 주의사항
            </div>
            <ul className="list-disc space-y-2 pl-5 text-[14px]/3.5">
              <li>
                소리가 작거나 발음이 부정확하면 음성 인식이 어려울 수 있습니다.
              </li>
              <li>답변할 때 정확한 음성과 크기로 답변해 주세요.</li>
              <li>
                면접 중 페이지를 벗어날 시, 처음부터 다시 시작해야 합니다.
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - Camera Preview */}
        <div className="border-zik-border w-full rounded-lg border p-6 md:w-2/5">
          <div className="bg-zik-border/50 mb-8 flex h-80 items-center justify-center rounded-lg">
            <p className="text-zik-text/70 text-xl">카메라 상태</p>
          </div>

          <div className="relative">
            <div className="flex items-center rounded-md border px-4 py-2">
              <span className="text-zik-text flex-1">마이크</span>
            </div>
            <div className="absolute top-2 right-2 flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs">연결실패</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-15">
        <Button
          color="gray"
          disabled
          className="pointer-events-none cursor-default"
        >
          이전
        </Button>
        <Button onClick={handleNext}>다음</Button>
      </div>
    </div>
  );
};

export default DeviceSetup;
