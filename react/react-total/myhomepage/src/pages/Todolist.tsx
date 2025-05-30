import React from "react";
import SectionTitle from "../components/SectionTitle";
import TodoApp from "../components/todolist/TodoApp";

const Todolist = () => {
  return (
    <div className="main todolist">
      <div className="content-inner">
        <SectionTitle
          title="Todo List"
          subTitle="오늘의 할일 스케줄을 관리해보세요"
        />
        <div>
          <TodoApp />
        </div>
      </div>
    </div>
  );
};

export default Todolist;
