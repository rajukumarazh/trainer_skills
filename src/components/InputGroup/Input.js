import React from "react";

const Input = ({label, className, ...inputProps}) => {
  return (
    <div key={label} className={`mx-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          key={label}
          className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md`}
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default Input;
