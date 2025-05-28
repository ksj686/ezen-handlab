import { Component } from "react";

class ComConditionClass10 extends Component {
  // 변수선언 - 클래스를 쓸때 constructor 안에 props를 써줘야하낟.
  constructor(props) {
    super(props);
    this.state = { isToggle: true };
  }
  // 메서드
  handleToggle() {
    this.setState((state) => ({
      isToggle: !state.isToggle,
    }));
  }

  // 화면에 보여질 부분
  render() {
    return (
      <div>
        <button onClick={this.handleToggle}>
          {this.state.isToggle ? "ON" : "OFF"}
        </button>
      </div>
    );
  }
}

export default ComConditionClass10;
