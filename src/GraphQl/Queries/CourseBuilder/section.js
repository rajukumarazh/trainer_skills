import { gql } from "@apollo/client";
export const GET_COURSE_SECTION = gql `
query getcoursesection($course_id: Int) {
      courses_course_section(order_by: {order: asc},where: {course_id: {_eq: $course_id}}) {
        name
        id
      }
    }
    `

export const GET_COURSE_MODULE= gql`
query getCourseModule {
  courses_course_module(order_by: {id: desc})  {
    id
    name
    type
    visible
    discription
  }
}


`;

export const GET_COURSE_SECTION_MODULE= gql`

query getSectionModule(
  $course_id: Int
  $section_id: Int

  ) {
    courses_course_module_mapping(where: {course_id: {_eq: $course_id}, section_id: {_eq: $section_id}}) {
    id
    name
    description
    section_id
    Module {
      name
      id
    }
    section {
      name
      id
    }
  }
}
`
export const GET_COURSE_SCORM_PUBLISH_URL=gql`
query getScormPublishUrl($id:Int) {
  courses_course_module_mapping(where: {id: {_eq: $id}}) {
    publish_url
  }
}
`


export const CHECK_MOD_TYPE=gql`
query checkModType($id: Int) {
  courses_course_module(where: {id: {_eq: $id}}) {
    type
  }
}
`