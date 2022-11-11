import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import ProjectsComponent from "./components/ProjectsComponent";
import ProjectsTable from "./components/ProjectsTable";
import { PROJECT_FIELDS, PROJECT_TYPES } from "./DbSchema";
import { GET_PROJECTS } from "../../../GraphQl/Queries/Projects";
import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  INSERT_PROJECT_COURSES,
  UPDATE_PROJECT_CORUSES
} from "../../../GraphQl/Mutations/Projects";
import { GET_PARTNERS } from "../../../GraphQl/Queries/Partner";
import { useRouteMatch } from "react-router";

function ManageProjects() {
  const projectPartners = useQuery(GET_PARTNERS);
  const allProjects = useQuery(GET_PROJECTS);

  const [insertProject, insertedProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [GET_PROJECTS]
  });

  const [updateProject, updatedProjectData] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [GET_PROJECTS]
  });
  const [updateProjectCourses, updateProjectCourseData] = useMutation(
    UPDATE_PROJECT_CORUSES,
    { refetchQueries: [GET_PROJECTS]}
  );

  const [project, setProject] = useState({});

  const saveProject = async (arg) => {
    console.log("hgjkg", arg.projectCourses);
    // res.data.insert_courses_partner_projects.returning[0].id,
    delete arg.project.address;
    console.log(arg.project);
    const variables = arg.project;
    variables.project_courses = arg.projectCourses.courses.map((course_id) => {
      return {
        course_id,
        partner_id: arg.projectCourses.partner_id
      }
    })
    if (!project.id) {
      insertProject({
        variables: variables,
      });
    } else {
      const argProject = arg.project;
      delete argProject['parnter'];
      delete argProject['project_courses'];

      console.log('Argument project ; ', argProject);

      updateProject({
        variables: {
          id: { _eq: project.id },
          _set: argProject,
        },
      });
      const project_courses = arg.projectCourses.courses.map((course_id) => {
        return {
          course_id,
          partner_id: arg.projectCourses.partner_id,
          project_id: project.id
        }
      });
      updateProjectCourses({
        variables: {
          project_id: project.id,
          objects: project_courses
        }
      })
    }
  }

  const updateSelectedProject = (selectedProject) => {
    setProject((prevState) => {
      const courseObj = {
        ...prevState,
        ...selectedProject,
      };

      return courseObj;
    });
  };

  const resetProject = () => {
    setProject((prevState) => {
      return {};
    });
  };

  console.log("Project update ; ", project, 
  updateProjectCourseData, 
  updatedProjectData
  )

  return (
    <div>
      <h2 className="text-2xt font-bold px-4">Manage Projects</h2>
      <div className="px-4 m-3">
        <div className="m-3">
          <h5>Create Projects</h5>
          <ProjectsComponent
            saveProject={(project) => saveProject(project)}
            projectFields={PROJECT_FIELDS}
            project={project}
            projectPartners={projectPartners.data}
            projectTypes={PROJECT_TYPES}
            resetProject={() => resetProject()}
          />
        </div>

        {insertedProject.data?.insert_courses_partner_projects_one.id && (
          <div className="text-green-600 text-base mt-2">
            New project created
          </div>
        )}
        {updatedProjectData.data?.update_courses_partner_projects.affected_rows >
          0 && (
          <div className="text-green-600 text-base mt-2">Project updated</div>
        )}
      </div>
      <ProjectsTable
        allProjects={allProjects}
        updateSelectedProject={(selectedProject) =>
          updateSelectedProject(selectedProject)
        }
      />
    </div>
  );
}

export default ManageProjects;
