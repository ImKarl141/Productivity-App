import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuToggle: {
    Menu: true,
    Task: false,
    Calendar: false,
    Notes: true,
  },
  isActive: {
    Task: false
  }
}


const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    showMenuOptions: (state) => {
      const { menuToggle } = state;
      menuToggle.Menu = !menuToggle.Menu;
      menuToggle.Task = menuToggle.Calendar = menuToggle.Notes = false;
    },
    showTask: (state) => {
      const { menuToggle } = state;
      menuToggle.Task = !menuToggle.Task;
      menuToggle.Calendar = menuToggle.Notes = false;
      // return menuToggle.Task
    },
    showCalendar: (state) => {
      const { menuToggle } = state;
      menuToggle.Calendar = !menuToggle.Calendar;
      // console.log('Calendar displayed');
      menuToggle.Task = menuToggle.Notes = false;
    },
    showNotes: (state) => {
      const { menuToggle } = state;
      menuToggle.Notes = !menuToggle.Notes;
      menuToggle.Task = menuToggle.Calendar = false;
    }
  },
});

export const { showMenuOptions, showTask, showCalendar, showNotes } = menuSlice.actions;
export default menuSlice.reducer;