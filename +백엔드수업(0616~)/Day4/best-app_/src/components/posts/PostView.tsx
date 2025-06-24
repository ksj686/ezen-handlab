import { GrDislike } from "react-icons/gr";
import { AiFillHeart } from "react-icons/ai";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { usePostStore } from "../../stores/postStore";

const PostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const navigate = useNavigate();

  // const {post, fetchPostById} = usePostStore();
  const fetchPostById = usePostStore((s) => s.fetchPostById);
  const post = usePostStore((s) => s.post);
  const deletePost = usePostStore((s) => s.deletePost);

  useEffect(() => {
    if (id) fetchPostById(id);
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const yn = window.confirm(`${id}번 글을 삭제할까요?`);
    if (!yn) return;

    const result = await deletePost(id);
    if (result) {
      // alert("삭제 성공");
      navigate("/posts");
    } else {
      alert("삭제 실패 - 해당 글이 존재x");
    }
  };
  if (!post) return <div className=""> Loading...</div>;

  return (
    <div className="Post-view">
      <div className="row my-5">
        <div className="col px-5">
          <h1 className="my-5 text-center">Post View [No. {id}]</h1>
          <div className="text-end my-2">
            <Link to={`/postEdit/${post.id}`}>
              <button className="btn btn-info mx-2">수정</button>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              삭제
            </button>
          </div>

          <div className="card">
            <div className="card-body">
              <h5>
                [{post.id}] {post.title}
              </h5>
              <hr />
              <div style={{ marginBottom: "1rem" }} className="text-center">
                <img
                  src={
                    post.file
                      ? `http://localhost:7777/uploads/${post.file}`
                      : `http://localhost:7777/images/noimage.png`
                  }
                  alt={post.file ?? "noimage"}
                  style={{ maxWidth: "100%", borderRadius: "0.5rem" }}
                />
              </div>
              <div className="cArea px-5">
                {post.content}
                <br />
                <AiFillHeart style={{ color: "hotpink" }} />
                <GrDislike style={{ color: "green" }} />
              </div>
            </div>
            <div className="card-footer">
              Created on {post.wdate} by {post.writer}
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col px-5 text-center">
          <button
            className="btn mt-4 btn-secondary"
            onClick={() => navigate("/posts")}
          >
            Post List 전체 출력
          </button>
          <h3 className="mt-5">댓글영역</h3>
        </div>
      </div>

      <div className="row my-5">
        <div className="col px-5">
          <h3 className="mt-4">댓글추가</h3>
        </div>
      </div>

      <div className="row my-5">
        <div className="col px-5">댓글 수정 폼</div>
      </div>
    </div>
  );
};

export default PostView;
