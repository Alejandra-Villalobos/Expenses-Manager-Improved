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
  const [initialValue, setInitialValue] = useState([]);

  useEffect(() => {
    setInitialValue(values);
  }, [values]);

  return (
    <div className="w-4/12">
      <p>Category filter</p>
      <Select
        mode="multiple"
        value={initialValue}
        style={{
          width: "100%"
        }}
        placeholder="Select Categories"
        onChange={setCategories}
        options={categoryOptions}
      />
    </div>
  );
}

export default CategoryFilter;
