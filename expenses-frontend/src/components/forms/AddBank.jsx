import React, { useState } from "react";
import { Input, Select } from "antd";
import { useAuth } from "../../context/AuthContext";
import { createBankService } from "../../api/bank";

const currencyOptions = [
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "EUR",
    label: "EUR",
  },
  {
    value: "BTC",
    label: "BTC",
  },
];

const AddBank = ({ open, setOpen, handleUpdate }) => {
  const { user } = useAuth();
  const token = user.token;

  const [account, setAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    try {
      await createBankService(
        token,
        account,
        bankName,
        currency,
        amount,
        username
      );
      handleUpdate(true);
      setOpen(false);

      setAccount('')
      setBankName('')
      setCurrency('')
      setAmount('')
      setAmount('')
      setUsername('')
    } catch (error) {}
  };

  return open ? (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="relative p-8 bg-white rounded-md">
        <h1 className="text-center font-bold text-xl p-2">Add new bank</h1>
        <form className="flex flex-col gap-8 p-2">
          <Input
            className="p-2"
            placeholder="Account number"
            onChange={(e) => setAccount(e.target.value)}
            required
          />
          <Input
            className="p-2"
            placeholder="Bank name"
            onChange={(e) => setBankName(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <Select
              className="w-3/6"
              placeholder="Currency"
              onChange={setCurrency}
              options={currencyOptions}
            />
            <Input
              className="w-3/6"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Input
            className="p-2"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="flex flex-row justify-between text-white">
            <button
              className="bg-red-500 rounded-md py-2 px-4"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 rounded-md py-2 px-4"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Add bank
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default AddBank;
