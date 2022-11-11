import {gql} from "@apollo/client";

export const CREATE_COURSES_ADMIN_CSV_USER_IMPORTS = gql`
  mutation createCoursesAdminCsvUserImports(
    $file_url: String
    $status: String
  ) {
    insert_courses_admin_csv_user_imports(
      objects: {file_url: $file_url, status: $status}
    ) {
      returning {
        id
      }
    }
  }
`;
