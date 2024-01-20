import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import { AiFillPieChart, AiFillBank, AiFillHome } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { MdMenuOpen } from "react-icons/md";
import { Menu } from "antd";

import "../index.css";

const SideMenu = ({ page, passWidth }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [width, setWidth] = useState(155);
  const widthRef = useRef(null);

  useLayoutEffect(() => {
    setWidth(widthRef.current.offsetWidth);
    passWidth(width)
  }, [collapsed]);

  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center fixed h-screen left-0 z-30 w-max"
      ref={widthRef}
    >
      <button
        onClick={toggleCollapsed}
        className="p-3 h-14 w-full bg-cyan-500 border-b-2 border-cyan-600"
      >
        <MdMenuOpen
          className={`${
            collapsed ? "rotate-180" : ""
          } w-full transition-all ease-in-out duration-700`}
          size={25}
        />
      </button>
      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        defaultSelectedKeys={page}
      >
        <Menu.Item icon={<AiFillHome size={20} />} key="home">
          <Link to="/home" className="flex items-center gap-3">
            <p>Home</p>
          </Link>
        </Menu.Item>
        <Menu.Item icon={<AiFillPieChart size={20} />} key="statistics">
          <Link to="/statistics" className="flex items-center gap-3">
            <p>Statistics</p>
          </Link>
        </Menu.Item>
        <Menu.Item icon={<AiFillBank size={20} />} key="banks">
          <Link to="/banks" className="flex items-center gap-3">
            <p>Banks</p>
          </Link>
        </Menu.Item>
        <Menu.Item icon={<GrTransaction size={20} />} key="transactions">
          <Link to="/transactions" className="flex items-center gap-3">
            <p>Transactions</p>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default SideMenu;
