import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultTimer: 25,
  isTimerTaskAdd: false,
  isTimerTaskEdit: false,
  isSubtaskTimer: true,
  currentTimerId: '',
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
    SetTimerListEdit: (state, value) => {
      state.isTimerTaskEdit = !state.isTimerTaskEdit;
      state.currentTimerId = value.payload;
    },
    SetCurrentEditTimer: (state, value) => {
      state.currentTimerId = value.payload;
      state.isTimerTaskEdit = true
      // console.log(state.currentEditTimer);
    }
  }
});

export const { SetTimerListAdd, SetTimerListEdit, SetCurrentEditTimer } = timerSlice.actions;
export default timerSlice.reducer;
