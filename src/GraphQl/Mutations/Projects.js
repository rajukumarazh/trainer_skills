import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
mutation insertProjectCourses(
  $city: String = "", 
  $country: String = "", 
  $name: String = "", 
  $partner_id: bigint = "", 
  $pincode: Int = 10, 
  $state: String = "", 
  $type: String = "", 
  $project_courses: [courses_partner_project_courses_insert_input!]!) {
  insert_courses_partner_projects_one(object: {partner_id: $partner_id, state: $state, type: $type, country: $country, city: $city, name: $name, pincode: $pincode, 
    project_courses: {data: $project_courses}}) {
    id
    name
    project_courses {
      id
      course_id
    }
  }
}
`;

const CREATE_PROJECTT = gql`
  mutation CREATE_PROJECT(
    $city: String = ""
    $country: String = ""
    $type: String = ""
    $partner_id: bigint = ""
    $state: String = ""
    $name: String = ""
    $data: [courses_partner_project_courses_insert_input!] = {}
  ) {
    insert_courses_partner_projects(
      objects: {
        city: $city
        country: $country
        name: $name
        type: $type
        partner_id: $partner_id
        state: $state
        project_courses: { data: $data }
      }
    ) {
      returning {
        id
        created_at
        project_courses {
          id
          created_at
        }
      }
      affected_rows
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: Int_comparison_exp = {}
    $_set: courses_partner_projects_set_input = {}
  ) {
    update_courses_partner_projects(where: { id: $id }, _set: $_set) {
      affected_rows
      returning {
        id
        updated_at
      }
    }
  }
`;

export const UPDATE_PROJECT_CORUSES = gql`
mutation deletePartnerProjectCoureses($project_id: bigint!, $objects: [courses_partner_project_courses_insert_input!] = {}) {
  
  delete_courses_partner_project_courses(where: {project_id: {_eq: $project_id}}) {
    affected_rows
  }
  insert_courses_partner_project_courses(objects: $objects) {
    affected_rows
    returning {
      id
      course_id
    }
  }
}
`

export const INSERT_PROJECT_COURSES = gql`
  mutation createProjectCourses(
    $course_id: bigint = ""
    $partner_id: bigint = ""
    $project_id: bigint = ""
  ) {
    insert_courses_partner_project_courses(
      objects: {
        course_id: $course_id
        partner_id: $partner_id
        project_id: $project_id
      }
    ) {
      affected_rows
      returning {
        id
        created_at
      }
    }
  }
`;
export const UPDATE_PROJECT_COURSES = gql`
  mutation updateProjectCourses(
    $_set: courses_partner_project_courses_set_input = {}
    $id: Int_comparison_exp = {}
  ) {
    update_courses_partner_project_courses(where: { id: $id }, _set: $_set) {
      affected_rows
      returning {
        id
        updated_at
      }
    }
  }
`;
