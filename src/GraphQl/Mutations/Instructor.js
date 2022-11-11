import {gql} from "@apollo/client";

export const UPDATE_INSTRUCTOR = gql`
  mutation UpdateInstructor(
    $id: bigint
    $activation_end_date: timestamptz
    $active: Boolean
    $activation_start_date: timestamptz
    $email: String
    $mobile_number: String
    $name: String
    $partner_id: bigint
  ) {
    update_courses_instructor(
      where: {id: {_eq: $id}}
      _set: {
        activation_end_date: $activation_end_date
        active: $active
        activation_start_date: $activation_start_date
        email: $email
        mobile_number: $mobile_number
        name: $name
        partner_id: $partner_id
      }
    ) {
      returning {
        id
      }
    }
  }
`;
