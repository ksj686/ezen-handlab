import React from "react";
import SectionTitle from "../components/SectionTitle";

const About = () => {
  return (
    <div className="main about">
      <div className="content-inner">
        <SectionTitle title="About" subTitle="저는 김세준" />
        <div className="about-wrap">
          <div>
            <p>
              <span className="big-text">#열정적인</span>
              <span>#기초에 충실한</span>
              <span>#사용자 경험</span>
            </p>
            <p>
              <span>#풀스택</span>
              <span className="big-text">#함께 일하고 싶은</span>
              {/* <a href="#"></a> */}
            </p>
            <p>
              <span className="big-text">#앞서가는</span>
            </p>
          </div>
          <div className="photo-wrap">
            <p>
              3<small>+</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
