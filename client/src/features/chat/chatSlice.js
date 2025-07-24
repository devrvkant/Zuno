import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  onlineUsers: [],
  selectedUser: null,
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
      console.log("Messages set:", state.messages);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  setUsers,
  setSelectedUser,
  addMessage,
  clearMessages,
  setMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
