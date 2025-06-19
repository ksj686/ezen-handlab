import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePostStore } from "../../stores/postStore";

const PostList: React.FC = () => {
  const fetchPostList = usePostStore((s) => s.fetchPostList);
  const postList = usePostStore((s) => s.postList);
  const totalCount = usePostStore((s) => s.totalCount);

  useEffect(() => {
    fetchPostList();
  });

  return (
    <div className="post-list">
      <h3>총 게시글 수: {totalCount}개</h3>
      {postList.map((post, index) => (
        <div
          className="d-flex my-3 p-3"
          style={{ background: "#efefef", borderRadius: 10 }}
        >
          <div style={{ width: "25%" }}>
            <img
              src={`http://localhost:7777/images/noimage.png`}
              alt={post.title}
              className="postImage"
            />
          </div>
          <div className="flex-grow-1 ms-3">
            <h4>
              작성자: {post.writer}
              <br />
              <small className="text-muted">
                <i>Posted on {post.wdate}</i>
              </small>
            </h4>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
};

export default PostList;
