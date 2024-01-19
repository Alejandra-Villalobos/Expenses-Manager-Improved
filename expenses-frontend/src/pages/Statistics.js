import React from "react";
import SideMenu from "../components/SideMenu";
import Navbar from "../components/Navbar";
import BankAmounts from "../components/charts/BankCharts";
import { CategoryAmounts } from "../components/charts/TransactionCharts";

function Statistics() {
  return (
    <div className="flex bg-emerald-100 overflow-x-hidden">
      <SideMenu page={"statistics"} />
      <div className="flex flex-col w-full min-h-screen h-full gap-3 mt-14">
        <Navbar />
        <section className="w-full mx-4 flex items-center flex-col">
          <h1 className="text-center font-bold text-2xl pt-4">Statistics</h1>
          <p className="text-center italic text-md text-gray-400">* All amounts have been converted to USD </p>
          <BankAmounts/>
          <CategoryAmounts/>
        </section>
      </div>
    </div>
  );
}

export default Statistics;
