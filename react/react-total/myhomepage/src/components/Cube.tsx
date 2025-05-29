import React from "react";
import "./scss/Cube.scss";

const Cube = () => {
  return (
    <div className="cube-wrap">
      <div className="cubes">
        <div className="cube front">1</div>
        <div className="cube left">2</div>
        <div className="cube top">3</div>
        <div className="cube bottom">4</div>
        <div className="cube right">5</div>
        <div className="cube back">6</div>
      </div>
    </div>
  );
};

export default Cube;
