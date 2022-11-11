import React from "react";
import DateTimePicker from "react-datetime-picker";
import DatePicker from "react-datepicker";
import dateFormat from "dateformat";
import { components } from "react-select";
import TimePicker from "react-time-picker";

const DateTime = ({
  label,
  className,
  dateFormat,
  timeFormat,
  timeCaption,
  columnName,
  ...dateProps
}) => {
  return (
    <div key={label} className={`mx-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <DatePicker
          label={label}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          dateFormat={dateFormat}
          minDate={new Date()}
          name={columnName}
          timeFormat={timeFormat}
          timeCaption={timeCaption}
          {...dateProps}
        />
      </div>
    </div>
  );
};

export default DateTime;
