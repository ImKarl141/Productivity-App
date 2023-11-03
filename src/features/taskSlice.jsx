import { createSlice } from "@reduxjs/toolkit";
import { task, userProjects, userTags } from '../data'

const initialState = {
  taskItems: task,
  isEdit: false,
  userName: 'Carlos',
  projects: userProjects,
  tags: userTags,
  addProjectEdit: false,
  addTagEdit: false,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    ShowTaskEdit: (state) => {
      state.isEdit = !state.isEdit;
    },
    ShowAddProjectEdit: (state) => {
      state.addProjectEdit = !state.addProjectEdit;
      // console.log(`Your state is ${state.addProjectEdit}`)
    },
    ShowAddTagEdit: (state) => {
      state.addTagEdit = !state.addTagEdit;
    }
  }
});

export const { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit } = taskSlice.actions;
export default taskSlice.reducer;
