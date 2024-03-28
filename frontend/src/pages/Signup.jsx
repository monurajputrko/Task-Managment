import  { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authenticate } from "../redux/auth.slice";

 export const Signup = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/register", user);
      console.log(res.data);
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
        title: "Account Created successfully",
      });
      dispatch(authenticate(res.data));
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <div className="bg-[#ffffff] h-screen w-full flex items-center justify-center">
      <div className="flex justify-center items-center">
        <form className="flex flex-col gap-3 w-[400px] border-2 rounded-lg border-black/45 p-6 text-black bg-[#d5d5d5]">
          <div className="flex justify-end items-center">
            Already have a account?{" "}
            <Link to="/">
              <h1 className="bg-[#f0f1f6] px-3 py-1 rounded-lg ml-4">Login</h1>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-center">Sign Up</h1>

          <label className="bg-gray-800 w-30 rounded-lg text-center text-white px-2">
            Fullname
          </label>
          <input
            type="text"
            placeholder="Fullname"
            className="p-2 text-black rounded-md"
            value={user.fullname}
            onChange={handleChange}
            name="fullname"
          />

          <label className="bg-gray-800 w-30 rounded-lg text-center text-white px-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="p-2 text-black rounded-md"
            value={user.email}
            onChange={handleChange}
            name="email"
          />
          <label className="bg-gray-800 w-30 rounded-lg text-center text-white px-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="p-2 border-blue-500 rounded-md"
            value={user.password}
            onChange={handleChange}
            name="password"
          />

          <button
            type="submit"
            onClick={handleRegister}
            className="m-auto px-6 py-2 font-medium bg-gray-800 text-white w-fit  "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

