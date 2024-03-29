import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultTimer: 25,
  isTimerTaskAdd: false,
  isTimerTaskEdit: false,
  isSubtaskTimer: true,
  currentTimerId: '',
  subtasksTest: [
    {
      id: 1,
      title: "Make dinner"
    },
    {
      id: 2,
      title: "Buy PC"
    },
    {
      id: 3,
      title: "Drive the bike"
    },
    {
      id: 4,
      title: "Buy some food"
    },
    {
      id: 5,
      title: "Visit my parents"
    }
  ],
  checkedItems: [0],
  currentTimerTask: '',
  isTimerSettings: false,
  isTimerTaskSettings: false,
  isEnglish: true,
  amountPomo: 0,
  soundVolume: 0.8,
  dbTimer: {},
  lastTaskId: '',
  autoStartRest: true,
  isSettingsChange: false,
  changeNumber: (10 * 60),
  currentMessage: "Focus finished",
  isPaused: true,
  isTimerMini: false,
  isFinished: true,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    SetFinish: (state, value) => {
      state.isFinished = value.payload;
    },
    SetTimerMini: (state) => {
      state.isTimerMini = !state.isTimerMini
    },
    SetPaused: (state) => {
      state.isPaused = !state.isPaused
    },
    SetTestReload: (state) => {
      state.testReload = !state.testReload
    },
    SetIsSettingsChange: (state) => {
    },
    SetTimerListAdd: (state) => {
      state.isTimerTaskAdd = !state.isTimerTaskAdd;
    },
    SetTimerListEdit: (state, value) => {
      state.isTimerTaskEdit = !state.isTimerTaskEdit;
      state.currentTimerId = value.payload;
    },
    SetCurrentEditTimer: (state, value) => {
      state.currentTimerId = value.payload;
      state.isTimerTaskEdit = true
    },
    SetCheckedTask: (state, value) => {
      if (state.checkedItems.includes(value.payload)) {
        const valueIndex = state.checkedItems.indexOf(value.payload);
        state.checkedItems.splice(valueIndex, 1)
      } else {
        state.checkedItems.push(value.payload)
      }
    },
    SetCurrentTimerTask: (state, value) => {
      state.currentTimerTask = value.payload
    },
    ShowTimerSettings: (state) => {
      state.isTimerSettings = !state.isTimerSettings
    },
    ToggleLanguage: (state) => {
      state.isEnglish = !state.isEnglish
    },
    SetTimerTaskSettings: (state) => {
      state.isTimerTaskSettings = !state.isTimerTaskSettings
    },
    SetSoundVolume: (state, value) => {
      state.soundVolume = value.payload
    },
    SetTimerSettings: (state, value) => {
      state.dbTimer = value.payload
    },
    SetLastTaskId: (state, value) => {
      state.lastTaskId = value.payload;
    },
  }
});

export const { SetTimerMini, SetFinish, SetTestReload, SetPaused, SetIsSettingsChange, SetTimerListAdd, SetTimerListEdit, SetCurrentEditTimer, SetCheckedTask, SetCurrentTimerTask, ShowTimerSettings, ToggleLanguage, SetTimerTaskSettings, SetSoundVolume, SetTimerSettings, SetLastTaskId } = timerSlice.actions;
export default timerSlice.reducer;
