import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatbotSlice";

export const store = configureStore({
  reducer: {
    chatbot: chatReducer,
  },
});
