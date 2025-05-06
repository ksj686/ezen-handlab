import React from "react";
import Button from "@/components/common/Button";

const PreCheckStep = () => {
  return (
    <div className="mx-auto flex w-full flex-col items-center px-4 py-8">
      <div className="text-zik-text mt-8 mb-8 text-[30px] font-bold">
        사전 체크
      </div>

      <div className="mt-5 flex gap-15">
        <Button color="gray">이전</Button>
        <Button color="red">시작</Button>
      </div>
    </div>
  );
};

export default PreCheckStep;
