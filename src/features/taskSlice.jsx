import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEdit: false,
  userName: 'Carlos'
}

const taskSlice = createSlice({
  name: 'task',
  initialState
});

export default taskSlice.reducer;
