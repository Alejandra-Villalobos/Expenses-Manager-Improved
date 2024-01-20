import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import BankAmounts from "../components/charts/BankCharts";
import TransactionCharts from "../components/charts/TransactionCharts";

function Statistics() {
  const [menuWidth, setMenuWidth] = useState(0);
  return (
    <div className="flex bg-emerald-100 overflow-x-hidden">
      <SideMenu page={"statistics"} passWidth={setMenuWidth} />
      <div
        className="flex flex-col w-full min-h-screen h-full gap-3 mt-14 transition-all ease-in-out duration-700"
        style={{ marginLeft: `${menuWidth + 12}px` }}
      >
        <Navbar />
        <section className="w-full mx-4 flex items-center flex-col">
          <h1 className="text-center font-bold text-2xl pt-4">Statistics</h1>
          <p className="text-center italic text-md text-gray-400">
            * All amounts have been converted to USD{" "}
          </p>
          <div className="flex flex-wrap">
            <BankAmounts />
            <TransactionCharts />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Statistics;
