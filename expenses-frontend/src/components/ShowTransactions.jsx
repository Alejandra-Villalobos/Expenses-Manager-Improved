import React, { useState, useEffect } from "react";
import { ImMinus } from "react-icons/im";
import { BiPlusMedical } from "react-icons/bi";
import {
  BsCurrencyBitcoin,
  BsCurrencyDollar,
  BsCurrencyEuro,
} from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { getIncomesService } from "../api/income";
import { getOutcomesService } from "../api/outcome";

function ShowTransactions() {
  const { user } = useAuth();
  const token = user.token;
  var [transactions, setTransactions] = useState([]);

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

  const formatDate = (date) => {
    date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  useEffect(() => {
    // Realiza ambas llamadas asíncronas en paralelo
    Promise.all([getIncomesService(token), getOutcomesService(token)])
      .then(([incomes, outcomes]) => {
        // Combina los resultados y actualiza el estado
        const allTransactions = [...incomes, ...outcomes];
        setTransactions(allTransactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [token]);

  return (
    <div className="flex flex-row justify-start flex-wrap gap-3">
      {transactions.map((transaction, i) => (
        <div
          key={i}
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
          <p className="font-fira text-center">
            {formatDate(transaction.add_date)}
          </p>
          {transaction.to_account != null && (
            <p className="font-fira text-center">
              Sent to: #{transaction.to_account} - {transaction.to_bank_name}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShowTransactions;
