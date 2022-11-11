import React from "react";

const Checkbox = ({label, className, ...inputProps}) => {
  return (
    <div className={`flex mx-4 ${className}`}>
      <div className="flex items-center h-5">
        <input
          {...inputProps}
          type="checkbox"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium text-gray-700">
          {label}
        </label>
        {/* <p className="text-gray-500">
          {text}
        </p> */}
      </div>
    </div>
  );
};

export default Checkbox;
