import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { Toaster } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { loginService } from "../api/auth";

import loginImg from "../assets/login.png";
import Icon from "../assets/Icon";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      const userInfo = await loginService(email, password);
      setUser(userInfo);
      navigate("/home");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
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
          <img
            src={loginImg}
            alt="login"
            className="w-auto h-3/4 drop-shadow-md"
          />
          <form className="bg-white rounded-lg border-gray-300 shadow-md border-1 p-5 flex flex-col w-1/3">
            <Icon />
            <h1 className="text-center font-bold text-2xl mt-4">Log In</h1>
            <Input
              className="p-3 mt-8"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input.Password
              className="p-3 mt-8"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="text-center mt-8 text-white bg-blue-500 p-3 hover:bg-blue-700 rounded-md w-full cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Log In
            </button>
            <button className="text-center cursor-pointer mt-4 text-teal-600 hover:text-teal-700">
              New to expenses manager? Register!
            </button>
          </form>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Login;
