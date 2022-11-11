import {gql} from "@apollo/client";

export const GET_PARTNER_AND_INSTRUCTOR = gql`
  query fetchCourses {
    courses_instructor {
      id
      name
    }
    courses_partner {
      name
      id
    }
    courses_st_coupons_configuration {
      id
      code
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query getUsers {
    courses_users {
      activation_end_date
      activation_start_date
      active
      created_at
      email
      idp_user_id
      instructor_id
      id
      mobile_number
      name
      partner {
        id
        name
      }
      user_instructor {
        id
        name
      }
      partner_id
    }
  }
`;

export const GET_USERS_QUERY_PAGINATION = gql`
  query getUsers($per_page: Int, $page: Int) {
    courses_users(limit: $per_page, offset: $page) {
      activation_end_date
      activation_start_date
      active
      created_at
      email
      idp_user_id
      instructor_id
      id
      mobile_number
      name
      partner {
        id
        name
      }
      user_instructor {
        id
        name
      }
      partner_id
    }
  }
`;

export const GET_USERS_BY_PARTNER_ID = gql`
  query getUsersByPartnerId($partner_id: bigint!, $per_page: Int, $page: Int) {
    courses_users(
      limit: $per_page
      offset: $page
      where: {partner_id: {_eq: $partner_id}}
    ) {
      name
      id
      email
      partner {
        name
        id
      }
      user_instructor {
        id
        name
      }
    }
  }
`;

export const GET_USERS_BY_INSTRUCTOR_ID = gql`
  query getUsersByPartnerId(
    $per_page: Int
    $page: Int
    $instructor_id: bigint!
  ) {
    courses_users(
      limit: $per_page
      page: $page
      where: {instructor_id: {_eq: $instructor_id}}
    ) {
      name
      id
      email
      partner {
        name
        id
      }
      user_instructor {
        id
        name
      }
    }
  }
`;
export const Get_USRS_BY_PARNTER_AND_INSTRUCTOR = gql`
  query getUsersByPartnerId(
    $per_page: Int
    $page: Int
    $instructor_id: bigint
    $partner_id: bigint!
  ) {
    courses_users(
      limit: $per_page
      offset: $page
      where: {
        instructor_id: {_eq: $instructor_id}
        partner_id: {_eq: $partner_id}
      }
    ) {
      name
      id
      email
      partner {
        name
        id
      }
      user_instructor {
        id
        name
      }
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query getUsersById($id: bigint) {
    courses_users(where: {id: {_eq: $id}}) {
      activation_end_date
      activation_start_date
      active
      email
      idp_user_id
      instructor_id
      id
      mobile_number
      name
      partner {
        id
        name
      }
      user_instructor {
        id
        name
      }
      partner_id
    }
  }
`;
export const GET_NUMBER_OF_USERS = gql`
query getTotalUsers {
  courses_users_aggregate {
    aggregate {
      count(columns: source)
    }
  }
}

`;

export const GET_TOTAL_NMBER_OF_USERS = gql`
query MyQuery {
  courses_users_aggregate {
    aggregate {
      count
    }
  }
}

`

export const GET_NUMBER_OF_USERS_DISTICT_BY_SOURCE = gql`
query MyQuery {
  users_count_by_source {
    count
    source
  }
}
`

export const GET_USERS_PAGINATION = gql`
query MyQuery($where: courses_users_bool_exp = {}, $page: Int, $per_page: Int) {
  courses_users(where: $where, offset: $page, limit: $per_page,order_by: {created_at: desc}) {

    email
    id
    name
    mobile_number
    source
    partner {
      name
    }
    created_at
  }
}
`

export const GET_TOTAL_USERS = gql`
query MyQuery {
  courses_users_aggregate {
    aggregate {
      count
    }
  }
}
`
