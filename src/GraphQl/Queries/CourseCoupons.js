import {gql} from '@apollo/client';

export const GET_ALL_COUPONS= gql`
    query getAllCoupons {
        courses_st_coupons_configuration(order_by: {created_at: desc}) {
            user_limit
            start_date
            partner_id
            num_of_users
            minimum_cart_amount
            max_usage_per_user
            end_date
            id
            discount
            code
            applicable_for_all_users
            applicable_for_all_time
            active
            abs_discount
        }
    } 
`

export const CREATE_NEW_COUPON_CODES = gql`
mutation insertCouponCode($object: courses_st_coupons_configuration_insert_input = {}) {
    insert_courses_st_coupons_configuration_one(object: $object) {
      id
      code
    }
  }  
`

export const UPDATE_NEW_COUPON_COES = gql`
mutation MyMutation($id: uuid_comparison_exp = {}, $_set: courses_st_coupons_configuration_set_input = {}) {
    update_courses_st_coupons_configuration(where: {id: $id}, _set: $_set) {
      affected_rows
      returning {
        id
        code
      }
    }
  }`

export const GET_TOTAL_COUPON_CODES = gql`
query GetTotalCouponCodes {
  courses_st_coupons_configuration_aggregate {
    aggregate {
      count
    }
  }
}
`