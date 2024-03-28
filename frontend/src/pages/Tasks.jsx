import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Modal from "../componets/Modal";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../componets/TaskCard";
import { addATask, setUserTasks } from "../redux/task.slice";

const Tasks = () => {
  const access_token = useSelector((store) => store.auth.token);
  const tasks = useSelector((store) => store.task.tasks);
  const dispatch = useDispatch();

  const [createTaskLoading, setCreateTaskLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/task/get", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(setUserTasks(response.data.tasks));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (data) => {
    try {
      setCreateTaskLoading(true);
      const { title, description, priority } = data;

      if (!title) {
        return toast.error("Add a title");
      }

      if (!description) {
        return toast.error("Add some description");
      }

      if (!priority) {
        return toast.error("Select priority");
      }
      const response = await axios.post(
        "http://localhost:3000/task/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(response.data);
      setIsOpen(false);
      dispatch(addATask(response.data.newTask));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Task Added successfully",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setCreateTaskLoading(false);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-4xl mb-2 mt-4 font-bold">My Tasks</h1>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          createTask={createTask}
          createTaskLoading={createTaskLoading}
        />

        <div className="w-[500px] mt-4 flex flex-col gap-2 p-4 rounded-lg">
          {tasks.length !== 0 &&
            tasks.map((task) => <TaskCard {...task} key={task._id} />)}
          {tasks.length === 0 && (
            <div className="bg-gray-800 text-white h-10 flex justify-center rounded-full items-center">
              <h1>No task found!</h1>
            </div>
          )}

          <div className="flex justify-center items-center">
            <button
              onClick={openModal}
              className="mt-6 px-6 py-2 rounded-md font-medium bg-gray-800 text-white w-fit  flex items-center"
            >
              <FaPlus className="mr-3" /> Add a task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
