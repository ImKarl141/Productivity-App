// import { createSlice } from "@reduxjs/toolkit";
// import { userNotes, userTags } from "../data";

import { createSlice } from "@reduxjs/toolkit";
import { userNotes, userTags } from "../data";

const initialState = {
  noteItems: userNotes,
  isEdit: false,
  tag: userTags,
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


export const { ShowNoteEdit } = noteSlice.actions;
export default noteSlice.reducer;

// const initialState = {
//   noteItem: userNotes,
//   isEdit: false,
//   noteTag: userTags,
// }

// const noteSlice = createSlice({
//   name: 'notes',
//   initialState,
//   reducers: {
//     ShowNoteEdit: (state) => {
//       state.isEdit = !state.isEdit;
//     }
//   },
// });

// export const { ShowNoteEdit } = noteSlice.actions;
// export default noteSlice.reducer;


