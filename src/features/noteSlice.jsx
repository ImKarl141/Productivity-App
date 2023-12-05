// import { createSlice } from "@reduxjs/toolkit";
// import { userNotes, userTags } from "../data";

import { createSlice } from "@reduxjs/toolkit";
import { userNotes, userTags } from "../data";

const initialState = {
  noteItems: userNotes,
  isEdit: false,
  tag: userTags,
  dbNotes: [],
  dbDefaultColors: []
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    ShowNoteEdit: (state) => {
      state.isEdit = !state.isEdit;
    },
  }
})


export const { ShowNoteEdit, ShowNoteSettings } = noteSlice.actions;
export default noteSlice.reducer;

