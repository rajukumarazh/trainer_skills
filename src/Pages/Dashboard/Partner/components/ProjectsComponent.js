import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import Input from "../../../../components/InputGroup/Input";
import Select from "../../../../components/InputGroup/Select";
import AddressField from "../../../../components/InputGroup/Address";
import CourseSelectionTable from "./CourseSelection";
import { GET_COURSES } from "../../../../GraphQl/Queries/Projects";

function ProjectsComponent(props) {
  const [project, setProject] = useState({});
  const [isCourseActive, setIsCourseActive] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState({
    courses: [],
  });
  // let selectedCourse = [];
  // Apply changes to responses
  useEffect(() => {
    setProject((prevState) => {
      const criteriaObj = {
        // ...prevState,
        ...props.project,
      };
      criteriaObj.address = {
        state: criteriaObj.state,
        country: criteriaObj.country,
        city_town: criteriaObj.city,
      };
      
      console.log(project);
      return criteriaObj;
    });
    if (props.project.type == "Course Provision") {
      console.log('Project ====', props.project);

      const selectedCourses = {
        courses: props.project.project_courses.map(({course_id}) => course_id)
      };
      setSelectedCourses(selectedCourses);
    }
  }, [props.project]);

  useEffect(() => {
    console.log("Project type:", project);
    if (project.type == "Course Provision") {
      setIsCourseActive(true);
    } else {
      setIsCourseActive(false);
    }
  }, [project.type]);

  useEffect(() => {
    console.log("This changes");
  }, [selectedCourses]);

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");

    const value = e.target.value;
    const obj = {};
    obj[key] = value;

    setProject((prevState) => {
      const criteriaObj = {
        ...prevState,
        ...obj,
      };
      return criteriaObj;
    });
  };
  const updateCourseSelection = (course_ids, checked) => {
    selectedCourses.courses = course_ids;
    if (selectedCourses.courses.length !== 0) {
      setSelectedCourses(selectedCourses);
    }
  };

  const resetProject = () => {
    setProject((prevState) => {
      return {};
    });
    props.resetProject();
  };

  const getValue = (column_name, key_name) => {
    if (project[column_name] && (key_name == "text" || key_name == "number")) {
      return project[column_name];
    } else {
      return "";
    }
  };

  const handleSubmit = () => {
    props.saveProject({
      project: {
        ...project,
        country: project?.address?.country,
        city: project?.address?.district,
        state: project?.address?.state,
        address: undefined,
      },
      projectCourses: {
        ...selectedCourses,
        partner_id: project?.partner_id,
      },
    });
  };

  return (
    <div>
      {Object.keys(props.projectFields).map((field_key) => {
        return (
          <div className="flex flex-wrap">
            {props.projectFields[field_key].map((projectColumn) => {
              return (
                <div className="w-1/2 p-1">
                  {["text", "date", "password", "number"].includes(
                    projectColumn.type
                  ) && (
                    <Input
                      label={projectColumn.label}
                      type={projectColumn.type}
                      data-key={projectColumn.column_name}
                      onChange={(e) => {
                        updateValue(e);
                      }}
                      value={getValue(
                        projectColumn.column_name,
                        projectColumn.type
                      )}
                    />
                  )}

                  {projectColumn.type == "selector" && (
                    <Select
                      label={projectColumn.label}
                      options={
                        //prettier-ignore
                        projectColumn.column_name == "type"
                          ? props.projectTypes
                          : (projectColumn.column_name == "partner_id"
                          ? props.projectPartners?.courses_partner
                          : [])
                      }
                      valueField={"id"}
                      displayField={"name"}
                      data-key={projectColumn.column_name}
                      onChange={(e) => updateValue(e)}
                      value={project[projectColumn.column_name]}
                    />
                  )}

                  {projectColumn.type === "address" && (
                    <AddressField
                      key={project.id}
                      label={projectColumn.label}
                      value={project.address}
                      onChange={(address) => {
                        setProject({
                          ...project,
                          address,
                        });
                      }}
                      // onChange={(address) => updateValue(address)}
                      keys={{
                        action: "include",
                        keys: ["state", "district"],
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      {isCourseActive && (
        <div className="m-3">
          <h5>Select Courses</h5>
          <CourseSelectionTable
            courses={selectedCourses.courses}
            updateCourseSelection={(course_id, checked) => {
              updateCourseSelection(course_id, checked);
              // console.log("Course id bgkjhgj:", course_id, checked);
            }}
          ></CourseSelectionTable>
        </div>
      )}
      <button
        className="w-40 h-11 mt-3 border-r-4 bg-gray-700 text-base text-white mt-1"
        onClick={handleSubmit}
      >
        Save
      </button>
      <button
        className="w-40 h-11 mt-3 border-r-4 bg-green-700 text-base text-white mt-1"
        onClick={() => resetProject()}
      >
        Reset
      </button>
    </div>
  );
}

export default ProjectsComponent;
