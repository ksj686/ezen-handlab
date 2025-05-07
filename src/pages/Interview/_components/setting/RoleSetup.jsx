import React, { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import DragProgressBar from "./DragProgressBar";
import CareerSelectModal from "@/components/common/Modal/CareerSelectModal";
import { useInterviewTabStore, useSetupNavigationStore } from "@/store/store";

const RoleSetup = () => {
  const setTabSelect = useInterviewTabStore((state) => state.setTabSelect);
  const { navigateTo } = useSetupNavigationStore((state) => state);

  useEffect(() => {
    setTabSelect("설정");
  }, []);

  const handlePrevious = () => {
    navigateTo("DiffSetup");
  };

  const handleNext = () => {
    navigateTo("PreCheckStep");
    setTabSelect("사전 체크");
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const modalHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center px-4 py-8">
      <div className="text-zik-text mt-8 mb-8 text-[30px] font-bold">
        질문 유형 비율을 설정하세요
      </div>
      <DragProgressBar />
      <div className="text-zik-text mt-8 mb-8 text-[30px] font-bold">
        직무를 선택하세요
      </div>
      <div
        className="border-zik-border text-zik-border w-[600px] cursor-pointer rounded-lg border px-4 py-3"
        onClick={modalHandler}
      >
        직군 · 직무를 선택하세요
      </div>
      {isOpenModal && (
        <CareerSelectModal isOpen={isOpenModal} onClose={modalHandler} />
      )}
      <div className="mt-5 flex gap-15">
        <Button color="gray" onClick={handlePrevious}>
          이전
        </Button>
        <Button onClick={handleNext}>다음</Button>
      </div>
    </div>
  );
};

export default RoleSetup;
