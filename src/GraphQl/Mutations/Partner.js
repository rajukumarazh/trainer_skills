import {gql} from "@apollo/client";

/*

{
    "organization_name": "Testpartner",
    "name": "test",
    "activation_start_date": "2021-11-28",
    "activation_end_date": "2021-11-30",
    "active": true,
    "contact_person_email": "test",
    "contact_person_name": "test",
    "identifier": "test"
}

*/

export const CREATE_PARTNER = gql`
  mutation insertPartner(
    $object: courses_partner_insert_input = {}
    $update_columns: [courses_partner_update_column!]
  ) {
    insert_courses_partner_one(
      object: $object
      on_conflict: {
        constraint: partner_identifier_key
        update_columns: $update_columns
      }
    ) {
      id
      name
    }
  }
`;

export const UPDATE_PARTNER_BY_ID = gql`
  mutation updatePartnerById(
    $id: bigint
    $about_partner: String
    $activation_end_date: timestamptz
    $activation_start_date: timestamptz
    $active: Boolean
    $name: String
    $organization_name: String = ""
    $contact_person_name: String
    $contact_person_email: String
  ) {
    update_courses_partner(
      where: {id: {_eq: $id}}
      _set: {
        about_partner: $about_partner
        activation_end_date: $activation_end_date
        activation_start_date: $activation_start_date
        active: $active
        contact_person_email: $contact_person_email
        contact_person_name: $contact_person_name
        name: $name
        organization_name: $organization_name
      }
    ) {
      returning {
        id
        name
      }
    }
  }
`;
