import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUserTasks } from "./redux/task.slice";
import { Navbar } from "./pages/Navbar";
import { Signup } from "./pages/Signup";

function App() {
  const access_token = useSelector((store) => store.auth.token);
  const auth = useSelector((store) => store.auth);
  const tasks = useSelector((store) => store.task.tasks);
  const dispatch = useDispatch();
  console.log("Store", auth);
  console.log("tasks", tasks);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/task/get", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          page: 1,
        },
      });
      dispatch(setUserTasks(response.data.tasks));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [auth?.token, dispatch]);

  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route
          path="/signup"
          element={!auth?.token ? <Signup /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/"
          element={!auth?.token ? <Login /> : <Navigate to="/tasks" />}
        />
        <Route
          path="/tasks"
          element={auth?.token ? <Tasks /> : <Navigate to="/" />}
        />

      </Routes>
    </>
  );
}

export default App;
