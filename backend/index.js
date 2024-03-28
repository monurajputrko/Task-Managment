import express from "express";
import cors from "cors";
import connection from "./db/connection.js";
import authRoute from "./routes/auth.route.js";
import taskRoute from "./routes/task.route.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/task", taskRoute);

app.listen(PORT, () => {
  connection();
  console.log(`Listening on port ${PORT}`);
});
