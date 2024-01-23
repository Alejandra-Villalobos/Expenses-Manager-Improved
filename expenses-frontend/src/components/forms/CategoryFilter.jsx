import React from "react";
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

function CategoryFilter({ setCategories }) {
  return (
    <Select
      mode="multiple"
      allowClear
      style={{
        width: "40%",
      }}
      placeholder="Select Categories"
      onChange={setCategories}
      options={categoryOptions}
    />
  );
}

export default CategoryFilter;
