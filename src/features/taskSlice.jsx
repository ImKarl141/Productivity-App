import { createSlice } from "@reduxjs/toolkit";
import { task, taskInput, taskProjectInput, userProjects, userTags } from '../data'

const initialState = {
  taskItems: task,
  isEdit: false,
  userName: 'Carlos',
  projects: userProjects,
  tags: userTags,
  addProjectEdit: false,
  addTagEdit: false,
  taskInput: taskInput,
  taskProjectInput: taskProjectInput,
  taskTag: userTags[0].nameTag
}

// const [taskTitle, setTaskTitle] = useState('')
// const [taskDescription, setTaskDescription] = useState('')
// const [taskDate, setTaskDate] = useState('');
// const [taskProjectName, setTaskProjectName] = useState(projects[0].nameProject)
// const [taskProjectColor, setTaskProjectColor] = useState(projects[0].color)
// const [taskTag, setTaskTag] = useState(tags[0].nameTag)
// const [listOfTasks, setListOfTasks] = useState(taskItems)

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
    ChangeProjectNameInput: (state, value) => {
      state.taskProjectInput.taskProjectName = value.payload
    },
    ChangeProjectColorInput: (state, value) => {
      state.taskProjectInput.taskProjectColor = value.payload
    },
    //Tag input
    ChangeTagInput: (state, value) => {
      state.taskTag = value.payload
    }
  }
});

export const { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagInput } = taskSlice.actions;
export default taskSlice.reducer;
