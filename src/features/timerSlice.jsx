import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultTimer: 25,
  isTimerTaskAdd: true,
  isTimerTaskEdit: false,
  isSubtaskTimer: true,
  subtasksTest: [
    {
      id: 1,
      title: "Make dinner"
    },
    {
      id: 2,
      title: "Buy PC"
    },
    {
      id: 3,
      title: "Drive the bike"
    },
    {
      id: 4,
      title: "Buy some food"
    },
    {
      id: 5,
      title: "Visit my parents"
    }
  ]
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
