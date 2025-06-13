// 모든 전역 변수를 담는 객체
// configureStore toolkit 에서 제공해주는 store를 생성해주는 함수

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/CounterReducer";
import TodoSlice from "../reducers/TodoSlice";

const store = configureStore({
  // reducer: CounterReducer
  reducer: {
    counter: counterReducer,
    todos: TodoSlice,
  },
});

export default store;
