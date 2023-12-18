// import { createSlice } from "@reduxjs/toolkit";
// import { userNotes, userTags } from "../data";

import { createSlice } from "@reduxjs/toolkit";
import { userNotes, userTags } from "../data";

const initialState = {
  noteItems: userNotes,
  isEdit: false,
  tag: userTags,
  dbNotes: [],
  dbDefaultColors: [],
  currentEditId: '',
  isColorUpdate: false,
  isNoteCardView: false,
  noteCardId: '',
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    SetNoteCardView: (state, value) => {
      state.isNoteCardView = !state.isNoteCardView;
      state.noteCardId = value.payload;
      // console.log(state.isNoteCardView);
    },
    ShowNoteEdit: (state) => {
      state.isEdit = !state.isEdit;
    },
    SetNoteList: (state, value) => {
      state.dbNotes = value.payload;
    },
    SetNoteColors: (state, value) => {
      state.dbDefaultColors = value.payload;
    },
    SetCurrentEditId: (state, value) => {
      state.currentEditId = value.payload;
      // console.log(state.currentEditId);
    },
    SetColorUpdate: (state) => {
      state.isColorUpdate = !state.isColorUpdate;
    }
  }
})


export const { SetNoteCardView, ShowNoteEdit, ShowNoteSettings, SetNoteList, SetNoteColors, SetCurrentEditId } = noteSlice.actions;
export default noteSlice.reducer;

