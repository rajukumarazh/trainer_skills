import { useMutation, useQuery } from "@apollo/client";
import { data } from "autoprefixer";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import Container from "../../../components/Container/Container";
import Checkbox from "../../../components/InputGroup/Checkbox";
import Input from "../../../components/InputGroup/Input";
import Select from "../../../components/InputGroup/Select";
import TextArea from "../../../components/InputGroup/TextArea";
import { GET_INSTRUCTORS_BY_ID } from "../../../GraphQl/Queries/Instructor";
import { UPDATE_INSTRUCTOR } from "../../../GraphQl/Mutations/Instructor";
import { GET_PARTNERS } from "../../../GraphQl/Queries/Partner";
import { INSTRCTOR_SCHEMA } from "./DbSchema";

const UpdateInstructor = ({ id }) => {
  const partners = useQuery(GET_PARTNERS);

  const {
    loading,
    error,
    data: querydata,
  } = useQuery(GET_INSTRUCTORS_BY_ID, {
    variables: { id: id },
  });
  const [instructor, setinstructor] = useState({});
  const [update_instructors, update_instructors_response] =
    useMutation(UPDATE_INSTRUCTOR);

  useEffect(() => {
    if (!loading) setinstructor(querydata.courses_instructor[0]);
  }, [loading]);

  const submitInstructor = (e) => {
    e.preventDefault();
    update_instructors({
      variables: { id: id, ...instructor },
    });
  };

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");
    setinstructor({ ...instructor, [key]: e.target.value });
  };
  const updateCheckbox = (e) => {
    const key = e.target.getAttribute("data-key");
    setinstructor({ ...instructor, [key]: e.target.checked });
  };
  const [response, setResponse] = useState({});
  useEffect(() => {
    setResponse(update_instructors_response);
  }, [update_instructors_response.data]);
  const convertToInputDate = (value) => {
    var utc = new Date(value);
    if (utc.toString() !== "Invalid Date")
      return utc.toJSON().slice(0, 10).replace(/-/g, "-");
  };
  return (
    <Container title={"Update Instructor"}>
      <form className="flex flex-wrap" onSubmit={submitInstructor}>
        {INSTRCTOR_SCHEMA.filter(
          ({ column_name }) => column_name.indexOf("password") < 0
        ).map((course) => {
          return (
            <div className="w-1/2">
              {["text", "password"].includes(course.type) && (
                <Input
                  label={course.label}
                  type={course.type}
                  value={instructor[course.column_name]}
                  data-key={course.column_name}
                  onChange={updateValue}
                />
              )}
              {course.type === "date" && (
                <Input
                  label={course.label}
                  type={course.type}
                  value={convertToInputDate(instructor[course.column_name])}
                  data-key={course.column_name}
                  onChange={updateValue}
                />
              )}
              {course.type == "text_area" && (
                <TextArea
                  label={course.label}
                  value={instructor[course.column_name]}
                  data-key={course.column_name}
                  onChange={updateValue}
                  rows="5"
                  cols="30"
                  type="text"
                />
              )}
              {course.type == "selector" && (
                <Select
                  label={course.label}
                  value={instructor[course.column_name]}
                  options={partners && partners.data?.courses_partner}
                  valueField={"id"}
                  displayField={"name"}
                  data-key={course.column_name}
                  onChange={updateValue}
                />
              )}
              {course.type == "checkbox" && (
                <Checkbox
                  label={course.label}
                  checked={instructor[course.column_name]}
                  type="checkbox"
                  data-key={course.column_name}
                  onChange={updateCheckbox}
                />
              )}
            </div>
          );
        })}
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo"
          >
            Save
          </button>
        </div>
        {response.data && (
          <p className="text-green-600">instructor updated successfully</p>
        )}
      </form>
    </Container>
  );
};

export default UpdateInstructor;
