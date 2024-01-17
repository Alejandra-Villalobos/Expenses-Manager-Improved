import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { useAuth } from "../context/AuthContext";
import { getIncomesService } from "../api/income";
import { getOutcomesService } from "../api/outcome";
import TransactionCard from "../components/TransactionCard";

function Transactions() {
  const { user } = useAuth();
  const token = user.token;

  var [transactions, setTransactions] = useState([]);

  useEffect(() => {
    Promise.all([getIncomesService(token), getOutcomesService(token)])
      .then(([incomes, outcomes]) => {
        var allTransactions = [...incomes, ...outcomes];
        allTransactions.sort((t1, t2) => {
          var aa = t1.add_date.split("-").reverse().join(),
            bb = t2.add_date.split("-").reverse().join();
          return aa > bb ? -1 : aa < bb ? 1 : 0;
        });
        setTransactions(allTransactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [token]);
  return (
    <div className="flex bg-emerald-100 overflow-x-hidden">
      <SideMenu page={"transactions"} />
      <div className="flex flex-col w-full min-h-screen h-full gap-3 mt-14">
        <Navbar />
        <div className="w-full">
          <section className="flex flex-row justify-center items-center gap-x-5 mt-8">
            <h1 className="text-center font-bold text-2xl p-4">Transactions</h1>
            <button>
              <MdAddCircle size={25} />
            </button>
          </section>
          <div className="flex flex-row justify-start flex-wrap gap-3">
            {transactions.map((transaction) => (
              <TransactionCard transaction={transaction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
