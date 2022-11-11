import React from "react";

const TextArea = ({label, className, value, ...inputProps}) => {
  return (
    <div className={`mx-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <textarea
          value={value}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          {...inputProps}
        />
      </div>
      {/* <p className="mt-2 text-sm text-gray-500">
        {description}
      </p> */}
    </div>
  );
};

export default TextArea;
