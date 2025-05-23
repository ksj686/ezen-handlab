import { useRef } from "react";

export default function UseRef35() {
  // useRef는 Dom 요소를 참조
  // 인스턴스에 대한 참고를 생성할 때 사용한다.
  const inputRef = useRef("");
  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      {/* ref 속성을 사용하여 inputRef를 input요소와 연결 */}
      <input ref={inputRef} type="text" placeholder="글자를 입력하세요" />
      <button onClick={handleFocus}>포커스이동</button>
    </div>
  );
}
