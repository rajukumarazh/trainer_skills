import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import ReactSelect from 'react-select'

import {
  CATEGORY_MOODLE_CONFIG_QUERY,
  COURSE_CATEGORY_QUERY,
  MOODLE_CONFIG_QUERY,
  GET_COURSE_BY_ID,
  COURSES_QUERY
} from "../../../GraphQl/Queries/Courses";
import { UPDATE_COURSE_MUTATION } from "../../../GraphQl/Mutations/Courses";

import { courseFields } from "./DbScchemas";
import Container from "../../../components/Container/Container";
import Checkbox from "../../../components/InputGroup/Checkbox";
import TextArea from "../../../components/InputGroup/TextArea";
import Input from "../../../components/InputGroup/Input";
import Select from "../../../components/InputGroup/Select";
import { useLocation } from 'react-router';
import queryString from 'query-string';

function UpdateCoursePage() {
  const { error, loading, data } = useQuery(CATEGORY_MOODLE_CONFIG_QUERY);
  const  courses  = useQuery(COURSES_QUERY);

  const [runQuery, availableCourse]  = useLazyQuery(GET_COURSE_BY_ID, {
    fetchPolicy: "network-only" // Doesn't check cache before making a network request
  });

  const [update_course, mutatioData] =
    useMutation(UPDATE_COURSE_MUTATION);

  const [course, setCourse] = useState({
  });
  const [courseOptions, setCourses] = useState([])


  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");

  
    const value = e.target.value;
    const update = {};
    update[key] = value;

    setCourse(prevState => {
      const courseObj = {
        ...prevState,
        update
      }

      courseObj[key] = value;

      return courseObj;
    });

    e.preventDefault();
    
  };

  const updateCheckbox = (e) => {
    const key = e.target.getAttribute("data-key");
    const value = e.target.checked;
    const update = {};
    update[key] = value;

    setCourse(prevState => {
      const courseObj = {
        ...prevState,
        update
      }

      courseObj[key] = value;

      return courseObj;
    });
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
    update_course({ variables: course });
    // if (mutationError) {
    //   console.log(mutationError);
    // }
  };

  const location = useLocation();
  const params = queryString.parse(location.search);
  console.log("Params : ", params);
  

  useEffect(() => {
    if (params.id) {
      runQuery({
        variables: {
          id: params.id
        }
      })
    }
  }, [])

  useEffect(() => {
    if(availableCourse.data?.courses_course) {
      if (availableCourse.data.courses_course.length > 0) {
        setCourse({...availableCourse.data.courses_course[0]});
      }
    }
  }, [availableCourse])

  useEffect(() => {
    
    console.log('Courses : ', courses);

    if (courses.data && courses.data.courses_course) {
      const courseOptions = courses.data.courses_course.map((course, i) => {
        return {value: course.id, label: course.full_name }
      });

      setCourses(courseOptions);
    }
   
  }, [courses])

  return (
    <Container title={"Create Course"}>
      <form onSubmit={submitCourse} className="">
      {!params.id && <div className="w-1/3 p-1 mb-1">
        <label className="block text-sm font-medium text-gray-700">Select Course</label>
        <div className="mt-1 relative rounded-md shadow-sm">
            <ReactSelect options={courseOptions} 
              onChange={(selectedOption) =>  runQuery({
                variables: {
                  id: selectedOption.value
                }
              })}
            />
        </div>
      </div>}
        {Object.keys(courseFields).map((course_key) => {
          return (
            <div className="flex flex-wrap">
             
              {courseFields[course_key].map((courseColumn) => {
                  return (
                    <div className="w-1/2 p-1">
                      {["text", "date", "password", "number"].includes(courseColumn.type) && (
                        <Input
                          
                          label={courseColumn.label}
                          type={courseColumn.type}
                          data-key={courseColumn.column_name}
                          onChange={(e) => updateValue(e)}
                          value={course[courseColumn.column_name]}
                        />
                      )}
                      {courseColumn.type == "text_area" && (
                        <TextArea
                          
                          label={courseColumn.label}
                          data-key={courseColumn.column_name}
                          onChange={(e) => updateValue(e)}
                          rows="5"
                          cols="30"
                          type="text"
                          value={course[courseColumn.column_name]}
                        />
                      )}
                      {courseColumn.type == "checkbox" && (
                        <Checkbox
                          label={courseColumn.label}
                          type="checkbox"
                          data-key={courseColumn.column_name}
                          onChange={(e) => updateCheckbox(e)}
                          checked={course[courseColumn.column_name]}
                        />
                      )}
                      
                      {courseColumn.type == "selector" && (
                        <Select
                          
                          label={courseColumn.label}
                          options={
                            courseColumn.column_name == "course_category_id"
                              ? data?.courses_course_categories
                              : courseColumn.column_name == "moodle_config_id"
                              ? data?.courses_moodle_config
                              : []
                          }
                          valueField={"id"}
                          displayField={
                            courseColumn.column_name == "moodle_config_id"
                              ? "moodle_sp_name"
                              : "name"
                          }
                          data-key={courseColumn.column_name}
                          onChange={(e) => updateValue(e)}
                          value={course[courseColumn.column_name]}
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
            Save
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
            {course.full_name} Course details updated
          </div>
        )}
      </form>
    </Container>
  );
}

export default UpdateCoursePage;
