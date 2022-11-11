import React from "react";
import Status from "./Status";

const TimelineItem = ({value}) => {
  return (
    <tr key={value.email}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={value.image} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {value.name}
            </div>
            <div className="text-sm text-gray-500">{value.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{value.title}</div>
        <div className="text-sm text-gray-500">{value.department}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {value.role}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
      </td>
    </tr>
  );
};

export default TimelineItem;
