import React from "react";
import { FiMenu } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const token = user.token;

  const handleLogout = async (e) => {
    try {
      await logout(token);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <nav className="z-40 h-14 flex flex-row justify-between shadow-md bg-cyan-500 py-2 border-b-2 border-cyan-600 items-center fixed top-0 left-0 w-screen">
      <button className="ml-11">
        <FiMenu />
      </button>
      <p className="font-bold text-2xl">Expenses Manager</p>
      <button
        className="flex items-center mr-11 gap-x-2 bg-red-500 rounded-lg p-2"
        onClick={handleLogout}
      >
        Cerrar Sesión
        <TbLogout />
      </button>
    </nav>
  );
}

export default Navbar;
