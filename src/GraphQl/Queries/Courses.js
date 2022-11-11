import { gql } from "@apollo/client";

export const COURSES_QUERY = gql`
  query fetchCourses {
    courses_course {
      course_category_id
      created_at
      description
      end_date
      full_name
      id
      identifier
      is_moodle_course
      moodle_config_id
      moodle_course_url
      publish
      start_date
      updated_at
      moodle_config {
        id
        moodle_sp_name
      }
      course_category {
        id
        name
      }
    }
  }
`;

export const GET_COURSES_PAGINATION = gql`
  query fetchCourses($per_page: Int, $page: Int) {
    courses_course(
      limit: $per_page
      offset: $page
      order_by: { full_name: asc }
    ) {
      course_category_id
      created_at
      description
      end_date
      full_name
      id
      identifier
      is_moodle_course
      moodle_config_id
      moodle_course_url
      publish
      start_date
      updated_at
      moodle_config {
        id
        moodle_sp_name
      }
      course_category {
        id
        name
      }
    }
  }
`;

export const GET_TOTAL_COURSES = gql`
  query fetchTotalCourses {
    courses_course_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_COURSE_BY_ID = gql`
  query fetchCourseById($id: bigint) {
    courses_course(where: { id: { _eq: $id } }) {
      cost
      course_category {
        id
        name
      }
      course_category_id
      created_at
      description
      discount
      duration
      end_date
      full_name
      id
      identifier
      image_url
      is_live_course
      is_moodle_course
      moodle_config {
        id
        moodle_sp_name
      }
      moodle_config_id
      moodle_course_id
      moodle_course_url
      nsqf_level
      publish
      short_name
      start_date
      updated_at
    }
  }
`;

export const COURSE_CATEGORY_QUERY = gql`
  query fetchCourseCategories {
    courses_course_categories {
      created_at
      description
      id
      name
      slug
      image_url
      updated_at
      visible
    }
  }
`;

export const MOODLE_CONFIG_QUERY = gql`
  query fetchMoodleConfig {
    courses_moodle_config {
      moodle_server_acs_url
      moodle_sp_client_id
      moodle_sp_name
      moodle_sp_redirect_url
      updated_at
      id
    }
  }
`;
export const GET_MOODLE_CONFIG_BY_ID = gql`
  query fetchMoodleConfigById($id: bigint) {
    courses_moodle_config(where: { id: { _eq: $id } }) {
      moodle_server_acs_url
      moodle_sp_client_id
      moodle_sp_name
      moodle_sp_redirect_url
      moodle_sp_secret_key
    }
  }
`;
export const CATEGORY_MOODLE_CONFIG_QUERY = gql`
  query fetchMoodleAndCourseCategories {
    courses_course_categories {
      id
      name
    }
    courses_moodle_config {
      moodle_sp_name
      id
    }
  }
`;

export const GET_INSTRUCTOR_ID_NAME = gql`
  query fetchInstructor {
    courses_instructor {
      id
      name
      email
    }
  }
`;
