import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import AddBank from "../components/forms/AddBank";
import { useAuth } from "../context/AuthContext";
import { getBanksService } from "../api/bank";
import BankCard from "../components/BankCard";

function Banks() {
  const { user } = useAuth();
  const token = user.token;

  const [showBankForm, setShowBankForm] = useState(false);
  const [banks, setBanks] = useState([]);
  const [updateBanks, setUpdateBanks] = useState(false);

  useEffect(() => {
    getBanksService(token).then((data) => setBanks(data));
    setUpdateBanks(false)
  }, [token, updateBanks]);

  return (
    <div className="flex bg-emerald-100 overflow-x-hidden">
      <Toaster />
      <SideMenu page={"banks"} />
      <div className="flex flex-col w-full min-h-screen h-full gap-3 mt-14">
        <Navbar />
        <div className="w-full">
          <section className="flex flex-row justify-center items-center gap-x-5 mt-8">
            <h1 className="text-center font-bold text-2xl p-4">
              Bank Accounts
            </h1>
            <button onClick={() => setShowBankForm(true)}>
              <MdAddCircle size={25} />
            </button>
            <AddBank
              open={showBankForm}
              setOpen={setShowBankForm}
              handleUpdate={setUpdateBanks}
            />
          </section>
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
        </div>
      </div>
    </div>
  );
}

export default Banks;
