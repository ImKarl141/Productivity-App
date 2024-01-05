import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noteItems: '',
  isEdit: false,
  tag: '',
  dbNotes: [],
  dbDefaultColors: [],
  currentEditId: '',
  isColorUpdate: false,
  isNoteCardView: false,
  noteCardId: '',
  lastId: '',
}

const noteSlices = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    SetNoteCardView: (state, value) => {
      state.isNoteCardView = !state.isNoteCardView;
      state.noteCardId = value.payload;
      // console.log(state.isNoteCardView);
    },
    AddNote: (state, value) => {
      state.dbNotes.push(value.payload);
    },
    DeleteNote: (state, value) => {
      state.dbNotes.splice(value.payload, 1);
    },
    ShowLastId: (state, value) => {
      state.lastId = value.payload[-1].id;
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


export const { SetNoteCardView, AddNote, DeleteNote, ShowLastId, ShowNoteEdit, ShowNoteSettings, SetNoteList, SetNoteColors, SetCurrentEditId } = noteSlices.actions;
export default noteSlices.reducer;

