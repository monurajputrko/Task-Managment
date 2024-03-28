import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  count: {
    allTasksCount: 0,
    completedTasksCount: 0,
    inProgressTasksCount: 0,
    pendingTasksCount: 0,
    queriedTaskCount: 0,
  },
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setUserTasks: (state, { payload }) => {
      state.tasks = payload;
    },
    setUserTasksCount: (state, { payload }) => {
      state.count = payload;
    },
    addATask: (state, { payload }) => {
      state.tasks = [...state.tasks, payload];
    },
    updateTask: (state, { payload }) => {
      const { _id, title, description, priority } = payload;
      console.log("payload", payload);
      const taskToUpdate = state.tasks.find((task) => task._id === _id);

      if (taskToUpdate) {
        taskToUpdate.title = title;
        taskToUpdate.description = description;
        taskToUpdate.priority = priority;
      }
    },
    updateTaskStatus: (state, { payload }) => {
      const { taskId, newStatus } = payload;
      const taskToUpdate = state.tasks.find((task) => task._id === taskId);
      if (taskToUpdate) {
        taskToUpdate.status = newStatus;
      }
    },
    deleteATask: (state, { payload }) => {
      // const { taskId } = payload;

      const updatedTasks = state.tasks.filter((task) => task._id !== payload);

      return {
        ...state,
        tasks: updatedTasks,
      };
    },
  },
});

export const {
  setUserTasks,
  addATask,
  updateTask,
  updateTaskStatus,
  setUserTasksCount,
} = taskSlice.actions;
export default taskSlice.reducer;
