import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Input, Select, DatePicker, Switch, Popover } from "antd";
import { IoMdHelpCircle } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { createIncomeService } from "../../api/income";
import { getBanksService } from "../../api/bank";

const categoryOptions = [
  {
    value: "food",
    label: "Food",
  },
  {
    value: "Work",
    label: "Work",
  },
  {
    value: "Vacation",
    label: "Vacation",
  },
  {
    value: "Education",
    label: "Education",
  },
  {
    value: "Health",
    label: "Health",
  },
  {
    value: "Other",
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

  const [currency, setCurrency] = useState("");

  const [banks, setBanks] = useState([]);

  useEffect(() => {
    getBanksService(token).then((data) => {
      const transformedBanks = data.map((bank) => ({
        value: bank.bank_id,
        label: `${bank.account} - ${bank.bank_name}`,
        currency: bank.currency,
      }));

      setBanks(transformedBanks);
    });
  }, [token]);

  const content = (
    <div>
      <p>Select 'Sync amount' to automatically update</p>
      <p>the amount of the selected account.</p>
    </div>
  );

  const handleSelectAccount = (value) => {
    setBankId(value);
    const bankCurrency = banks.find((bank) => bank.value === value).currency;
    setCurrency(bankCurrency);
  };

  const handleSelectDate = (value) => {
    const year = value.year();
    const month = (value.month() < 10 ? "0" : "") + (value.month() + 1);
    const date = (value.date() < 10 ? "0" : "") + value.date();

    setSelectedDate(`${date}-${month}-${year}`);
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

      setCategory("");
      setDescription("");
      setAmount("");
      setSelectedDate("");
      setBankId("");
    } catch (error) {}
  };

  return open ? (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="relative w-4/12 p-8 bg-white rounded-md">
        <h1 className="text-center font-bold text-xl p-2">Add new income</h1>
        <form className="flex flex-col gap-8 p-2">
          <Select
            placeholder="Category"
            onChange={(value) => setCategory(value)}
            options={categoryOptions}
          />
          <Input
            className="p-2"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2 items-center">
            <Select
              className="w-4/6"
              placeholder="Bank account"
              onChange={handleSelectAccount}
              options={banks}
            />
            <Switch
              className="w-2/6"
              checkedChildren="Sync amount"
              unCheckedChildren="Don't sync"
              defaultChecked
            />
            <Popover content={content} placement="topRight">
              <IoMdHelpCircle size={20} color="gray"/>
            </Popover>
          </div>

          <div className="flex gap-2">
            <Input
              className="w-3/6"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              suffix={currency}
              required
            />
            <DatePicker
              className="w-3/6"
              format="DD-MM-YYYY"
              defaultValue={dayjs()}
              onChange={handleSelectDate}
            />
          </div>

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
