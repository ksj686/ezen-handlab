import type { ChangeEvent, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { usePostFormStore } from "../../stores/postFormStore";
import { apiCreatePost } from "../../api/postApi";
import { usePostStore } from "../../stores/postStore";

const PostForm: React.FC = () => {
  const { formData, setFormData, resetForm } = usePostFormStore();
  const fetchPostList = usePostStore((s) => s.fetchPostList);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files); // files ==> FileList {0:File, 1:File, 2:File, length:3} <= 3개 첨부할 경우
    if (e.target.files && e.target.files.length > 0) {
      // 파일을 첨부했따면(여기서는 1개 첨부)
      setFormData({ newFile: e.target.files[0] }); // newFile이 File|null 타입임
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // 파일 업로드 시에는 FormData 객체에 담아서 서버에 요청을 보내자
      // 파라미터 데이터와 함께 파일 데이터를 같이 전송하는 방식 => enctype="multipart/form-data"
      // ===> FormData를 이용하면 multipart 방식으로 전송한다.
      const data = new FormData();
      data.append("writer", formData.writer);
      data.append("title", formData.title);
      data.append("content", formData.content);
      if (formData.newFile) {
        data.append("file", formData.newFile);
      }
      // api 호출 => post 글을 생성하는 api 호출
      const newPost = await apiCreatePost(data);
      console.log("새로 등록한 글: ", newPost);

      // 전체 글 가져오는 api 호출
      await fetchPostList();
      alert("글 등록 완료");
      // 폼 초기화
      resetForm();

      // 전체글을 가져오는 api 호출
    } catch (error) {
      console.error("서버 요청 중 에러: ", error);
      alert("서버 요청 중 오류 발생 " + (error as Error).message);
    }
  }; //--------------------------------

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="writer"
            onChange={handleChange}
            value={formData.writer}
            required
          />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={handleChange}
            value={formData.title}
            required
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            onChange={handleChange}
            value={formData.content}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          글쓰기
        </Button>
      </Form>
    </>
  );
};
export default PostForm;
