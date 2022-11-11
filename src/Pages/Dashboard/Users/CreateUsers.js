import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PARTNER_AND_INSTRUCTOR } from "../../../GraphQl/Queries/User";
import { USER_SCHEMA } from "./DbSchema";
import { api } from "../../../api/User";
import Container from "../../../components/Container/Container";
import Input from "../../../components/InputGroup/Input";
import Checkbox from "../../../components/InputGroup/Checkbox";
import TextArea from "../../../components/InputGroup/TextArea";
import Select from "../../../components/InputGroup/Select";

function CreateUsers() {
  const { erorr, loading, data } = useQuery(GET_PARTNER_AND_INSTRUCTOR);
  const [user, setuser] = useState({});
  const [response, setresponse] = useState({});
  const [errors, setErrors] = useState([]);

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");
    e.preventDefault();
    const value = e.target.value;
    user[key] = value;
    console.log(user);
    setuser(user);
  };

  const updateCheckbox = (e) => {
    const key = e.target.getAttribute("data-key");

    const value = e.target.checked;
    user[key] = value;
    setuser(user);
  };
  const submitUser = (e) => {
    e.preventDefault();
    setErrors([]);
    var submit_errors = [];
    USER_SCHEMA.map((v) => {
      if (v.required)
        if (!(v.column_name in user)) {
          if (v.required_or) {
            v.required_or.map((j) => {
              if (!(USER_SCHEMA[j].column_name in user)) {
                submit_errors.push({ message: `${v.label} is required` });
              }
            });
          } else {
            submit_errors.push({ message: `${v.label} is required` });
          }
        }
    });
    console.log(submit_errors);
    if (submit_errors.length) {
      setErrors(submit_errors);
    } else {
      api("create_user", user).then((data) => {
        setresponse(data);
        setErrors(data.errors);
      });
    }
  };

  return (
    <Container title={"Add User"}>
      <form onSubmit={submitUser} className="flex flex-wrap">
        {USER_SCHEMA.map((course) => {
          return (
            <div className="w-1/2">
              {["text", "date", "password"].includes(course.type) && (
                <Input
                  label={course.label}
                  type={course.type}
                  data-key={course.column_name}
                  onChange={(e) => updateValue(e)}
                />
              )}
              {course.type == "text_area" && (
                <TextArea
                  label={course.label}
                  data-key={course.column_name}
                  onChange={(e) => updateValue(e)}
                  rows="5"
                  cols="30"
                  type="text"
                />
              )}
              {course.type == "selector" && (
                <Select
                  label={course.label}
                  options={
                    course.column_name == "instructor_id"
                      ? data?.courses_instructor
                      : course.column_name == "partner_id"
                      ? data?.courses_partner
                      : []
                  }
                  valueField={"id"}
                  displayField={"name"}
                  data-key={course.column_name}
                  onChange={(e) => updateValue(e)}
                />
              )}
              {course.type == "checkbox" && (
                <Checkbox
                  label={course.label}
                  type="checkbox"
                  data-key={course.column_name}
                  onChange={(e) => updateCheckbox(e)}
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

        {errors && (
          <div className="mt-1">
            {errors.map(({ message }) => {
              return <div className="text-lg text-red-800">{message}</div>;
            })}
          </div>
        )}
        {response?.success === true && (
          <div className="mt-1">
            <div className="text-lg text-green-800">User is saved</div>
          </div>
        )}
      </form>
    </Container>
  );
}

export default CreateUsers;
