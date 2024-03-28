import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("task-management-token") || null,
  fullname: localStorage.getItem("task-management-fullname") || null,
  email: localStorage.getItem("task-management-email") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      const { token, fullname, email } = action.payload;
      state.token = token;
      state.fullname = fullname;
      state.email = email;
      localStorage.setItem("task-management-token", token);
      localStorage.setItem("task-management-fullname", fullname);
      localStorage.setItem("task-management-email", email);
    },
    logout: (state) => {
      state.token = null;
      state.fullname = null;
      state.email = null;
      localStorage.removeItem("task-management-token");
      localStorage.removeItem("task-management-fullname");
      localStorage.removeItem("task-management-email");
    },
    updateFullname: (state, { payload }) => {
      state.fullname = payload;
      localStorage.setItem("task-management-fullname", payload);
    },
  },
});

export const { authenticate, logout, updateFullname } = authSlice.actions;
export default authSlice.reducer;
