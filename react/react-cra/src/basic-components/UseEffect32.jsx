import { useEffect } from "react";

export default function UseEffect32() {
  // 컴포넌트가 처음 렌더링 될때 한번 실행됨
  // 주로 api 호출, 초기 설정 시 사용.
  // 실제로는 두번 실행됨.
  useEffect(() => {
    console.log("컴포넌트가 마운트 되었습니다.");
  }, []);
  return (
    <div>
      <h2>useEffect</h2>
    </div>
  );
}
