import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/task.slice";

const EditTaskModal = ({
  isOpen,
  onClose,
  title,
  description,
  status,
  task_priority,
  _id,
}) => {
  const [priority, setPriority] = useState(task_priority);
  const access_token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    title,
    description,
    priority,
    status: "pending",
  });

  useEffect(() => {
    setTask((prevTask) => ({
      ...prevTask,
      priority: priority,
    }));
  }, [priority]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/task/update",
        {
          taskId: _id,
          title: task.title,
          description: task.description,
          priority: task.priority,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      //   console.log(response.data);
      dispatch(updateTask(response.data.task));
     
      onClose();
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
        title: "Task Updated successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
          <div className="fixed inset-0 transition-opacity bg-black opacity-50"></div>
          <div className="relative z-20 bg-white rounded-lg max-w-lg w-[480px] p-6">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <h2 className="text-2xl font-medium mb-5">Add a task!</h2>

            <div className="flex items-center">
              <label className="bg-gray-800 rounded-lg text-center font-light text-sm text-white px-2 py-1">
                Task Title
              </label>
            </div>

            <input
              type="text"
              placeholder="Task Title"
              className="w-full p-2 mt-4 mb-4 border-2 border-black/50 rounded-lg"
              value={task.title}
              onChange={handleChange}
              name="title"
            />

            <div className="flex items-center">
              <label className="bg-gray-800 rounded-lg text-center font-light text-sm text-white px-2 py-1">
                Description
              </label>
            </div>

            <textarea
              type="text"
              placeholder="Description"
              className="w-full p-2 mt-4 mb-4 border-2 border-black/50 rounded-lg"
              value={task.description}
              onChange={handleChange}
              name="description"
            />

            <div className="flex items-center mb-4">
              <label className="bg-gray-800 rounded-lg text-center font-light text-sm text-white px-2 py-1">
                Select Priority
              </label>
            </div>

            <div className="flex gap-3 mt-3 mb-3 font-light">
              <div
                className={`w-14 text-center border-2 border-black/50 rounded-full hover:cursor-pointer ${
                  priority == "low" && "bg-green-500"
                }`}
                onClick={() => setPriority("low")}
              >
                Low
              </div>
              <div
                className={`w-20 text-center border-2 border-black/50 rounded-full hover:cursor-pointer ${
                  priority == "medium" && "bg-yellow-400"
                }`}
                onClick={() => setPriority("medium")}
              >
                Medium
              </div>
              <div
                className={`w-20 text-center border-2 border-black/50 rounded-full hover:cursor-pointer ${
                  priority == "high" && "bg-red-500"
                }`}
                onClick={() => setPriority("high")}
              >
                High
              </div>
            </div>

            <hr className="mt-2 mb-2" />

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="text-white bg-black px-3 py-1 rounded  mt-1 mb-2"
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTaskModal;
