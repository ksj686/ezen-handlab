import React from "react";
import "./scss/Title.scss";

const SectionTitle = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string; //안넘길것도 고려해서?
}) => {
  return (
    <div>
      <div className="titleBox">
        <h2 className="title">{title}</h2>
        <p className="subTitle">{subTitle}</p>
      </div>
    </div>
  );
};

export default SectionTitle;
