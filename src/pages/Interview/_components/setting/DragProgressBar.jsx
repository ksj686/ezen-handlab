import { useState, useRef, useEffect } from "react";

const DragProgressBar = () => {
  const [leftValue, setLeftValue] = useState(30);
  const [rightValue, setRightValue] = useState(70);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef(null);

  // 드래그 핸들러
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // 마우스 이동 핸들러
  const handleMouseMove = (e) => {
    if (!isDragging || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const barWidth = rect.width;
    const offsetX = e.clientX - rect.left;

    // 바에서의 위치를 퍼센트로 계산 (0-100%)
    let percent = Math.round(((offsetX / barWidth) * 100) / 10) * 10;
    // let percent = Math.round((offsetX / barWidth) * 100);

    // 범위 제한 (0%-100%)
    percent = Math.max(0, Math.min(100, percent));

    setLeftValue(100 - percent);
    setRightValue(percent);
  };

  // 전체 문서에서 마우스 이동 및 릴리스 이벤트를 추적
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging]);

  return (
    <div className="mx-auto my-12 max-w-lg px-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-center">
          <div className="font-medium text-gray-700">인성</div>
          <div className="text-zik-main text-3xl font-bold">{leftValue}%</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-700">직무</div>
          <div className="text-zik-main text-3xl font-bold">{rightValue}%</div>
        </div>
      </div>

      <div
        ref={progressBarRef}
        className="relative h-2 rounded-full bg-indigo-200"
      >
        {/* 투명한 슬라이더 트랙 */}
        <div className="absolute inset-0"></div>

        {/* 드래그 핸들 - 원형으로 수정 */}
        <div
          className="absolute top-1/2 z-10 -translate-y-1/2"
          style={{ left: `${rightValue}%` }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="border-zik-main -ml-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-4 bg-white shadow-md"></div>
        </div>

        {/* 컬러 인디케이터 */}
        <div
          className="bg-zik-main absolute inset-y-0 left-0 rounded-l-full"
          style={{ width: `${rightValue}%` }}
        ></div>
      </div>

      <div className="mt-8 text-center text-gray-600">
        {/* 인성과 직무의 비율을 조절하려면 원형 핸들을 드래그하세요 (0% ~ 100%) */}
      </div>
    </div>
  );
};

export default DragProgressBar;
