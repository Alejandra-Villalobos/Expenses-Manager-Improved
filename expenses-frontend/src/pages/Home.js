import React from "react";
import Navbar from "../components/Navbar";
import ShowBanks from "../components/ShowBanks";
import ShowTransactions from "../components/ShowTransactions";

function Home() {
  return (
      <div className="flex flex-col bg-emerald-100 w-full min-h-screen h-full gap-3 mt-14 overflow-x-hidden">
      <Navbar />
        <section className="w-full mx-4 flex items-center flex-col">
          <h1 className="text-center font-bold text-2xl p-4">Dashboard</h1>
        </section>
        
        <section className="w-full mx-4 flex items-center flex-col">
          <h2 className="text-center font-bold text-2xl p-4">Bank Accounts</h2>
          <ShowBanks />
        </section>
        <section className="w-full mx-4 flex items-center flex-col">
          <h2 className="text-center font-bold text-2xl p-4">Transactions</h2>
          <ShowTransactions/>
        </section>
      </div>
  );
}

export default Home;
