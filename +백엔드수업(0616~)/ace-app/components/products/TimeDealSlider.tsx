import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./TimeDealSlider.module.css";
import { useState, useEffect } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import type { TimeDeal } from "@/types/TimeDeal";

// interface TimeDeal {
//   id: number;
//   product_name: string;
//   deal_price: number;
//   price: number;
//   image_url: string;
//   end_time: string;
// }

interface Props {
  deals: TimeDeal[];
  title?: string;
}

function Countdown({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("⏰ 종료됨");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60)); // 1초 1000ms, 1분 60초 1시간 60분
        // const minutes = Math.floor(diff / 60000); // 1/1000
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // 분
        // 분 단위 = diff 에서 시간 단위를 뺀 나머지(나머지값)를 1분(60000ms)으로 나눈 값이어야 함
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${hours}시 ${minutes}분 ${seconds}초 남음`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return <div className={styles.timer}>{timeLeft}</div>;
}

export default function TimeDealSlider({ deals, title }: Props) {
  return (
    <div className={styles.container}>
      <h2>⏰ {title || "타임딜 진행중!"}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
      >
        {deals.map((deal, i) => {
          const discount = Math.round(
            ((deal.price - deal.deal_price) / deal.price) * 100
          );
          return (
            <SwiperSlide key={deal.id}>
              <div className={styles.slide}>
                <div className={styles.card}>
                  <img
                    src={deal.image_url}
                    alt={deal.product_name}
                    className={styles.image}
                  />
                  <div className={styles.info}>
                    <h3>{deal.product_name}</h3>
                    <p>
                      <del>{deal.price.toLocaleString()}원</del>{" "}
                      <strong>{deal.deal_price.toLocaleString()}원</strong>
                    </p>
                    <Countdown endTime={deal.end_time} />
                  </div>
                </div>
                {/* <div className={`${styles.discountBox} ${styles.box1}`}> */}
                <div
                  className={`${styles.discountBox} ${styles[`box${i + 1}`]}`}
                >
                  <h2>Time Deal</h2>
                  {discount}%<br />
                  할인
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
