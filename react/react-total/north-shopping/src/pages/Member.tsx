import React from "react";
import { useStore } from "../store/useStore";

const Member = () => {
  const { currentUser } = useStore();

  return (
    <div className="container">
      <div className="content-inner">
        <h2 className="title">회원정보</h2>
        <p>{currentUser} 님 환영합니다</p>
      </div>
    </div>
  );
};

export default Member;
