import React from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

function DateFilter({ setDates }) {
  const formatDate = (value) => {
    const year = value?.year();
    const month = (value?.month() < 10 ? "0" : "") + (value?.month() + 1);
    const date = (value?.date() < 10 ? "0" : "") + value?.date();

    return Number(`${year}${month}${date}`);
  };

  const handleSelectDate = (value) => {
    const date1 = formatDate(value[0]);
    const date2 = formatDate(value[1]);
    setDates([date1, date2]);
  };

  function onCalendarChange(dates) {
    if (dates && dates[0] !== null && dates[1] !== null) {
      handleSelectDate(dates);
    }
  }

  return (
    <div>
      <p>Date filter</p>
      <RangePicker format="DD-MM-YYYY" onCalendarChange={onCalendarChange} />
    </div>
  );
}

export default DateFilter;
