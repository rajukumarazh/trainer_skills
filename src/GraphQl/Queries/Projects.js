import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getPartnterProjects {
    courses_partner_projects(order_by: { updated_at: desc }) {
      id
      name
      partner_id
      pincode
      state
      type
      created_at
      country
      city
      partner {
        id
        name
      }
      project_courses {
        id
        course_id
        course {
          id
          full_name
        }
      }
    }
  }
`;

export const GET_COURSES = gql`
  query GetCourses {
    courses_course {
      id
      full_name
    }
  }
`;
