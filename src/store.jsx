import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './features/menuSlice';
import taskReducer from './features/taskSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    task: taskReducer,
  },
})