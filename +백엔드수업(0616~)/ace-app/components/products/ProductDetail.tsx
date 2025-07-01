import type { Product } from "@/types/Product";
import { useRouter } from "next/router";
import React from "react";
import styles from "./ProductDetail.module.css";

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const router = useRouter();
  const goAddToCart = () => {
    // 기능 필요함
    router.push(`/cart/hong`);
  };

  const goShopping = () => {
    if (window.history.length > 0) {
      router.back(); // history.back() 효과
    } else {
      router.push("/");
    }
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.imgBox}>
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className={styles.infoBox}>
        <h2 className={styles.title}>상품명</h2>
        <div>
          <>
            <span>세일가 원 </span>
            <span>{product.price.toLocaleString()} 원 </span>
            <span>할인율 % </span>
          </>
          <>
            <span>{product.price.toLocaleString()} 원</span>
          </>
        </div>
        <p className={styles.description}>
          상품번호: {product.id} <br />
          {product.description}
        </p>
        <div className={styles.options}>
          <label htmlFor="">
            수량: <input type="number" min={1} />
          </label>
        </div>
        <div className={styles.btnGroup}>
          <button onClick={goAddToCart} className={styles.cartBtn}>
            장바구니
          </button>
          <button className={styles.buyBtn}>구매하기</button>
          <button onClick={goShopping} className={styles.goShopBtn}>
            계속 쇼핑
          </button>
        </div>
      </div>
    </div>
  );
}
