import React from "react";
import {Link} from "react-router-dom";

const Table = ({className, labels, values, editRoute,viewRoute, id_index}) => {
  return (
    <div className={`flex flex-col shadow ${className}`}>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {labels.map((label) => (
                    <th
                      scope="col"
                      className="px-2.5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {label}
                    </th>
                  ))}
                  <th
                    scope="col-span-2"
                    className="px-2.5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 w-max">
                {values.map((value) => (
                  <tr>
                    {value.map((label) => (
                      <td className="px-2.5 py-4 whitespace-nowrap text-sm text-gray-600 max-w-prose truncate">
                        {String(label)}
                      </td>
                    ))}
                    <td>
                      <Link
                        to={editRoute + "?id=" + value[id_index]}
                        className="text-white bg-blue-300 p-2 no-underline"
                      >
                        Edit
                      </Link>
                    </td>

                    <td>
                      <Link
                        to={viewRoute +"?id=" +value[id_index]}
                        className="text-white bg-blue-300 p-2 no-underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
