import React from "react";
import SectionTitle from "../components/SectionTitle";

const Todolist = () => {
  return (
    <div className="content-inner">
      <SectionTitle
        title="Todo List"
        subTitle="오늘의 할일 스케줄을 관리해보세요"
      />
      <div>Contact 본문</div>
    </div>
  );
};

export default Todolist;
