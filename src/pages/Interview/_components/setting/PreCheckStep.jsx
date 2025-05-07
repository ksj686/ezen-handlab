import React, { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import pencil from "@/assets/images/pencil.svg";
// import task from "@/assets/images/task.svg";
import task2 from "@/assets/images/task2.png";
import timebulb from "@/assets/images/time-bulb.svg";
import interactivesession from "@/assets/images/interactive-session.svg";
import minus from "@/assets/images/minus.svg";
import plus from "@/assets/images/plus.svg";

import { useInterviewTabStore, useSetupNavigationStore } from "@/store/store";

const listWrap =
  "flex flex-1 min-w-0 flex-row justify-start gap-4 md:flex-col items-center md:justify-start";
const imageWrap =
  "w-[clamp(60px,15vw,150px)] h-[clamp(60px,15vw,150px)] bg-[#ECEBFF] rounded-[50%] flex items-center justify-center border-[4px] border-zik-main/50";
const imageSize = "w-[clamp(30px,8vw,100px)] h-[clamp(30px,8vw,100px)]";
const textWrap =
  "md:mt-7 flex flex-col items-center justify-center flex items-start md:items-center whitespace-nowrap text-[18px] text-zik-text";

const PreCheckStep = () => {
  const setTabSelect = useInterviewTabStore((state) => state.setTabSelect);
  const { navigateTo } = useSetupNavigationStore((state) => state);

  useEffect(() => {
    setTabSelect("사전 체크");
  }, []);

  const handlePrevious = () => {
    navigateTo("RoleSetup");
    setTabSelect("설정");
  };

  const handleNext = () => {
    navigateTo("InterviewSection");
    setTabSelect("모의 면접");
  };

  const [count, setCount] = useState(10); // 초기 문항수

  const decrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const increase = () => {
    if (count < 20) setCount(count + 1);
  };
  return (
    <div className="mx-auto flex w-full flex-col items-center px-4 py-8">
      <div className="text-zik-text mt-24 mb-8 text-[30px] font-bold">
        사전 체크
      </div>

      <div className="flex items-center justify-center">
        <img src={pencil} alt="연필"></img>
        <div className="text-zik-main px-2 text-[16px] font-bold">
          문항 수는 1개부터 최대 10개까지 자유롭게 변경할 수 있어요
        </div>
      </div>

      <div className="mt-24 flex w-full justify-center after:absolute after:top-[60%] after:left-1/2 after:-z-10 after:block after:h-full after:w-[calc(100%+200px)] after:translate-x-[-50%] after:rounded-[50%] after:content-[''] md:after:bg-white lg:after:top-[60%]">
        <ul className="flex-start flex flex-col justify-center gap-[clamp(40px,8vw,240px)] md:flex-row">
          <li className={listWrap}>
            <div className={imageWrap}>
              <img
                src={task2}
                alt="문항"
                className={`translate-x-[4px] -translate-y-[6px] ${imageSize}`}
              />
            </div>
            <div className={textWrap}>
              <strong>문항수</strong>
              <div className="flex">
                <img
                  src={minus}
                  alt="-"
                  className="cursor-pointer"
                  onClick={decrease}
                />
                <p className="text-zik-main w-[70px] text-center text-[30px] font-bold">
                  <span className="underline">{count}</span>개
                </p>
                <img
                  src={plus}
                  alt="+"
                  className="cursor-pointer"
                  onClick={increase}
                />
              </div>
            </div>
          </li>
          <li className={listWrap}>
            <div className={imageWrap}>
              <img src={timebulb} alt="준비시간" className={imageSize} />
            </div>
            <div className={textWrap}>
              <strong>답변 준비 시간</strong>
              <p className="text-[30px] font-bold text-gray-600/80">30초</p>
            </div>
          </li>
          <li className={listWrap}>
            <div className={imageWrap}>
              <img src={interactivesession} alt="답변" className={imageSize} />
            </div>
            <div className={textWrap}>
              <strong>대답시간</strong>
              <p className="text-zik-text text-[30px] font-bold">2분</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-5 flex gap-15">
        <Button color="gray" onClick={handlePrevious}>
          이전
        </Button>
        <Button color="red" onClick={handleNext}>
          시작
        </Button>
      </div>
    </div>
  );
};

export default PreCheckStep;
