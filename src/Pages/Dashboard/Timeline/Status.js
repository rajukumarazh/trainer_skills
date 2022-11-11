import React from "react";
import {AiOutlineCheck} from "react-icons/ai";
import {RiSignalTowerLine} from "react-icons/ri";

const Status = ({index, value, statuses}) => {
  return (
    <div className="w-min">
      <div
        className={`my-2 border-2 border-solid rounded-full p-2 ${
          value === "done"
            ? "border-green-500 bg-green-500"
            : "border-orange-light bg-orange-light"
        }`}
      >
        {value === "done" ? (
          <AiOutlineCheck className="text-white" />
        ) : (
          <RiSignalTowerLine className="text-orange" />
        )}
      </div>
      {index < statuses.length - 1 && (
        <div className="border-l-2 pb-10 ml-4 my-2 border-gray-300" />
      )}
    </div>
  );
};

export default Status;
