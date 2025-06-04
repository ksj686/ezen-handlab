import React, { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  "all",
  "men's clothing",
  "jewelery",
  "women's clothing",
  "electronics",
];

const FakeStore = () => {
  const [items, setItems] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");
  useEffect(() => {
    const axiosItems = async () => {
      try {
        const url =
          selectCategory === "all"
            ? "https://fakestoreapi.com/products"
            : `https://fakestoreapi.com/products/category/${selectCategory}`;

        const response = await axios.get(url);
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.log(error.text);
      }
    };
    axiosItems();
  }, [selectCategory]);

  return (
    <div className="fakeStore">
      <ul>
        {categories.map((ca) => (
          <li onClick={() => setSelectCategory(ca)}>{ca}</li>
        ))}
      </ul>
      <div>
        <h2>{selectCategory === "all" ? "모든 제품" : selectCategory}</h2>
        <ul className="goods-list">
          {items.map((item) => (
            <li>
              <h3>{item.title}</h3>
              <p>
                <img src={item.image} alt={item.title} />
              </p>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FakeStore;
