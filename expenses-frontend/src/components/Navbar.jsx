import React from "react";
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
    <nav className="z-10 h-14 flex flex-row justify-between shadow-md bg-cyan-500 py-2 border-b-2 border-cyan-600 items-center fixed top-0 left-0 w-full">
      <p></p>
      <p className="font-bold text-2xl text-center">Expenses Manager</p>
      <button
        className="flex items-center mr-2 gap-x-2 bg-red-500 rounded-lg p-2"
        onClick={handleLogout}
      >
        Cerrar Sesión
        <TbLogout />
      </button>
    </nav>
  );
}

export default Navbar;
