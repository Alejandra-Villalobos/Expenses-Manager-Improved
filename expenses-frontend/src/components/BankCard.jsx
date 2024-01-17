import React from "react";
import "../index.css";
import {
  BsCurrencyBitcoin,
  BsCurrencyDollar,
  BsCurrencyEuro,
} from "react-icons/bs";
import { FcSimCardChip } from "react-icons/fc";

function BankCard({ bank_id, bankName, account, currency, amount, username }) {
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
  return (
    <div
      key={bank_id}
      className="bank-divs rounded-md shadow-lg w-60 p-2 gap-3"
    >
      <p className="font-bold text-lg flex items-center justify-between">
        <FcSimCardChip size={46} />
        {bankName}
      </p>

      <div className="flex justify-between">
        <p className="italic text-xl">#{account}</p>
        <p className="text-xl flex items-center">
          {setCur(currency)}
          {amount.toFixed(2)}
        </p>
      </div>
      <p className="text-center text-xl">{username}</p>
    </div>
  );
}

export default BankCard;
