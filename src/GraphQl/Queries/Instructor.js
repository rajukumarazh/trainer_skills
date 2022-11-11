import {gql} from "@apollo/client";

export const GET_INSTRUCTORS = gql`
  query getInstructors {
    courses_instructor {
      activation_end_date
      activation_start_date
      active
      created_at
      email
      mobile_number
      name
      updated_at
      id
    }
  }
`;
export const GET_INSTRUCTOR_SEARCH = gql`
  query MyQuery($where: courses_instructor_bool_exp = {}) {
    courses_instructor(where: $where, order_by: {created_at: desc}) {
      activation_end_date
      activation_start_date
      active
      created_at
      email
      mobile_number
      name
      updated_at
      id
    }
  }
`;

export const GET_INSTRUCTORS_BY_ID = gql`
  query getInstructorsById($id: bigint) {
    courses_instructor(where: {id: {_eq: $id}}) {
      activation_end_date
      activation_start_date
      active
      created_at
      email
      mobile_number
      name
      updated_at
      id
      partner_id
    }
  }
`;

export const GET_PARTNER_PROJECT= gql`
query getPartnerProject($id: bigint) {
  courses_partner_projects(where: {partner_id: {_eq: $id}}) {
    name
    id
  }
}

`
