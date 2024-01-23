import React, { useEffect, useState } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { useAuth } from "../context/AuthContext";
import { getIncomesService } from "../api/income";
import { getOutcomesService } from "../api/outcome";
import TransactionCard from "../components/TransactionCard";
import AddIncome from "../components/forms/AddIncome";
import { Toaster } from "react-hot-toast";
import AddOutcome from "../components/forms/AddOutcome";
import DateFilter from "../components/forms/DateFilter";
import CategoryFilter from "../components/forms/CategoryFilter";

function Transactions() {
  const { user } = useAuth();
  const token = user.token;

  const [menuWidth, setMenuWidth] = useState(0);

  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showOutcomeForm, setShowOutcomeForm] = useState(false);

  var [transactions, setTransactions] = useState([]);
  const [updateIncomes, setUpdateIncomes] = useState(false);
  const [updateOutcomes, setUpdateOutcomes] = useState(false);

  const [filterDates, setFilterDates] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);


  const [resetFilters, setResetFilters] = useState(false);

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
    setUpdateIncomes(false);
    setUpdateOutcomes(false);
    setResetFilters(false);
  }, [token, updateIncomes, updateOutcomes, resetFilters]);

  const handleFilter = () => {
    const filteredTransactions = [];
    transactions.forEach((t) => {
      var tDate = t.add_date.split("-").reverse().join("");
      if(filterCategories.find((c) => t.category === c) && tDate >= filterDates[0] && tDate <= filterDates[1])
        filteredTransactions.push(t)
    })
    setTransactions(filteredTransactions);
  }

  return (
    <div className="flex bg-emerald-100 overflow-x-hidden">
      <Toaster />
      <SideMenu page={"transactions"} passWidth={setMenuWidth} />
      <div
        className="flex flex-col w-full min-h-screen h-full gap-3 mt-14 transition-all ease-in-out duration-700"
        style={{ marginLeft: `${menuWidth + 12}px` }}
      >
        <Navbar />
        <div className="w-full">
          <section className="flex flex-col justify-center items-center">
            <h1 className="text-center font-bold text-2xl p-4">Transactions</h1>
            <div className="flex gap-3">
              <button
                className="flex items-center bg-green-500 rounded-md py-2 px-4 shadow-lg"
                onClick={() => setShowIncomeForm(true)}
              >
                Add Income
                <FaLongArrowAltDown />
              </button>
              <button
                className="flex items-center bg-red-500 rounded-md py-2 px-4 shadow-lg"
                onClick={() => setShowOutcomeForm(true)}
              >
                Add Outcome
                <FaLongArrowAltUp />
              </button>
            </div>
            <AddIncome
              open={showIncomeForm}
              setOpen={setShowIncomeForm}
              handleUpdate={setUpdateIncomes}
            />
            <AddOutcome
              open={showOutcomeForm}
              setOpen={setShowOutcomeForm}
              handleUpdate={setUpdateOutcomes}
            />
          </section>
          <div className="flex items-end">
            <DateFilter setDates={setFilterDates} />
            <CategoryFilter setCategories={setFilterCategories}/>
            <button className="bg-blue-400 p-2 rounded-md" onClick={() => handleFilter()}>Reset Filters</button>
            <button className="bg-orange-400 p-2 rounded-md" onClick={() => setResetFilters(true)}>Reset Filters</button>
          </div>
          <div className="flex flex-row justify-start flex-wrap gap-3">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.income_id || transaction.outcome_id}
                transaction={transaction}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
