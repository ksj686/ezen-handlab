import React from "react";
import "./scss/SkillCard.scss";

const SkillCard = ({
  id,
  title,
  logo,
  desc,
  percent,
}: {
  id: number;
  title: string;
  logo: string;
  desc: string;
  percent: number;
}) => {
  return (
    <div className="skill-card">
      <div className="card-wrap">
        <div className="card-img">
          <img src={logo} alt={title} />
        </div>
        <div className="card-back">
          <h2 className="card-title">{title}</h2>
          <p className="card-desc">{desc}</p>
          <p className="card-per">{percent}%</p>
        </div>
        {/* <div className="num">0{id + 1}</div> */}
      </div>
    </div>
  );
};

export default SkillCard;
