import axios from "axios";
import  {  useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus } from "../redux/task.slice";
import EditTaskModal from "./EditTaskModal";
import Swal from "sweetalert2";

const TaskCard = ({
  title,
  description,
  status,
  priority,
  _id
}) => {
  const access_token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const priorityColor = {
    low: "bg-green-500",
    medium: "bg-yellow-400",
    high: "bg-red-500",
  };


  const handleStatusChange = async (e) => {
    try {
      const status = e;
      const response = await axios.post(
        "http://localhost:3000/task/updateStatus",
        { taskId: _id, status },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      const { status: newStatus, _id: taskId } = response.data.task;
      dispatch(updateTaskStatus({ taskId, newStatus }));
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
        title: "Task Status Updated successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTaskDelete = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/task/deleteTask",
        { taskId: _id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
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
        title: "Task Deleted successfully",
      });
      window.location.reload();
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[200px] p-4 rounded-2xl border-2 border-black/40 ">
      <div className="flex items-center justify-between">
        <h1 className={`text-4xl capitalize line-clamp-1`}>{title}</h1>
        <div className="flex gap-2">
          <MdOutlineEdit
            onClick={openModal}
            size={24}
            className="hover:cursor-pointer"
          />
          <MdDeleteOutline
            size={24}
            className="hover:cursor-pointer"
            onClick={handleTaskDelete}
          />
        </div>
        <EditTaskModal
          isOpen={isOpen}
          onClose={closeModal}
          title={title}
          description={description}
          status={status}
          task_priority={priority}
          _id={_id}
        />
      </div>
      <p className={`line-clamp-2 capitalize`}>{description}</p>
      <div className="mt-2  gap-2 flex justify-center items-center   text-gray-800">
        {status === "completed" ? (
          <label className="mr-2">
            <button
              value="pending"
              onClick={(e) => {
                status === "pending";
                handleStatusChange(e.target.value);
              }}
              className="mr-1 w-[150px] h-[50px] border-2 border-black/20 rounded-lg"
            >
              completed
            </button>
          </label>
        ) : (
          <label>
            <button
              value="completed"
              onClick={(e) => {
                status === "completed";
                handleStatusChange(e.target.value);
              }}
              className="mr-1 w-[150px] h-[50px] border-2 border-black/20 rounded-lg"
            >
              Pending
            </button>
          </label>
        )}
      </div>

      <div className="flex justify-between items-center capitalize text-white">
        <div className="flex gap-2">
          <div
            className={`${priorityColor[priority]} rounded-lg px-4 text-center mt-3`}
          >
            {priority}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
