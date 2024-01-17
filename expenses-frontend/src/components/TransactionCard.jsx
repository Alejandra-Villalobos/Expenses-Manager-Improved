import React from "react";
import { ImMinus } from "react-icons/im";
import { BiPlusMedical } from "react-icons/bi";
import {
  BsCurrencyBitcoin,
  BsCurrencyDollar,
  BsCurrencyEuro,
} from "react-icons/bs";

function TransactionCard({ transaction }) {
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
      key={transaction.income_id || transaction.outcome_id}
      className={`w-56 mt-5 rounded-md border-2 shadow-md ${
        transaction.hasOwnProperty("to_account")
          ? "border-red-600 bg-red-300"
          : "border-green-600 bg-green-300"
      }`}
    >
      <p
        className={`text-white font-bold font-fira text-center px-12 ${
          transaction.hasOwnProperty("to_account")
            ? "bg-red-600"
            : "bg-green-600"
        }`}
      >
        {transaction.hasOwnProperty("to_account") ? "Outcome" : "Income"}
      </p>
      <p className="font-fira font-bold text-md text-center">
        {transaction.bank_name}
      </p>
      <p className="font-fira font-bold text-lg text-center flex items-center justify-center gap-1">
        {transaction.hasOwnProperty("to_account") ? (
          <ImMinus color="red" />
        ) : (
          <BiPlusMedical color="green" />
        )}
        {setCur(transaction.currency)}
        {transaction.amount.toFixed(2)}
      </p>
      <p className="font-fira text-center">{transaction.category}</p>
      <p className="font-fira text-center">
        Description: {transaction.description}
      </p>
      <p className="font-fira text-center">{transaction.add_date}</p>
      {transaction.to_account != null && (
        <p className="font-fira text-center">
          Sent to: #{transaction.to_account} - {transaction.to_bank_name}
        </p>
      )}
    </div>
  );
}

export default TransactionCard;
