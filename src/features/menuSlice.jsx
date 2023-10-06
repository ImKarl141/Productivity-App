import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: {
    Menu: false,
    Task: false,
    Calendar: false,
    Notes: false,
  },
  isActive: {
    Task: false
  }
}


const menuSlice = createSlice({
  name: 'menu',
  initialState
})

// console.log(menuSlice);

export default menuSlice.reducer;