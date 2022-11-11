import {gql} from '@apollo/client';

export const GET_COURSE_COUPONS = gql`
query getCoupons {
    courses_st_coupons_configuration {
      id
      code
    }
  }
`