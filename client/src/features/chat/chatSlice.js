import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  onlineUsers: [],
  selectedUser: null,
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
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
      console.log("Online users updated in state:", state.onlineUsers);
    },
  },
});

export const {
  setUsers,
  setSelectedUser,
  setOnlineUsers,
} = chatSlice.actions;

export default chatSlice.reducer;
