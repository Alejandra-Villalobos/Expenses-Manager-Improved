import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getBanksService } from "../../api/bank";
import { Select } from "antd";

function BanksFilter({ setBankList, values }) {
  const [initialValue, setInitialValue] = useState([]);
  const { user } = useAuth();
  const token = user.token;

  const [banks, setBanks] = useState([]);

  useEffect(() => {
    getBanksService(token).then((data) => {
      const transformedBanks = data.map((bank) => ({
        value: bank.bank_name,
        label: bank.bank_name,
      }));

      setBanks(transformedBanks);
    });
  }, [token]);

  useEffect(() => {
    setInitialValue(values);
  }, [values]);

  return (
    <Select
      mode="multiple"
      style={{
        width: "40%",
      }}
      value={initialValue}
      placeholder="Select Banks"
      onChange={setBankList}
      options={banks}
    />
  );
}

export default BanksFilter;
