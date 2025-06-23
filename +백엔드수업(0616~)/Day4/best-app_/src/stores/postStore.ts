/*
postStore.ts : post목록 가져오기, 1건 post조회, post삭제 관리 (서버 통신 로직 중심)
postFormStore.ts: post 글쓰기/글수정에 필요한 폼 입력 상태 관리 (UI상태 중심)
*/
import { create } from "zustand";
import type { Post } from "../components/posts/types/Post";
import { apiFetchPostList, fetchPostById, apiDeletePost } from "../api/postApi";

interface PostState {
  postList: Post[]; // 글 목록
  totalCount: number; // 총 게시글 수
  totalPages: number; // 총 페이지 수
  page: number; // 현재 보여줄 페이지 번호
  size: number;
  post: Post | null; // 특정 게시글

  setPage: (page: number) => void; // 페이지 변경할때
  fetchPostList: () => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  deletePost: (id: string) => Promise<boolean>;
}

// get은 state값 얻어올때 쓰인다
export const usePostStore = create<PostState>((set, get) => ({
  postList: [],
  totalCount: 0,
  totalPages: 0,
  page: 1, // 1페이지를 기본 값
  size: 3, // 서버에서 정해준 값
  setPage: (page: number) => set({ page: page }),

  post: null,
  fetchPostList: async () => {
    const { page } = get(); // get()함수로 page state값 가져오기
    try {
      //api호출==>반환해주는 목록,게시글수를 set
      const data = await apiFetchPostList(page);

      set({
        postList: data.data,
        totalCount: data.totalCount,
      });
    } catch (error) {
      alert("목록 가져오기 실패: " + (error as Error).message);
    }
  },
  fetchPostById: async (id) => {
    try {
      const post = await apiFetchPostList(id);
      set({ post });
    } catch (error) {
      alert("글 내용 보기 실패: " + (error as Error).message);
    }
  },
  deletePost: async (id) => {
    try {
      await apiDeletePost(id);
      set({ post: null });
      return true;
    } catch (error) {
      alert("글 삭제 실패: " + (error as Error).message);
      return false;
    }
  },
}));
