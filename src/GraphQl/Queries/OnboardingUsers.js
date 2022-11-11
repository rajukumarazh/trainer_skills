import {gql} from "@apollo/client";

export const GET_ADMIN_CSV_USER_IMPORTS = gql`
  query myQuery {
    courses_admin_csv_user_imports(order_by: {updated_at: desc}) {
      created
        duplicate
        failed
        file_url
        id
        partner_id
        status
        created_at
        updated
    }
  }
`;
