import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { useAuth } from "../context/AuthContext";
import { getBanksService } from "../api/bank";
import BankCard from "../components/BankCard";
import { getIncomesService } from "../api/income";
import { getOutcomesService } from "../api/outcome";
import TransactionCard from "../components/TransactionCard";
import NoData from "../components/NoData";

function Home() {
  const { user } = useAuth();
  const token = user.token;

  const [menuWidth, setMenuWidth] = useState(0);

  const [banks, setBanks] = useState([]);
  const [noDataBanks, setNoDataBanks] = useState(false);

  var [transactions, setTransactions] = useState([]);
  const [noDataTransactions, setNoDataTransactions] = useState(false);


  useEffect(() => {
    getBanksService(token).then((data) => {
      setBanks(data);
      if (data.length === 0) setNoDataBanks(true);
    });

    Promise.all([getIncomesService(token), getOutcomesService(token)])
      .then(([incomes, outcomes]) => {
        var allTransactions = [...incomes, ...outcomes];
        allTransactions.sort((t1, t2) => {
          var aa = t1.add_date.split("-").reverse().join(),
            bb = t2.add_date.split("-").reverse().join();
          return aa > bb ? -1 : aa < bb ? 1 : 0;
        });
        if(allTransactions.length === 0) setNoDataTransactions(true)
        setTransactions(allTransactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [token]);

  return (
    <div className="flex bg-emerald-100 overflow-x-hidden">
      <SideMenu page={"home"} passWidth={setMenuWidth} />
      <div
        className="flex flex-col w-full min-h-screen h-full gap-3 mt-14 transition-all ease-in-out duration-700"
        style={{ marginLeft: `${menuWidth + 12}px` }}
      >
        <Navbar />
        <section className="w-full flex items-center flex-col">
          <h2 className="text-center font-bold text-2xl p-4">Bank Accounts</h2>
          <div className="flex gap-4 flex-wrap">
            {noDataBanks && <NoData/>}
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
        <section className="w-full flex items-center flex-col">
          <h2 className="text-center font-bold text-2xl p-4">Transactions</h2>
          <div className="flex flex-row justify-start flex-wrap gap-3">
          {noDataTransactions && <NoData/>}
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.income_id || transaction.outcome_id}
                transaction={transaction}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
