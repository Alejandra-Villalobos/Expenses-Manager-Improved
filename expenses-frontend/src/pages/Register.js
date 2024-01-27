import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Input } from "antd";
import toast, { Toaster } from "react-hot-toast";

import { registerService } from "../api/auth";

import Icon from "../assets/Icon";

function Register() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [repeatpassword, setRepeatPassword] = useState();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    if (password !== repeatpassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      await registerService(email, name, password);
      toast.success("User created!")
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error de registro:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-sky-400 to-indigo-900 h-screen">
      <Toaster />
      <div className="h-screen">
        <h1 className="text-center text-white pt-12 font-bold text-4xl">
          Welcome to Expenses Manager!
        </h1>
        <div className="flex flex-row justify-around items-center h-5/6">
          <form className="bg-white rounded-lg border-gray-300 shadow-md border-1 p-5 flex flex-col w-1/3">
            <Icon />
            <h1 className="text-center font-bold text-2xl mt-4">Register</h1>
            <Input
              className="p-3 mt-8"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              className="p-3 mt-8"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input.Password
              className="p-3 mt-8"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input.Password
              className="p-3 mt-8"
              placeholder="Repeat password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <button
              className="text-center mt-8 text-white bg-blue-500 p-3 hover:bg-blue-700 rounded-md w-full cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              Register
            </button>
            <Link
              to={"/"}
              className="text-center cursor-pointer mt-4 text-teal-600 hover:text-teal-700"
            >
              <button>Already have an account? Log in!</button>
            </Link>
          </form>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
export default Register;
