import { createSlice } from "@reduxjs/toolkit";
import { task, taskInput, projectInput, tagInput, taskProjectInput, userProjects, userTags, taskTagInput, subtaskTest, subtaskInput } from '../data'

const initialState = {
  taskItems: task,
  subtaskTest: subtaskTest,
  isEdit: false,
  isTaskUpdate: false,
  isProjectUpdate: false,
  isTagUpdate: false,
  isTagDelete: false,
  currentEditId: '',
  currentProjectId: '',
  currentTagId: '',
  userName: 'Carlos',
  dbTasks: [],
  dbProjects: [],
  dbTags: [],
  projects: userProjects,
  tags: userTags,
  addProjectEdit: false,
  addTagEdit: false,
  addSubtaskEdit: false,
  taskInput: taskInput,
  taskProjectInput: taskProjectInput,
  taskTagInput: taskTagInput,
  projectInput: projectInput,
  tagInput: tagInput,
  subtaskInput: subtaskInput,
  currentCheckedId: '',
  currentView: {
    all: true,
    current: false,
    completed: false
  },
  currentProjectView: '',
  currentTagView: '',
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    AddNewTask: (state, value) => {
      state.dbTasks.push(value.payload)
    },
    DeleteTask: (state, value) => {
      state.dbTasks.splice(value.payload, 1);
    },
    SetCurrentCheckedId: (state, value) => {
      state.currentCheckedId = value.payload;
    },
    SetCurrentView: (state, value) => {
      if (value.payload === "all") {
        state.currentView.all = true;
        state.currentView.current = false;
        state.currentView.completed = false;
      } else if (value.payload === "current") {
        state.currentView.all = false;
        state.currentView.current = true;
        state.currentView.completed = false;
      } else if (value.payload === "completed") {
        state.currentView.all = false;
        state.currentView.current = false;
        state.currentView.completed = true;
      }
    },
    SetTaskList: (state, value) => {
      state.dbTasks = value.payload;
    },
    SetProjectList: (state, value) => {
      state.dbProjects = value.payload;
    },
    DeleteProjectItem: (state, value) => {
      state.dbProjects.splice(value.payload, 1)
    },
    SetTagList: (state, value) => {
      state.dbTags = value.payload;
    },
    DeleteTagItem: (state, value) => {
      state.dbTags.splice(value.payload, 1)
    },
    SetCurrentEditId: (state, value) => {
      state.currentEditId = value.payload;
    },
    SetCurrentProjectId: (state, value) => {
      state.currentProjectId = value.payload;
    },
    SetCurrentTagId: (state, value) => {
      state.currentTagId = value.payload;
    },
    ShowTaskEdit: (state) => {
      state.isEdit = !state.isEdit;
      state.isTaskUpdate = false;
    },
    ShowTaskUpdate: (state) => {
      state.isTaskUpdate = !state.isTaskUpdate;
      state.isEdit = false;
    },
    ShowAddProjectEdit: (state) => {
      state.addProjectEdit = !state.addProjectEdit;
      state.isProjectUpdate = false;
      // console.log(`Your state is ${state.addProjectEdit}`)
    },
    ShowProjectUpdate: (state) => {
      state.isProjectUpdate = !state.isProjectUpdate;
      state.addProjectEdit = false;

    },
    ShowAddTagEdit: (state) => {
      state.addTagEdit = !state.addTagEdit;
    },
    ShowTagUpdate: (state) => {
      state.isTagUpdate = !state.isTagUpdate;
      state.isTagDelete = false;
    },
    ShowTagDelete: (state) => {
      state.isTagDelete = !state.isTagDelete;
      state.isTagUpdate = false;
    },
    ShowTagCancel: (state) => {
      state.isTagUpdate = false;
      state.isTagDelete = false;
      state.currentTagId = '';
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
    ClearAllTasks: (state) => {
      console.log("All Tasks deleted");
    },
    ClearFinishedTasks: (state) => {
      console.log("Finished Tasks deleted");
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
    },
    SetCurrentProjectView: (state, value) => {
      if (state.currentProjectView === value.payload) {
        state.currentProjectView = ''
      } else {
        state.currentProjectView = value.payload
      }
      // console.log(state.currentProjectView);
    },
    SetCurrentTagView: (state, value) => {
      if (state.currentTagView === value.payload) {
        state.currentTagView = ''
      } else {
        state.currentTagView = value.payload
      }
    },
  }
});

export const { AddNewTask, DeleteTask, SetCurrentCheckedId, SetCurrentView, SetTaskList, SetProjectList, SetTagList, DeleteProjectItem, SetCurrentEditId, DeleteTagItem, SetCurrentProjectId, SetCurrentTagId, ShowTaskEdit, ShowTaskUpdate, ShowAddProjectEdit, ShowProjectUpdate, ShowAddTagEdit, ShowTagUpdate, ShowTagDelete, ShowTagCancel, ShowSubtaskEdit, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectName, ChangeProjectColor, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagName, ChangeTagColor, ChangeTagInput, ChangeTagNameInput, ChangeTagColorInput, AddTaskItem, RemoveTaskItem, AddProjectItem, ClearAllTasks, ClearFinishedTasks, RemoveProjectItem, AddTagItem, RemoveTagItem, SetCurrentProjectView, SetCurrentTagView } = taskSlice.actions;
export default taskSlice.reducer;
