import express from "express";
import {
  createTask,
  deleteATask,
  getTasksCount,
  getUserTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/task.conrollers.js";
import { authetication } from "../middlewares/authenticaton.js";

const taskRoute = express.Router();

taskRoute.post("/create", authetication, createTask);
taskRoute.get("/count", authetication, getTasksCount);
taskRoute.get("/get", authetication, getUserTasks);
taskRoute.post("/update", authetication, updateTask);
taskRoute.post("/updateStatus", authetication, updateTaskStatus);
taskRoute.post("/deleteTask", authetication, deleteATask);

export default taskRoute;
