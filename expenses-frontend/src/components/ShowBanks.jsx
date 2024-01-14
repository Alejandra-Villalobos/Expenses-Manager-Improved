import React, { useState, useEffect } from "react";
import "../index.css";
import {
  BsCurrencyBitcoin,
  BsCurrencyDollar,
  BsCurrencyEuro,
} from "react-icons/bs";
import { FcSimCardChip } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { getBanksService } from "../api/bank";

function ShowBanks() {
  const { user } = useAuth();
  const token = user.token;

  const [banks, setBanks] = useState([]);
  const setCur = (curr) => {
    switch (curr) {
      case "euro":
        return <BsCurrencyEuro />;
      case "bitcoin":
        return <BsCurrencyBitcoin />;
      default:
        return <BsCurrencyDollar />;
    }
  };

  useEffect(() => {
    getBanksService(token).then((data) => setBanks(data));
  }, [token]);

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {banks.map((bank) => (
        <div
          key={bank.bank_id}
          className="bank-divs rounded-md shadow-lg w-60 p-2 gap-3"
        >
          <p className="font-bold text-lg flex items-center justify-between">
            <FcSimCardChip size={46} />
            {bank.bank_name}
          </p>

          <div className="flex justify-between">
            <p className="italic text-xl">#{bank.account}</p>
            <p className="text-xl flex items-center">
              {setCur(bank.currency)}{bank.amount.toFixed(2)}
            </p>
          </div>
          <p className="text-center text-xl">{bank.username}</p>
        </div>
      ))}
    </div>
  );
}

export default ShowBanks;
