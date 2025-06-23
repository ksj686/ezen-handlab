import { Link } from "react-router-dom";
import { usePostStore } from "../../stores/postStore";
import { useEffect } from "react";

const PostList: React.FC = () => {
  const fetchPostList = usePostStore((s) => s.fetchPostList);
  const postList = usePostStore((s) => s.postList);
  const totalCount = usePostStore((s) => s.totalCount);
  const totalPages = usePostStore((s) => s.totalPages);
  const page = usePostStore((s) => s.page);
  const setPage = usePostStore((s) => s.setPage);

  useEffect(() => {
    fetchPostList();
  }, []);

  return (
    <div className="post-list">
      <h3>총 게시글 수: {totalCount} 개</h3>
      {postList.map((post, index) => (
        <div
          key={post.id ?? index}
          className="d-flex my-3 p-3"
          style={{ background: "#efefef", borderRadius: 10 }}
        >
          <div style={{ width: "25%" }}>
            <img
              src={
                post.file
                  ? `http://localhost:7777/uploads/${post.file}`
                  : `http://localhost:7777/images/noimage.png`
              }
              alt={post.title}
              className="postImage"
            />
          </div>
          <div className="flex-grow-1 ms-3">
            <h5>
              작성자: {post.writer}
              <br />
              <small className="text-muted">
                <i>Posted on {post.wdate} </i>
              </small>
            </h5>
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
          </div>
        </div>
      ))}
      {/* 페이지 네비게이션 자리 ----------- */}
      <div>
        {/* for(let i = 1; i <totalPage; i++)<button>i</button> */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className="btn btn-outline-primary mx-1"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};
export default PostList;
