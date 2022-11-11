import {gql} from "@apollo/client";

export const CREATE_COURSE_SEC_MOD_SECTION = gql`
mutation addcoursesectionmodule(
    $course_id: Int
    $name: String
    $description: String
    $mod_id: Int
    $section_id: Int
    $created_date: timestamptz
    $publish_url : String
    $file_name : String
    $completion_criteria: String

) {
    insert_courses_course_module_mapping(objects: {
        course_id: $course_id,
        created_date: $created_date,
        description:$description,
        mod_id: $mod_id,
        name: $name,
        section_id: $section_id
        publish_url:$publish_url
        file_name:$file_name
        completion_criteria: $completion_criteria


    }) {
        returning {
          course_id
          mod_id
          section_id
          id
        }
      }
  }
  
`;


export const INSERT_SCORM_DATA= gql`

mutation InsertScormData($course_id: Int, $mapping_id: Int, $mod_id: Int) {
  insert_courses_course_scorm_track_data(objects: {mod_id: $mod_id, mapping_id: $mapping_id, course_id: $course_id}) {
    returning {
      id
    }
  }
}



`

