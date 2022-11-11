import { gql } from "@apollo/client";

export const GET_PARTNERS = gql`
  query getPartners {
    courses_partner {
      id
      name
      organization_name
      created_at
      updated_at
      active
      activation_start_date
      activation_end_date
      about_partner
      contact_person_email
      contact_person_name
    }
  }
`;
export const GET_PARTNERS_BY_ID = gql`
  query getPartnersById($id: bigint) {
    courses_partner(where: { id: { _eq: $id } }) {
      id
      name
      organization_name
      created_at
      updated_at
      active
      activation_start_date
      activation_end_date
      about_partner
      contact_person_email
      contact_person_name
      organization_name
      organization_category
      organization_type
      pin_code
      address
    }
  }
`;

export const GET_PARTNERS_PAGINATION = gql`
  query getCoursePartner($page: Int, $per_page: Int) {
    courses_partner(limit: $per_page, offset: $page) {
      id
      name
      organization_name
      active
      contact_person_email
      contact_person_name
      created_at
      activation_start_date
      activation_end_date
      about_partner
      identifier
    }
  }
`;
export const GET_TOTAL_PARTNRES = gql`
  query getTotalCourses {
    courses_partner_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_PARTNER_PROJECTS_BY_PARTNER_ID = gql`
  query getPartnerProjects($partner_id: bigint = "") {
    courses_partner_projects(where: { partner_id: { _eq: $partner_id } }) {
      id
      name
      created_at
      country
      city
      pincode
      state
      type
      updated_at
     
    }
  }
`;

export const GET_USER_BY_PARTNER_PROJECT_ID = gql`
  query getUserByPartnerAndProject($project_id: bigint = "") {
    courses_partner_project_users(where: { project_id: { _eq: $project_id } }) {
      id
      updated_at
      user {
        name
        mobile_number
        email
        date_of_birth
        created_at
      }
    }
  }
`;
