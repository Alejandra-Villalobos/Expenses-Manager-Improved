import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, Statistic } from "antd";

import { getIncomesService } from "../../api/income";
import { getOutcomesService } from "../../api/outcome";
import { useAuth } from "../../context/AuthContext";

function CategoryAmounts() {
  const { user } = useAuth();
  const token = user.token;

  const [categories, setCategories] = useState([]);
  const [transactionsInfo, setTransactionsInfo] = useState([]);

  useEffect(() => {
    Promise.all([getIncomesService(token), getOutcomesService(token)])
      .then(([incomes, outcomes]) => {
        var transactions = [...incomes, ...outcomes];
        const categorySums = {
          Work: { incomes: 0, outcomes: 0 },
          Food: { incomes: 0, outcomes: 0 },
          Education: { incomes: 0, outcomes: 0 },
          Health: { incomes: 0, outcomes: 0 },
          Vacation: { incomes: 0, outcomes: 0 },
          Other: { incomes: 0, outcomes: 0 },
        };

        const transactionSums = {
          Incomes: { count: 0, amount: 0 },
          Outcomes: { count: 0, amount: 0 },
        };

        transactions.forEach((transaction) => {
          const { category, amount } = transaction;
          const isIncome = transaction.hasOwnProperty("income_id");

          if (isIncome) {
            categorySums[category].incomes += amount;
            transactionSums["Incomes"].count++;
            transactionSums["Incomes"].amount += amount;
          } else {
            categorySums[category].outcomes += amount;
            transactionSums["Outcomes"].count++;
            transactionSums["Outcomes"].amount += amount;
          }
        });

        const categoryData = Object.keys(categorySums).map((category) => ({
          category,
          Incomes: categorySums[category].incomes,
          Outcomes: categorySums[category].outcomes,
        }));

        const transactionData = Object.keys(transactionSums).map((type) => ({
          type,
          count: transactionSums[type].count,
          amount: transactionSums[type].amount,
        }));

        setCategories(categoryData);
        setTransactionsInfo(transactionData);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [token]);

  return (
    <>
      <div className="flex  flex-col items-center">
        <p className="font-bold text-xl pt-4">
          Incomes - Outcomes in categories
        </p>
        <BarChart width={700} height={300} data={categories}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend verticalAlign="top" />
          <Bar dataKey="Incomes" fill="#19e326" />
          <Bar dataKey="Outcomes" fill="#e81058" />
        </BarChart>
      </div>
      <div className="flex">
        <Card bordered={false}>
          <Statistic
            title="Incomes"
            value={transactionsInfo[0]?.amount}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix="$"
            suffix={` (${transactionsInfo[0]?.count})`}
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Outcomes"
            value={transactionsInfo[1]?.amount}
            precision={2}
            valueStyle={{
              color: "#cf1322",
            }}
            prefix="$"
            suffix={` (${transactionsInfo[1]?.count})`}
          />
        </Card>
      </div>
    </>
  );
}

export { CategoryAmounts };
