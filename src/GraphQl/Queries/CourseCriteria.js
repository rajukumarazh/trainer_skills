import {gql} from '@apollo/client';

export const GET_COURSE_CRITERIA = gql`
query get_course_creteria {
  courses_course_criteria(order_by: {created_at: desc}) {
      name
      id
      partner_id
      instructor_id
      apply_to_skillstrainer
      apply_to_all_users
      apply_to_all_courses
      created_at
      coupon_id
      courses {
        id
        course_id
      }
      users {
        id
        user_id
      }
    }
  }
  
`

export const GET_TOTAL_COURSE_CRITERIA = gql`
query MyQuery {
  courses_course_criteria_aggregate {
    aggregate {
      count
    }
  }
}
`