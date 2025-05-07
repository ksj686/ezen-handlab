import React, { useState } from "react";

import checkedCircle from "@/assets/images/checked-circle.svg";
import starFill from "@/assets/images/star-fill.svg";
import starEmpty from "@/assets/images/star-empty.svg";

import Button from "@/components/common/Button";
import clsx from "clsx";

const levels = [
  {
    label: "신입",
    description:
      "처음이라도 괜찮아요. 기초 역량과 성장 가능성을 중심으로 묻습니다.\n실무 경험이 없어도 답할 수 있는 질문들로 구성되어 있어요",
    stars: 1,
  },
  {
    label: "경력 1~3년",
    description:
      "짧지만 실무를 경험해본 만큼, 실무 역량과 문제 해결력을 중심으로 확인합니다.\n기초 지식에 더해 실제 프로젝트 경험을 바탕으로 답할 수 있는 질문들로 구성되어 있어요",
    stars: 2,
  },
  {
    label: "경력 4~7년",
    description:
      "경험이 쌓인 만큼 기술 선택의 이유, 협업 경험, 아키텍처 이해 등 심화된 질문이 포함됩니다.\n문제를 어떻게 바라보고 풀어가는지에 대한 사고 방식도 중요하게 평가해요",
    stars: 3,
  },
  {
    label: "경력 7년 이상",
    description:
      "기술 리더 혹은 아키텍트로서의 시야를 기대합니다.\n조직 내 기술 방향성, 리딩 경험, 시스템 설계 전반에 대한 인사이트를 중심으로 질문합니다",
    stars: 4,
  },
];

const DiffSetup = () => {
  const [selected, setSelected] = useState("신입");

  return (
    <div className="mx-auto flex w-full flex-col items-center px-4 py-8">
      <div className="text-zik-text mt-8 mb-8 text-[30px] font-bold">
        질문 난이도를 설정하세요
      </div>

      <ul className="w-[700px] space-y-4">
        {levels.map((level) => {
          const isSelected = selected === level.label;

          return (
            <li
              key={level.label}
              onClick={() => setSelected(level.label)}
              className={clsx(
                "border-zik-border cursor-pointer rounded-xl border px-6 py-4 transition-all",
                {
                  "bg-zik-main/30 text-[#291B9A]": isSelected,
                },
              )}
            >
              <div
                className={clsx("flex items-center justify-start gap-7", {
                  "px-7": !isSelected,
                })}
              >
                <div className="flex min-w-[100px] items-center gap-2">
                  {isSelected && (
                    <img
                      src={checkedCircle}
                      alt="selected"
                      className="h-5 w-5 shrink-0"
                    />
                  )}
                  <strong className="text-[20px]">{level.label}</strong>
                </div>
                <div className="flex gap-1">
                  {Array(level.stars)
                    .fill(0)
                    .map((_, idx) => (
                      <img
                        key={idx}
                        src={isSelected ? starFill : starEmpty}
                        alt="star"
                        className="h-4 w-4"
                      />
                    ))}
                </div>
              </div>

              {isSelected && level.description && (
                <p className="mt-2 px-7 text-[18px] leading-relaxed whitespace-pre-wrap text-[#291B9A]">
                  {level.description}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex gap-15">
        <Button color="gray">이전</Button>
        <Button>다음</Button>
      </div>
    </div>
  );
};

export default DiffSetup;
