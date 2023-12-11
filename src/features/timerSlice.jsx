import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTimerTaskAdd: false,
  isTimerTaskEdit: false,
  defaultTimer: 25,
}


const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    SetTimerListAdd: (state) => {
      state.isTimerTaskAdd = !state.isTimerTaskAdd;
    },
    SetTimerListEdit: (state) => {
      state.isTimerTaskEdit = !isTimerTaskEdit;
    },
  }
});

export const { SetTimerListAdd, SetTimerListEdit } = timerSlice.actions;
export default timerSlice.reducer;
