import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Container from "../../../components/Container/Container";
import { COURSES_QUERY } from "../../../GraphQl/Queries/Courses";
import { courseFields } from "./DbScchemas";
import Table from "../../../components/Table/Table";

const columns = Object.keys(courseFields)
  .map((key) => courseFields[key])
  .reduce((allItems, item) => {
    return allItems.concat(item);
  }, [])
  .map(({ column_name, label }) => {
    return { column_name, label };
  })
  .filter(({ column_name }) => {
    return ["id", "identifier", "updated_at"].indexOf(column_name) < 0;
  })
  .slice(0, 3);

columns.push({
  column_name: "id",
  label: "Course Id",
});

function ManageCourses() {
  const { data } = useQuery(COURSES_QUERY);

  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  useEffect(() => {
    setLabels(columns ? columns.map(({ label }) => label) : []);
    return () => setLabels([]);
  }, [columns]);
  useEffect(() => {
    setValues(
      data
        ? data.courses_course.map((course, i) =>
            columns.map(({ column_name }) => course[column_name])
          )
        : []
    );
    return () => setValues([]);
  }, [data]);

  const performAction = (action, data) => {
    console.log("Data: ", data);
  };

  return (
    <Container title={"Manage Courses"}>
      <Table
        editRoute={"/courses/update_course"}
        viewRoute={"/courses/view"}
       
        performAction={(action, data) => performAction(action, data)}
        values={values}
        labels={labels}
        id_index={labels.length - 1}
      />
    </Container>
  );
}

export default ManageCourses;
