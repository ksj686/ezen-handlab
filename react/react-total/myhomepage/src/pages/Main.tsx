import React from "react";
import BigTitle from "../components/BigTitle";
import "../components/scss/BigTitle.scss";
import Cube from "../components/Cube";

const Main = () => {
  return (
    <div className="main">
      <div className="content-inner">
        <BigTitle
          title="BACK END"
          desTitle="DEVELOPER"
          subTitle="KIM SE JOON"
        />
        <Cube />
      </div>
    </div>
  );
};

export default Main;
