import React, { useEffect, useState } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { useAuth } from "../context/AuthContext";
import { getIncomesService } from "../api/income";
import { getOutcomesService } from "../api/outcome";
import TransactionCard from "../components/TransactionCard";
import AddIncome from "../components/forms/AddIncome";
import { Toaster } from "react-hot-toast";
import AddOutcome from "../components/forms/AddOutcome";
import DateFilter from "../components/filters/DateFilter";
import CategoryFilter from "../components/filters/CategoryFilter";
import BanksFilter from "../components/filters/BanksFilter";

function Transactions() {
  const { user } = useAuth();
  const token = user.token;

  const [menuWidth, setMenuWidth] = useState(0);

  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showOutcomeForm, setShowOutcomeForm] = useState(false);

  var [transactions, setTransactions] = useState([]);
  const [updateIncomes, setUpdateIncomes] = useState(false);
  const [updateOutcomes, setUpdateOutcomes] = useState(false);

  const [filterDates, setFilterDates] = useState(null);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterBanks, setFilterBanks] = useState([]);

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

  const formatDate = (value) => {
    const year = value?.year();
    const month = (value?.month() < 10 ? "0" : "") + (value?.month() + 1);
    const date = (value?.date() < 10 ? "0" : "") + value?.date();

    return Number(`${year}${month}${date}`);
  };

  const handleFilter = () => {
    var filteredTransactions = transactions;

    if (filterDates) {
      const startDate = formatDate(filterDates[0]);
      const endDate = formatDate(filterDates[1]);
      filteredTransactions = filteredTransactions.filter((t) => {
        const tDate = t.add_date.split("-").reverse().join("");
        return tDate >= startDate && tDate <= endDate;
      });
    }

    if (filterCategories[0]) {
      filteredTransactions = filteredTransactions.filter((t) => {
        return filterCategories.includes(t.category);
      });
    }

    if (filterBanks[0]) {
      filteredTransactions = filteredTransactions.filter((t) => {
        return filterBanks.includes(t.bank_name);
      });
    }
    setTransactions(filteredTransactions);
  };

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

          <div className="flex items-end w-full justify-center gap-3 mt-8 px-4">
            <DateFilter setDates={setFilterDates} values={filterDates} />
            <CategoryFilter
              setCategories={setFilterCategories}
              values={filterCategories}
            />
            <BanksFilter setBankList={setFilterBanks} values={filterBanks} />
            <button
              className="bg-blue-400 p-2 rounded-md"
              onClick={() => handleFilter()}
            >
              <IoSearch className="hover:scale-125 transition-all ease-in-out" size={25} color="white" />
            </button>
            <button
              className="bg-orange-400 p-2 rounded-md"
              onClick={() => {
                setResetFilters(true);
                setFilterDates(null);
                setFilterCategories([]);
                setFilterBanks([]);
              }}
            >
              <GrPowerReset className=" hover:rotate-180 transition-all ease-in-out" size={25} color="white"/>
            </button>
          </div>

          <div className="flex flex-row justify-start flex-wrap gap-3 mt-8 px-4">
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
