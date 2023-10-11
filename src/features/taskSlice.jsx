import { createSlice } from "@reduxjs/toolkit";
import { task } from '../data'

const initialState = {
  taskItems: task,
  isEdit: false,
  userName: 'Carlos'
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    ShowTaskEdit: (state) => {
      // const { isEdit } = state
      state.isEdit = !state.isEdit;
      // console.log(state.isEdit);
    },
  }
});

export const { ShowTaskEdit } = taskSlice.actions;
export default taskSlice.reducer;
