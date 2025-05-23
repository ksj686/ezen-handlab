import logo from "./logo.svg";
import "./App.css";
import FunCom1 from "./basic-components/FunCom1";
import FunComImg2 from "./basic-components/FunComImg2";
import ClassCom3 from "./basic-components/ClassCom3";
import FunComProps4 from "./basic-components/FunComProps4";
import ClassFunProps5 from "./basic-components/ClassFunProps5";
import FunComProps6 from "./basic-components/FunComProps6";
import ComCombine7 from "./basic-components/ComCombine7";
import Gallery from "./basic-components/Gallery";
import ComCondition9 from "./basic-components/ComCondition9";
import ComConditionClass10 from "./basic-components/ComConditionClass10";
import ComCondition11 from "./basic-components/ComCondition11";
import PackingList12 from "./basic-components/PackingList12";
import List13 from "./basic-components/List13";
import FrontSkills from "./basic-components/FrontSkills";
import List15 from "./basic-components/List15";
import EventMulti19 from "./basic-components/EventMulti19";
import StateClass20 from "./basic-components/StateClass20";
import StateFunCounter21 from "./basic-components/StateFunCounter21";
import StateDark22 from "./basic-components/StateDark22";
import UseStateArrayUpdate23 from "./basic-components/UseStateArrayUpdate23";
import UseStateArrayInsert24 from "./basic-components/UseStateArrayInsert24";
import UseStateArrayDelete25 from "./basic-components/UseStateArrayDelete25";
import UseStateUpdate26 from "./basic-components/UseStateUpdate26";
import UseContext29 from "./basic-components/UseContext29";
import UseFilter30 from "./basic-components/UseFilter30";
import UseContextObject31 from "./basic-components/UseContextObject31";
import UseEffect32 from "./basic-components/UseEffect32";
import UseEffectApi33 from "./basic-components/UseEffectApi33";
import UseEffectClean34 from "./basic-components/UseEffectClean34";
import UseRef35 from "./basic-components/UseRef35";
import UseRef36 from "./basic-components/UseRef36";

const user = {
  name: "김철수",
  age: 30,
  imageUrl: "./images/411.png",
  imageSize: 9,
};

function App() {
  const age = 20;

  return (
    <div className="App">
      {/* <FunCom1 />
      <FunComImg2 />
      <ClassCom3 /> */}
      <h1>props 전달</h1>
      {/* <FunComProps4 name="홍길동" userAge={age} />
      <ClassFunProps5 day="목요일" hours="100" />
      <FunComProps6
        name={user.name}
        imgUrl={user.imageUrl}
        imageSize={user.imageSize}
      /> */}
      <h1>컴포넌트 합성</h1>
      {/* <ComCombine7 /> */}
      {/* <Gallery /> */}
      <h1>조건문 렌더링</h1>
      {/* <ComCondition9 /> */}
      {/* 클래스 */}
      {/* <ComConditionClass10 /> */}
      {/* <ComCondition11 isTrue={true} colorPink="pink" colorSky="skyblue" /> */}
      {/* <PackingList12 /> */}
      <h1>리스트 렌더링</h1>
      {/* <List13 /> */}
      {/* <FrontSkills /> */}
      {/* <List15 /> */}
      {/* <EventMulti19 /> */}
      {/* <StateClass20 /> */}
      {/* <StateFunCounter21 /> */}
      {/* <StateDark22 /> */}
      {/* <UseStateArrayUpdate23 /> */}
      {/* <UseStateArrayInsert24 /> */}
      {/* <UseStateArrayDelete25 /> */}
      {/* <UseStateUpdate26 /> */}
      {/* <UseContext29 /> */}
      {/* <UseFilter30 /> */}
      {/* <UseContextObject31 /> */}
      {/* <UseEffect32 /> */}
      {/* <UseEffectApi33 /> */}
      {/* <UseEffectClean34 /> */}
      <UseRef35 />
      <UseRef36 />
    </div>
  );
}

export default App;
