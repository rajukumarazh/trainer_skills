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
  const people = [
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      role: "Admin",
      email: "jane.cooper@example.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    // More people...
  ];
  return (
    <Container>
      <div className="m-5">
        <p className="text-xl text-indigo font-medium">Timeline</p>
        <p className="text-l mt-5 text-indigo font-medium">Live Class</p>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="">
                    <tr>
                      {labels.map((label) => (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {label}
                        </th>
                      ))}
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {values.map((value) => (
                      <TimelineItem value={value} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Timeline;
