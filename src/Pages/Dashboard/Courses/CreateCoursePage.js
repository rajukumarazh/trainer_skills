import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";


import {
  CATEGORY_MOODLE_CONFIG_QUERY,
  COURSE_CATEGORY_QUERY,
  MOODLE_CONFIG_QUERY,
} from "../../../GraphQl/Queries/Courses";
import { CREATE_COURSE_MUTATION } from "../../../GraphQl/Mutations/Courses";

import { courseFields } from "./DbScchemas";
import Container from "../../../components/Container/Container";
import Checkbox from "../../../components/InputGroup/Checkbox";
import TextArea from "../../../components/InputGroup/TextArea";
import Input from "../../../components/InputGroup/Input";
import Select from "../../../components/InputGroup/Select";

function CreateCoursePage() {
  const { error, loading, data } = useQuery(CATEGORY_MOODLE_CONFIG_QUERY);

  const [insesrt_course, mutatioData] =
    useMutation(CREATE_COURSE_MUTATION);

  const [course, setCourse] = useState({});

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");

    e.preventDefault();
    const value = e.target.value;
    course[key] = value;
    setCourse(course);
  };

  const updateCheckbox = (e) => {
    const key = e.target.getAttribute("data-key");
    const value = e.target.checked;
    course[key] = value;
    setCourse(course);
  };

  const submitCourse = (e) => {
    e.preventDefault();
    course["identifier"] = course.full_name.toLowerCase().replaceAll(" ", "-");
    
   
    try {
      course.discount = parseInt(course.discount);
    } catch(e) {
      course.discount = null;
    }

    try {
      course.cost = parseInt(course.cost);
    } catch(e) {
      course.cost = null;
    }
    console.log('Course : ', course);
    insesrt_course({ variables: course });
    // if (mutationError) {
    //   console.log(mutationError);
    // }
  };

  console.log("Moodle courses mutation : ", mutatioData);

  return (
    <Container title={"Create Course"}>
      <form onSubmit={submitCourse} className="">
        {Object.keys(courseFields).map((course_key) => {
          return (
            <div className="flex flex-wrap">
              {courseFields[course_key].map((course) => {
                  return (
                    <div className="w-1/2 p-1">
                      {["text", "date", "password", "number"].includes(course.type) && (
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
                      {course.type == "checkbox" && (
                        <Checkbox
                          label={course.label}
                          type="checkbox"
                          data-key={course.column_name}
                          onChange={(e) => updateCheckbox(e)}
                        />
                      )}
                      
                      {course.type == "selector" && (
                        <Select
                          
                          label={course.label}
                          options={
                            course.column_name == "course_category_id"
                              ? data?.courses_course_categories
                              : course.column_name == "moodle_config_id"
                              ? data?.courses_moodle_config
                              : []
                          }
                          valueField={"id"}
                          displayField={
                            course.column_name == "moodle_config_id"
                              ? "moodle_sp_name"
                              : "name"
                          }
                          data-key={course.column_name}
                          onChange={(e) => updateValue(e)}
                        />
                      )}
                    </div>
                  );
              })}
            </div>

          )
        
        })}
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo"
          >
            Saves
          </button>
        </div>
        {mutatioData.data?.insert_courses_course_one && (
          <div className="mt-1">
            <div className="text-lg text-green-800">
              {mutatioData.data.insert_courses_course_one.full_name} Course is updated
            </div>
          </div>
        )}
        {mutatioData.data && mutatioData.data.insert_courses_course_one == null && (
          <div className="text-lg text-red-800">
            {course.full_name} Course is already exists
          </div>
        )}
      </form>
    </Container>
  );
}

export default CreateCoursePage;
