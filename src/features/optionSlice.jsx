//createSlice
import { createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = {
  optionToggle: {
    Options: false,
    Settings: false,
    logInOut: false
  }
}

const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    showOption: (state) => {
      const { optionToggle } = state;
      optionToggle.Options = !optionToggle.Options
      optionToggle.Settings = optionToggle.logInOut = false
    },
    showSettings: (state) => {
      const { optionToggle } = state;
      optionToggle.Settings = !optionToggle.Settings
      optionToggle.logInOut = false
    },
    showUser: (state) => {
      const { optionToggle } = state;
      optionToggle.logInOut = !optionToggle.logInOut;
      optionToggle.Settings = false
    }
  }
})
console.log('hello friend');

//destructuring slice
export const { showOption, showSettings, showUser } = optionSlice.actions;

//export as reducer
export default optionSlice.reducer;