import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import type { Product } from "@/types/Product";
import type { TimeDeal } from "@/types/TimeDeal";
import ProductList from "@/components/products/ProductList";
import TimeDealSlider from "@/components/products/TimeDealSlider";

interface Props {
  bestProducts: Product[];
  hitProducts: Product[];
  timeDeals: TimeDeal[];
}

// SSG - 빌드타임에 사전 렌더링. 정적인 페이지를 구성할 때 사용, getStaticProps()함수 구성
// SSR - 요청이 있을때마다 사전 렌더링. 동적인 페이지 구성할 때 사용, getServerSideProps()

// 동적 라우팅 /pages/cart/[uid].tsx - 로그인 한 사람 아이디 uid
export default function Home({ bestProducts, hitProducts, timeDeals }: Props) {
  return (
    <>
      <div className={styles.container}>
        <TimeDealSlider deals={timeDeals} title="⏰" />
        <br />
        <div style={{ padding: "1rem" }}>
          <ProductList products={bestProducts} title="❤ BEST 상품" />
        </div>
        <div style={{ padding: "1rem" }}>
          <ProductList products={hitProducts} title="✨ HIT 상품" />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    let url1 = `http://localhost:7777/api/products/spec`; // 베스트, 히트상품
    let url2 = `http://localhost:7777/api/timeDeals`; // 타임딜 상품
    const bestRes = await fetch(url1 + `?spec=best`);
    const hitRes = await fetch(url1 + `?spec=hit`);
    const timeDealsRes = await fetch(url2);

    const bestProducts = await bestRes.json();
    const hitProducts = await hitRes.json();
    const timeDeals = await timeDealsRes.json();

    return {
      props: {
        bestProducts,
        hitProducts,
        timeDeals,
      },
      revalidate: 60 * 5, // 초단위 : 5분 뒤에 update ==> ISR
      // [1] 초기에는 SSG로 정적인 페이지를 생성
      // [2] 요청이 들어오고 revalidate 에 지정된 시간이 만료되면(5분 지나면) SSR을 수행해서 페이지를 재생성
      // [3] 재생성한 페이지를 정적으로 다시 저장하고 응답을 보낸다
      // [4] 다음 요청부터는 재생성된 정적인 페이지를 응답으로 서비스하게 된다.
    };
  } catch (error) {
    console.error("Home 상품 가져오기 실패: ", error);
    return {
      props: {
        bestProducts: [],
        hitProducts: [],
        timeDeals: [],
      },
    };
  }
}
