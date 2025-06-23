import { useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../../stores/postStore";
import { usePostFormStore } from "../../stores/postFormStore";
import { apiUpdataPost } from "../../api/postApi";

const PostEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchPostById = usePostStore((s) => s.fetchPostById);
  const post = usePostStore((s) => s.post);
  const { resetForm, formData, setFormData } = usePostFormStore();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target; // e.target.name/e.target.value
    setFormData({ [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //파일 첨부를 했다면
      setFormData({ newFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // 유효성 체크
    const { writer, title, content, newFile } = formData;

    if (!title.trim()) {
      alert("제목을 입력하세요");
      return;
    }
    if (!writer.trim()) {
      alert("작성자 이메일을 입력하세요");
      return;
    }

    //파일업로드시는 FormData객체에 사용자가 입력한 값들을 넣어 전송 'multipart/form-data'
    try {
      console.log("newFile: ", newFile);

      const data = new FormData();
      data.append("writer", writer);
      data.append("title", title);
      data.append("content", content);
      if (newFile) {
        data.append("file", newFile);
      }

      //PUT /api/posts/100  => 수정처리 (put / patch)
      await apiUpdataPost(data, id ?? "");
      alert("수정 성공");
      navigate("/posts");
    } catch (error: any) {
      console.error(error);
      alert("수정 실패 : " + error.message);
    }
  };

  const handleReset = () => {
    resetForm();
  };

  const fetchAndSet = async () => {
    if (id) {
      await fetchPostById(id); // 이 안에서 post state가 setting 된다
    }
  };
  // useEffect에 들어가는 callback함수는 비동기 함수로 만들 수 없다.
  // useEffect는 async를 못붙인다
  useEffect(() => {
    fetchAndSet(); // mount 될때 fetchAndSet() 호출

    return () => resetForm(); // unmount될 때 자동으로 호출되는 cleanup 함수
  }, [id]);

  useEffect(() => {
    if (post) {
      //   DB에서 가져온 값을 post 가지고 있음
      setFormData({
        writer: post.writer || "",
        title: post.title || "",
        content: post.content || "",
        file: post.file || "",
        newFile: null,
      });
    }
  }, [post]);

  return (
    <div className="row my-1">
      <div className="col-md-8 mx-auto p-3">
        <h1 className="text-center my-5">게시글 수정</h1>

        <form>
          {/* 제목 */}
          <div className="mb-3">
            <label className="form-label">제목</label>
            <input
              name="title"
              className="form-control my-2"
              placeholder="제목을 입력하세요"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* 작성자 */}
          <div className="mb-3">
            <label className="form-label">작성자</label>
            <input
              name="writer"
              className="form-control my-2"
              placeholder="작성자 이름"
              value={formData.writer}
              onChange={handleChange}
            />
          </div>

          {/* 내용 */}
          <div className="mb-3">
            <label className="form-label">내용</label>
            <textarea
              name="content"
              className="form-control my-2"
              rows={6}
              value={formData.content}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
            ></textarea>
          </div>

          {/* 첨부파일 */}
          <div className="mb-3">
            <label className="form-label">첨부파일</label>
            <input
              name="file"
              className="form-control"
              type="file"
              onChange={handleFileChange}
            />
            {formData.file && (
              <div className="mt-2 text-muted">
                <img
                  src={`http://localhost:7777/uploads/${formData.file}`}
                  alt={formData.file}
                  style={{ width: "120px" }}
                />
                <div>현재 파일: {formData.file}</div>
              </div>
            )}
          </div>

          {/* 버튼들 */}
          <div className="text-center">
            <button
              className="btn btn-primary mx-1 px-3 btn-sm"
              onClick={handleSubmit}
            >
              글수정
            </button>
            <button
              className="btn btn-warning mx-1 px-3 btn-sm"
              onClick={handleReset}
            >
              다시쓰기
            </button>
            <button
              className="btn btn-secondary mx-1 px-3 btn-sm"
              onClick={() => {
                navigate(`/posts`);
              }}
            >
              글 목록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEdit;
