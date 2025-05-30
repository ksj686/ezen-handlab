import React from "react";
import "./scss/Cube.scss";

const Cube = () => {
  return (
    <div className="cube-wrap">
      <div className="cubes">
        <div className="cube front"><img src="./logo192.png" /></div>
        <div className="cube left">Full</div>
        <div className="cube top">Developer</div>
        <div className="cube bottom">4</div>
        <div className="cube right">KIM</div>
        <div className="cube back">6</div>
      </div>
    </div>
  );
};

export default Cube;
