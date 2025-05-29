import React from "react";

const BigTitle = ({
  title,
  desTitle,
  subTitle,
}: {
  title: string;
  desTitle?: string;
  subTitle?: string;
}) => {
  return (
    <div>
      <div className="big-title-box">
        <h2 className="title">
          <span>{title}</span>
          <span>{desTitle}</span>
          <span>{subTitle}</span>
        </h2>
      </div>
    </div>
  );
};

export default BigTitle;
