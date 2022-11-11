import {gql} from "@apollo/client";

export const UPDATE_USER_BY_ID = gql`
  mutation updateUserById(
    $id: bigint
    $name: String
    $active: Boolean
    $email: String
    $partner_id: bigint
    $instructor_id: bigint
    $mobile_number: String
    $activation_end_date: timestamptz
    $activation_start_date: timestamptz
  ) {
    update_courses_users(
      where: {id: {_eq: $id}}
      _set: {
        active: $active
        email: $email
        name: $name
        partner_id: $partner_id
        instructor_id: $instructor_id
        mobile_number: $mobile_number
        activation_end_date: $activation_end_date
        activation_start_date: $activation_start_date
      }
    ) {
      returning {
        id
      }
    }
  }
`;
