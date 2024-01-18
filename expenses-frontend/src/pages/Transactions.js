import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { useAuth } from "../context/AuthContext";
import { getIncomesService } from "../api/income";
import { getOutcomesService } from "../api/outcome";
import TransactionCard from "../components/TransactionCard";
import AddIncome from "../components/forms/AddIncome";
import { Toaster } from "react-hot-toast";

function Transactions() {
  const { user } = useAuth();
  const token = user.token;

  const [showIncomeForm, setShowIncomeForm] = useState(false);
  
  
  var [transactions, setTransactions] = useState([]);
  const [updateIncomes, setUpdateIncomes] = useState(false);

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
      setUpdateIncomes(false)
  }, [token, updateIncomes]);
  return (
    <div className="flex bg-emerald-100 overflow-x-hidden">
      <Toaster/>
      <SideMenu page={"transactions"} />
      <div className="flex flex-col w-full min-h-screen h-full gap-3 mt-14">
        <Navbar />
        <div className="w-full">
          <section className="flex flex-row justify-center items-center gap-x-5 mt-8">
            <h1 className="text-center font-bold text-2xl p-4">Transactions</h1>
            <button onClick={() => setShowIncomeForm(true)}>
              <MdAddCircle size={25} />
            </button>
            <AddIncome open={showIncomeForm} setOpen={setShowIncomeForm} handleUpdate={setUpdateIncomes}/>
          </section>
          <div className="flex flex-row justify-start flex-wrap gap-3">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.income_id || transaction.outcome_id} transaction={transaction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
