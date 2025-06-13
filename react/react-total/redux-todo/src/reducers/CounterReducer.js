import { createSlice } from "@reduxjs/toolkit";

// store에서 관리하는 slice
const CounterReducer = createSlice({
  name: "counter",
  initialState: { count: 0 },
  // 상태를 변경시킬 함수
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = CounterReducer.actions;
export default CounterReducer.reducer;
