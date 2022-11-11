import React from "react";

const Select = ({
  label,
  options = [],
  valueField,
  displayField,
  className,
  ...selectProps
}) => {
  return (
    <div className={`col-span-6 sm:col-span-3 mx-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        {...selectProps}
        className="mt-1 block w-full py-2 px-7 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="-1">Select {label}</option>
        {options.map((option, i) => (
          <option key={i} value={option[valueField]}>
            {option[displayField]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
