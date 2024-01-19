import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { getBanksService } from "../../api/bank";
import { useAuth } from "../../context/AuthContext";

export default function BankAmounts() {
  const { user } = useAuth();
  const token = user.token;

  const [banks, setBanks] = useState([]);

  const colors = [
    "#3498db",
    "#2ecc71",
    "#e74c3c",
    "#9b59b6",
    "#f39c12",
    "#1abc9c",
    "#c0392b",
    "#7f8c8d",
    "#d35400",
    "#27ae60",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`$${value.toFixed(2)}`}
      </text>
    );
  };

  useEffect(() => {
    getBanksService(token).then((data) => {
      for (var i in data) {
        if (data[i].currency === "EUR") {
          data[i].amount *= 1.09;
        }
      }
      const bankData = data.map((bank) => ({
        id: bank.bank_id,
        name: `${bank.account} - ${bank.bank_name}`,
        value: bank.amount,
      }));

      setBanks(bankData);
    });
  }, [token]);

  return (
    <>
      <p className="font-bold text-xl pt-4">Amount distribution in accounts</p>
      <PieChart width={730} height={300}>
        <Pie
          dataKey="value"
          outerRadius={90}
          data={banks}
          labelLine={false}
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
        >
          {banks.map((bank, index) => (
            <Cell key={bank.id} fill={colors.at(index)} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
        <Tooltip formatter={(value) => value.toFixed(2)} />
      </PieChart>
    </>
  );
}
