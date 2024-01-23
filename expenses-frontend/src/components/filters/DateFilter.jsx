import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

function DateFilter({ setDates, values }) {
  const [initialValue, setInitialValue] = useState(null);

  function onCalendarChange(dates) {
    if (dates && dates[0] !== null && dates[1] !== null) {
      setDates(dates);
    }
  }

  useEffect(() => {
    setInitialValue(values);
  }, [values]);

  return (
    <div className="w-4/12">
      <p>Date filter</p>
      <RangePicker
        allowClear={false}
        style={{
          width: "100%",
        }}
        format="DD-MM-YYYY"
        value={initialValue}
        onCalendarChange={onCalendarChange}
      />
    </div>
  );
}

export default DateFilter;
