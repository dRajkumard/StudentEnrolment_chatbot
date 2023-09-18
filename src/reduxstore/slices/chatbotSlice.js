// chatSlice.js (Redux Toolkit slice)
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    userResponses: [],
    slot: null,
    name: '',
    age: null,
    exitCountdown: 5,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setUserResponse: (state, action) => {
      state.userResponses.push(action.payload);
    },
    setSlot: (state, action) => {
      state.slot = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    startExitCountdown: (state) => {
      state.exitCountdown = 5;
    },
    decrementExitCountdown: (state) => {
      state.exitCountdown -= 1;
    },
  },
});

export const {
  addMessage,
  setUserResponse,
  setSlot,
  setName,
  setAge,
  startExitCountdown,
  decrementExitCountdown,
} = chatSlice.actions;

export default chatSlice.reducer;
