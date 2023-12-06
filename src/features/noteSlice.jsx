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
    SetNoteList: (state, value) => {
      state.dbNotes = value.payload;
    },
    SetNoteColors: (state, value) => {
      state.dbDefaultColors = value.payload;
    }
  }
})


export const { ShowNoteEdit, ShowNoteSettings, SetNoteList, SetNoteColors } = noteSlice.actions;
export default noteSlice.reducer;

