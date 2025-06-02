import React, { useEffect, useState } from "react";

const FetchExample = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* jsonplaceholder에서 데이터 가져오기 */}
      <h2>post</h2>
      <ul>
        {post.map((post) => (
          <li>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchExample;
