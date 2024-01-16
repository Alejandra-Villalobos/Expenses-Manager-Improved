import React from "react";
import Navbar from "../components/Navbar";
import ShowBanks from "../components/ShowBanks";
import ShowTransactions from "../components/ShowTransactions";
import SideMenu from "../components/SideMenu";

function Home() {
  return (
    <div className="flex bg-emerald-100 overflow-x-hidden">
      <SideMenu page={"home"}/>
      <div className="flex flex-col w-full min-h-screen h-full gap-3 mt-14">
        <Navbar />

        <section className="w-full mx-4 flex items-center flex-col">
          <h1 className="text-center font-bold text-2xl p-4">Statistics</h1>
        </section>

        <section className="w-full mx-4 flex items-center flex-col">
          <h2 className="text-center font-bold text-2xl p-4">Bank Accounts</h2>
          <ShowBanks />
        </section>
        <section className="w-full mx-4 flex items-center flex-col">
          <h2 className="text-center font-bold text-2xl p-4">Transactions</h2>
          <ShowTransactions />
        </section>
      </div>
    </div>
  );
}

export default Home;
