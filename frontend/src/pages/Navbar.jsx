import  { useState } from "react";
import "./HeaderMegaMenu.css";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { logout } from "../redux/auth.slice";
import Swal from "sweetalert2";

export function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

    const handleLog = () => {
      dispatch(logout());
        localStorage.clear();
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
          title: "Log out successfully",
        });
  };

  const isAuthenticated = localStorage.getItem("task-management-fullname");

  let user = localStorage.getItem("task-management-fullname") || "user";

  if (isAuthenticated) {
    const data = JSON.parse(localStorage.getItem("AuthData"));
    user = data?.is_user?.name;
  }

  return (
    <nav className="nav-bar">
    
      <div className="icon-nav">
        <i className="fas fa-moon"></i>
        <span className="logo">Task Managment</span>
      </div>

      <ul className={`list-nav-bar ${isActive ? "active" : ""}`}>
        <li className="list-item">
          <Link style={{ color: "black", fontWeight: "800" }} href="#">
            {user}
          </Link>
        </li>
      </ul>

      {isAuthenticated  ? (
        <button onClick={handleLog} className="button-81">
          Logout
        </button>
      ) : ""}
    </nav>
  );
}
