import {gql} from "@apollo/client";

export const CREATE_COURSE_SECTION = gql`
mutation insertcoursesection(
    $course_id: Int
    $name: String
) {
    insert_courses_course_section(objects: {course_id: $course_id, name: $name}) {
      affected_rows
      returning {
        name
      }
    }
  }
  
`;

export const CREATE_COURSE_MODULE= gql`

mutation insertCourseModule(
  $name: String
  $type: String
  $discription: String
  $visible: Boolean

) {
  insert_courses_course_module(objects: {
    name: $name ,
    type: $type,
    discription:$discription
    visible: $visible
  }
    )
    {
      returning {
        name
        visible
        type
        id
        discription
      }
    }
}

`;


export const UPDATE_COURSE_SECTION_ORDER=gql`
mutation updateCourseSectionOrder($id: Int, $order: Int) {
  update_courses_course_section(where: {id: {_eq: $id}}, _set: {order: $order}) {
    returning {
      course_id
    }
  }
}


`


export const INSERT_COURSE_CERTIFICATE=gql`

mutation insertCourseCertificate($cert_id: Int, $course_id: Int, $mapping_id: Int, $cert_enable_criteria: Boolean) {
  insert_courses_course_certificate(objects: {cert_id: $cert_id, course_id: $course_id, mapping_id: $mapping_id, cert_enable_criteria: $cert_enable_criteria}) {
    returning {
      cert_id
      id
    }
  }
}


`