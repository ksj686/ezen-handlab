import React from "react";
import { useStore } from "../store/useStore";
import SectionBigSwiper from "../components/SectionBigSwiper";

const CategoryBigPage = ({
  categoryName,
  imgUrl,
}: {
  categoryName: string;
  imgUrl: string;
}) => {
  const { items, fetchItems, getItemCategory } = useStore();

  return (
    <div className="goods-list-big">
      <div className="big-img">
        <img src={`./images/${imgUrl}-big.jpg`} alt="" />
      </div>
      <div className="big-swiper">
        <SectionBigSwiper category={items} />
      </div>
    </div>
  );
};

export default CategoryBigPage;
