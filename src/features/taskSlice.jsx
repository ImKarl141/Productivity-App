import { createSlice } from "@reduxjs/toolkit";
import taskItems from "../taskItems";

const initialState = {
  taskItems: taskItems,
  isEdit: false,
  userName: 'Carlos'
}

const taskSlice = createSlice({
  name: 'task',
  initialState
});

export default taskSlice.reducer;
