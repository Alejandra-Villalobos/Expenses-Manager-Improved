import React, { useEffect, useState } from "react";
import { Input, Select, DatePicker } from "antd";
import { useAuth } from "../../context/AuthContext";
import { createIncomeService } from "../../api/income";
import { getBanksService } from "../../api/bank";

const categoryOptions = [
  {
    value: "food",
    label: "Food",
  },
  {
    value: "work",
    label: "Work",
  },
  {
    value: "vacation",
    label: "Vacation",
  },
  {
    value: "education",
    label: "Education",
  },
  {
    value: "health",
    label: "Health",
  },
  {
    value: "other",
    label: "Other",
  },
];

const AddIncome = ({ open, setOpen, handleUpdate }) => {
  const { user } = useAuth();
  const token = user.token;

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [bankId, setBankId] = useState("");

  const [banks, setBanks] = useState([]);


  useEffect(() => {
    getBanksService(token)
    .then((data) => {
      const transformedBanks = data.map((bank) => ({
        value: bank.bank_id,
        label: `${bank.account} - ${bank.bank_name}`
      }));

      setBanks(transformedBanks);
    })
  }, [token]);

  const handleSelectCategory = (value) => {
    setCategory(value);
  };

  const handleSelectBank = (value) => {
    setBankId(value);
  };

  const handleSubmit = async (e) => {
    try {
      await createIncomeService(
        token,
        category,
        description,
        amount,
        selectedDate,
        bankId
      );
      handleUpdate(true);
      setOpen(false);
    } catch (error) {}
  };

  return open ? (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="relative p-8 bg-white rounded-md">
        <h1 className="text-center font-bold text-xl p-2">Add new income</h1>
        <form className="flex flex-col gap-8 p-2">
          <Select
            placeholder="Category"
            onChange={handleSelectCategory}
            options={categoryOptions}
          />
          <Input
            className="p-2"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2">
            <Input
              className="w-3/6"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <Input
              className="w-3/6"
              placeholder="Date"
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>
          <Select
            
            placeholder="Bank account"
            onChange={handleSelectBank}
            options={banks}
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
              Add income
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default AddIncome;
