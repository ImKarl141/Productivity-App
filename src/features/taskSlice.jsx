import { createSlice } from "@reduxjs/toolkit";
import { task, taskInput, projectInput, tagInput, taskProjectInput, userProjects, userTags, taskTagInput, subtaskTest, subtaskInput } from '../data'

const initialState = {
  taskItems: task,
  subtaskTest: subtaskTest,
  isEdit: false,
  userName: 'Carlos',
  projects: userProjects,
  tags: userTags,
  addProjectEdit: false,
  addTagEdit: false,
  addSubtaskEdit: false,
  taskInput: taskInput,
  taskProjectInput: taskProjectInput,
  taskTagInput: taskTagInput,
  // taskTag: userTags[0].nameTag,
  projectInput: projectInput,
  tagInput: tagInput,
  subtaskInput: subtaskInput,
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
    },
    ShowSubtaskEdit: (state) => {
      state.addSubtaskEdit = !state.addSubtaskEdit;
      // console.log(state.addSubtaskEdit);
    },
    //Task input
    ChangeTitleInput: (state, value) => {
      state.taskInput.taskTitle = value.payload
    },
    ChangeDescriptionInput: (state, value) => {
      state.taskInput.taskDescription = value.payload
    },
    ChangeDateInput: (state, value) => {
      state.taskInput.taskDate = value.payload
    },
    //Project Input
    ChangeProjectName: (state, value) => {
      state.projectInput.nameProject = value.payload
    },
    ChangeProjectColor: (state, value) => {
      state.projectInput.projectColor = value.payload
    },
    // ChangeProjectInput: (state, value) => {
    //   state.projectInput = value.payload
    // },
    ChangeProjectNameInput: (state, value) => {
      state.taskProjectInput.taskProjectName = value.payload
    },
    ChangeProjectColorInput: (state, value) => {
      state.taskProjectInput.taskProjectColor = value.payload
    },
    //Tag input
    ChangeTagName: (state, value) => {
      state.tagInput.nameTag = value.payload
    },
    ChangeTagColor: (state, value) => {
      state.tagInput.tagColor = value.payload
    },
    ChangeTagInput: (state, value) => {
      state.taskTag = value.payload
    },
    ChangeTagNameInput: (state, value) => {
      state.taskTagInput.taskTagName = value.payload
    },
    ChangeTagColorInput: (state, value) => {
      state.taskTagInput.taskTagColor = value.payload
    },
    //Task List
    AddTaskItem: (state, value) => {
      state.taskItems = value.payload
    },
    RemoveTaskItem: (state, value) => {
      state.taskItems = state.taskItems.filter((myTask) => myTask.id !== value.payload)
    },
    //Project List
    AddProjectItem: (state, value) => {
      state.projects = value.payload
    },
    RemoveProjectItem: (state, value) => {
      state.projects = state.projects.filter((myProject) => myProject.id !== value.payload)
    },
    //Tag List
    AddTagItem: (state, value) => {
      state.tags = value.payload
    },
    RemoveTagItem: (state, value) => {
      state.tags = state.tags.filter((myProject) => myProject.id !== value.payload)
    }
  }
});

export const { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit, ShowSubtaskEdit, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectName, ChangeProjectColor, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagName, ChangeTagColor, ChangeTagInput, ChangeTagNameInput, ChangeTagColorInput, AddTaskItem, RemoveTaskItem, AddProjectItem, RemoveProjectItem, AddTagItem, RemoveTagItem, } = taskSlice.actions;
export default taskSlice.reducer;
