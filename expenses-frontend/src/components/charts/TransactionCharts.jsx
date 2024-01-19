import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { getIncomesService } from "../../api/income";
import { getOutcomesService } from "../../api/outcome";
import { useAuth } from "../../context/AuthContext";

function CategoryAmounts() {
    const { user } = useAuth();
    const token = user.token;

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
        
              transactions.forEach((transaction) => {
                const { category, amount } = transaction;
                const isIncome = transaction.hasOwnProperty("income_id");
        
                if (isIncome) {
                  categorySums[category].incomes += amount;
                } else {
                  categorySums[category].outcomes += amount;
                }
              });

              const data = Object.keys(categorySums).map((category) => ({
                category,
                incomes: categorySums[category].incomes,
                outcomes: categorySums[category].outcomes,
              }));
              console.log(data);
            
          })
          .catch((error) => {
            console.error("Error fetching transactions:", error);
          });
        
      }, [token]);
}

export { CategoryAmounts }