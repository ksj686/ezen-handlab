import { Component } from "react";

class ClassFunProps5 extends Component {
  render() {
    return (
      <div>
        <h2>클래스 컴포넌트 - 자식 속성 전달</h2>
        <p>부모로 데이터 전달받기</p>
        <p>
          오늘은 {this.props.day} 요일입니다. 점심시간은 {this.props.hours} 분
          남았습니다.
        </p>
      </div>
    );
  }
}

export default ClassFunProps5;
