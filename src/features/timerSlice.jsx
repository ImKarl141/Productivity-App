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
  ],
  checkedItems: [0],
  currentTimerTask: '',
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
    },
    SetCheckedTask: (state, value) => {
      if (state.checkedItems.includes(value.payload)) {
        const valueIndex = state.checkedItems.indexOf(value.payload);
        state.checkedItems.splice(valueIndex, 1)
      } else {
        state.checkedItems.push(value.payload)
      }
    },
    SetCurrentTimerTask: (state, value) => {
      state.currentTimerTask = value.payload
      console.log("Done");
    }
  }
});

export const { SetTimerListAdd, SetTimerListEdit, SetCurrentEditTimer, SetCheckedTask, SetCurrentTimerTask } = timerSlice.actions;
export default timerSlice.reducer;
