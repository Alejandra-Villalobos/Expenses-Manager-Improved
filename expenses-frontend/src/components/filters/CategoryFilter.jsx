import React, { useEffect, useState } from "react";
import { Select } from "antd";

const categoryOptions = [
  {
    value: "Food",
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

function CategoryFilter({ setCategories, values }) {
  const [initialValue, setInitialValue] = useState([])

  useEffect(() => {
    setInitialValue(values)
  }, [values])

  return (
    <Select
      mode="multiple"
      style={{
        width: "40%",
      }}
      value={initialValue}
      placeholder="Select Categories"
      onChange={setCategories}
      options={categoryOptions}
    />
  );
}

export default CategoryFilter;
