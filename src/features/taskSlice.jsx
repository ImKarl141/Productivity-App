import { createSlice } from "@reduxjs/toolkit";
import { task, userProjects } from '../data'

const initialState = {
  taskItems: task,
  isEdit: false,
  userName: 'Carlos',
  projects: userProjects,
  addProjectEdit: false,
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
    ShowAddProjectEdit: (state) => {
      state.addProjectEdit = !state.addProjectEdit;
      // console.log(`Your state is ${state.addProjectEdit}`)
    }
  }
});

export const { ShowTaskEdit, ShowAddProjectEdit } = taskSlice.actions;
export default taskSlice.reducer;
