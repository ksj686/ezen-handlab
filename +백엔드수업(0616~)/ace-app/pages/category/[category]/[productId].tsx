import { useRouter } from "next/router";
import React from "react";

// 다중 동적 라우팅
// /category/Clothes/100, /category/Elect/200
export default function ProductDetail() {
  const { category, productId } = useRouter().query;
  return (
    <div>
      <h1>카테고리명: {category}</h1>
      <h1>상품 ID : {productId}</h1>
    </div>
  );
}
