import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './features/menuSlice';
import taskReducer from './features/taskSlice';
import optionReducer from "./features/optionSlice";


export const store = configureStore({
  reducer: {
    menu: menuReducer,
    task: taskReducer,
    option: optionReducer,
  },
})