import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { useAuth } from "../context/AuthContext";
import { getBanksService } from "../api/bank";
import BankCard from "../components/BankCard";
import { getIncomesService } from "../api/income";
import { getOutcomesService } from "../api/outcome";
import TransactionCard from "../components/TransactionCard";

function Home() {
  const { user } = useAuth();
  const token = user.token;

  const [banks, setBanks] = useState([]);
  var [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getBanksService(token).then((data) => setBanks(data));

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
      <SideMenu page={"home"} />
      <div className="flex flex-col w-full min-h-screen h-full gap-3 mt-14">
        <Navbar />
        <section className="w-full mx-4 flex items-center flex-col">
          <h2 className="text-center font-bold text-2xl p-4">Bank Accounts</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            {banks.map((bank) => (
              <BankCard
                key={bank.bank_id}
                bank_id={bank.bank_id}
                bankName={bank.bank_name}
                account={bank.account}
                currency={bank.currency}
                amount={bank.amount}
                username={bank.username}
              />
            ))}
          </div>
        </section>
        <section className="w-full mx-4 flex items-center flex-col">
          <h2 className="text-center font-bold text-2xl p-4">Transactions</h2>
          <div className="flex flex-row justify-start flex-wrap gap-3">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.income_id || transaction.outcome_id} transaction={transaction} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
