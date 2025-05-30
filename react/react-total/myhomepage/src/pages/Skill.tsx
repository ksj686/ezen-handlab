import React from "react";
import SectionTitle from "../components/SectionTitle";
import SkillCard from "../components/SkillCard";
interface Skill {
  id: number;
  title: string;
  logo: string;
  desc: string;
  percent: number;
}
const frontSkills: Skill[] = [
  {
    id: 0,
    title: "html",
    logo: "./images/html.png",
    desc: "hyper text markup language",
    percent: 90,
  },
  {
    id: 1,
    title: "css",
    logo: "./images/css.png",
    desc: "hyper text markup language",
    percent: 90,
  },
  {
    id: 2,
    title: "javascript",
    logo: "./images/javascript.png",
    desc: "hyper text markup language",
    percent: 90,
  },
  {
    id: 3,
    title: "typeScript",
    logo: "./images/typescript.png",
    desc: "hyper text markup language",
    percent: 90,
  },
  {
    id: 4,
    title: "react",
    logo: "./images/react.png",
    desc: "hyper text markup language",
    percent: 90,
  },
  {
    id: 5,
    title: "git",
    logo: "./images/git.png",
    desc: "hyper text markup language",
    percent: 90,
  },
  {
    id: 6,
    title: "figma",
    logo: "./images/figma.png",
    desc: "hyper text markup language",
    percent: 90,
  },
];
const Skill = () => {
  return (
    <div className="main skill">
      <div className="content-inner">
        <SectionTitle title="Skill" subTitle="내가 할수 있는 과목 스킬입니다" />
        <div>
          <ul className="skill-list">
            {frontSkills.map((skill) => (
              <li key={skill.id}>
                <SkillCard
                  id={skill.id}
                  title={skill.title}
                  logo={skill.logo}
                  desc={skill.desc}
                  percent={skill.percent}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skill;
