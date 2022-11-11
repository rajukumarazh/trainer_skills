import React, {useState} from "react";
import Container from "../../../components/Container/Container";

import Status from "./Status";
import TimelineItem from "./TimelineItem";

const Timeline = () => {
  const [labels, setLabels] = useState([
    "Status",
    "Course Name",
    "Topic",
    "Batch",
    "Students",
    "Date",
    "Uploading class recording",
  ]);
  const [values, setValues] = useState([
    {
      Status: "done",
      "Course Name": "English speaking programme",
      Topic: "Lores Ispum",
      Batch: "Batch#12345",
      Students: [0, 1, 2, 3, 4, 5],
      Date: 12131231,
      "Upload Class Recording": true,
    },
    {
      Status: "live",
      "Course Name": "English speaking programme",
      Topic: "Lores Ispum",
      Batch: "Batch#12345",
      Students: [0, 1, 2, 3, 4, 5],
      Date: 12131231,
      "Upload Class Recording": false,
    },
  ]);
  return (
    <Container>
      <div className="m-5">
        <p className="text-xl text-indigo font-medium">Timeline</p>
        <p className="text-l mt-5 text-indigo font-medium">Live Class</p>
        <div className="flex justify-between">
          {labels.map((label, i) => (
            <div className="flex-col">
              <p className="text-sm text-indigo">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex-col">
          {values.map((value, index) => (
            <TimelineItem index={index} statuses={values} value={value} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Timeline;
