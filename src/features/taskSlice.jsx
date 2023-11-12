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
  taskElement: {
    taskTitle: 'My project',
    taskDescription: '',
    taskDate: 'February',
  }
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
    }
  }
});

export const { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit } = taskSlice.actions;
export default taskSlice.reducer;
