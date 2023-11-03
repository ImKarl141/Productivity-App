import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './features/menuSlice';
import taskReducer from './features/taskSlice';
import optionReducer from './features/optionSlice';
import noteReducer from "./features/NoteSlice";




export const store = configureStore({
  reducer: {
    menu: menuReducer,
    task: taskReducer,
    option: optionReducer,
    note: noteReducer,
  },
})