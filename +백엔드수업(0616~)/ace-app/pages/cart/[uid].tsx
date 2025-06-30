import React from "react";
import { useRouter } from "next/router";
// 동적 라우팅 /pages/cart/[uid].tsx
// http://localhost:3000/cart/hong , /cart/choi , /cart/admin ...
export default function CartPageByUser() {
  const router = useRouter();
  const { uid } = router.query;
  // router.query.uid
  return (
    <div>
      <h1>{uid}님의 장바구니</h1>
    </div>
  );
}
