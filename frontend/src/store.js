import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/auth.slice";
import taskSlice from "./redux/task.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
  },
});

export default store;
