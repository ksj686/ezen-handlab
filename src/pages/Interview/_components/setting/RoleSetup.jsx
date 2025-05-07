import React from "react";
import Button from "@/components/common/Button";
import DragProgressBar from "./DragProgressBar";

const RoleSetup = () => {
  return (
    <div className="mx-auto flex w-full flex-col items-center px-4 py-8">
      <div className="text-zik-text mt-8 mb-8 text-[30px] font-bold">
        질문 유형 비율을 설정하세요
      </div>
      <DragProgressBar />

      <div className="mt-5 flex gap-15">
        <Button color="gray">이전</Button>
        <Button>다음</Button>
      </div>
    </div>
  );
};

export default RoleSetup;
