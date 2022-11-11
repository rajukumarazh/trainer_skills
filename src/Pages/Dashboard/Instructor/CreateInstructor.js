import React, {useState, useEffect} from "react";
import {useQuery, useMutation} from "@apollo/client";

import {GET_INSTRUCTORS} from "../../../GraphQl/Queries/Instructor";
import {GET_PARTNERS} from "../../../GraphQl/Queries/Partner";
// import {CREATE_INSTRUCTOR} from '../../../GraphQl/Mutations/Instructor'
import {api} from "../../../api/User";
import {INSTRCTOR_SCHEMA} from "./DbSchema";
import Container from "../../../components/Container/Container";
import Table from "../../../components/Table/Table";
import Select from "../../../components/InputGroup/Select";
import Checkbox from "../../../components/InputGroup/Checkbox";
import TextArea from "../../../components/InputGroup/TextArea";
import Input from "../../../components/InputGroup/Input";

function CreateInstructor() {
  const {error, loading, data, refetch} = useQuery(GET_INSTRUCTORS);
  const partners = useQuery(GET_PARTNERS);
  const [errors, setErrors] = useState([]);

  const [instructor, setinstructor] = useState({});
  const [instructors, setinstructors] = useState([]);
  const [response, setresponse] = useState({});

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");
    e.preventDefault();
    const value = e.target.value;
    instructor[key] = value;
    setinstructor(instructor);
  };

  const updateCheckbox = (e) => {
    const key = e.target.getAttribute("data-key");

    const value = e.target.checked;
    instructor[key] = value;
    setinstructor(instructor);
  };

  useEffect(() => {
    if (data) {
      setinstructors(data.courses_instructor);
    }
  }, [data]);

  const submitInstructor = (e) => {
    e.preventDefault();
    setErrors([]);
    var submit_errors = [];
    INSTRCTOR_SCHEMA.map((v) => {
      if (v.required)
        if (!(v.column_name in instructor)) {
          if (v.required_or) {
            v.required_or.map((j) => {
              if (!(INSTRCTOR_SCHEMA[j].column_name in instructor)) {
                submit_errors.push({message: `${v.label} is required`});
              }
            });
          } else {
            submit_errors.push({message: `${v.label} is required`});
          }
        }
    });
    if (submit_errors.length) {
      setErrors(submit_errors);
      return;
    }
    api("create_instructor", instructor).then((data) => {
      // console.log(data);
      setresponse(data);
      refetch();
    });
  };

  const [values, setValues] = useState([]);
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    setLabels(
      INSTRCTOR_SCHEMA.filter(
        ({column_name}) => column_name.indexOf("password") < 0
      ).map(({label}) => label)
    );
  }, [INSTRCTOR_SCHEMA]);
  useEffect(() => {
    setValues(
      instructors.map((partner) =>
        INSTRCTOR_SCHEMA.filter(
          ({column_name}) => column_name.indexOf("password") < 0
        ).map(({column_name, label}) => partner[column_name])
      )
    );
  }, [instructors]);

  console.log(response);

  return (
    <Container title={"Create Instructor"}>
      <form className="flex flex-wrap" onSubmit={submitInstructor}>
        {INSTRCTOR_SCHEMA.map((course) => {
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
                  options={partners && partners.data?.courses_partner}
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
        {response?.errors && 
          <div className="mt-1 flex-row w-full ml-5">
            {response?.errors.map((message) => {
              return <div className="text-lg text-red-800">{message}</div>;
            })}
          </div>
        }
        {response?.success === true && 
          <div className="mt-1 flex-row w-full ml-5">
              <div className="text-lg text-green-800">Instructor profile created</div>;
          </div>
        }
        {errors && (
          <div className="mt-1 flex-row">
            {errors.map(({message}) => {
              return <div className="text-lg text-red-800">{message}</div>;
            })}
          </div>
        )}
      </form>
    </Container>
  );
}

export default CreateInstructor;
