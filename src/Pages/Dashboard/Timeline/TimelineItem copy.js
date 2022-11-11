import React from "react";
import Status from "./Status";

const TimelineItem = ({index, value}) => {
  return (
    <div className="flex justify-between">
      <Status index={index} value={value["Status"]} statuses={value} />
      <p className="font-medium">{value["Course Name"]}</p>
      <p className="font-medium">{value["Topic"]}</p>
      <p className="font-medium">{value["Batch"]}</p>
      <p className="font-medium">{value["Students"]}</p>
      <p className="font-medium">{value["Date"]}</p>
      <p className="font-medium">{value["Upload Class Recording"]}</p>
      <p>Show More</p>
    </div>
  );
};

export default TimelineItem;
