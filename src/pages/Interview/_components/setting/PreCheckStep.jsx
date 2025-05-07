import React from "react";
import Button from "@/components/common/Button";
import pencil from "@/assets/images/pencil.svg";
import jobQuestion from "@/assets/images/job-question.svg";

const listWrap =
  "flex flex-1 min-w-0 flex-row justify-start gap-4 md:flex-col items-center md:justify-start";
const imageWrap =
  "w-[clamp(60px,15vw,140px)] h-[clamp(60px,15vw,140px)] bg-[#ECEBFF] rounded-[50%] flex items-center justify-center border-[4px] border-zik-main/50";
const imageSize = "w-[clamp(30px,8vw,100px)] h-[clamp(30px,8vw,100px)]";
const textWrap =
  "md:mt-7 flex flex-col items-center justify-center flex items-start md:items-center whitespace-nowrap text-[18px] text-zik-text";

const PreCheckStep = () => {
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
                src={jobQuestion}
                alt="직무 질문 그림"
                className={imageSize}
              />
            </div>
            <div className={textWrap}>
              <strong>문항수</strong>
              <div className="flex">
                <img src="" alt="-"></img>
                <p className="text-zik-main text-[30px] font-bold">10개</p>
                <img src="" alt="+"></img>
              </div>
            </div>
          </li>
          <li className={listWrap}>
            <div className={imageWrap}>
              <img
                src={jobQuestion}
                alt="직무 질문 그림"
                className={imageSize}
              />
            </div>
            <div className={textWrap}>
              <strong>답변 준비 시간</strong>
              <p className="text-[30px] font-bold text-gray-600/80">30초</p>
            </div>
          </li>
          <li className={listWrap}>
            <div className={imageWrap}>
              <img
                src={jobQuestion}
                alt="직무 질문 그림"
                className={imageSize}
              />
            </div>
            <div className={textWrap}>
              <strong>대답시간</strong>
              <p className="text-zik-text text-[30px] font-bold">2분</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-5 flex gap-15">
        <Button color="gray">이전</Button>
        <Button color="red">시작</Button>
      </div>
    </div>
  );
};

export default PreCheckStep;
