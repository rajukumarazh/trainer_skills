import { gql } from "@apollo/client";

export const CREATE_COURSE_BATCHES_SLOTS_MUTATION = gql`
  mutation insert_courses_batch_slots(
    $batch_id: Int
    $slot_date: timestamptz
    $platform: String
    $slots_days: String
    $instructor_id: Int
    $endto_date: timestamptz
    $event_id: String
    $meeting_link: String
  ) {
    insert_courses_batch_slots_one(
      object: {
        batch_id: $batch_id
        slot_date: $slot_date
        platform: $platform
        slots_days: $slots_days
        instructor_id: $instructor_id
        endto_date: $endto_date
        meeting_link: $meeting_link
        event_id: $event_id
      }
    ) {
      batch_id
    }
  }
`;

export const UPDATE_BATCH_SLOTS_MEETINGLINK_MUTATION = gql`
  mutation update_batch_slots_meetinglink(
    $id: Int
    $meeting_link: String
    $instructor_id: Int
    $slot_date: timestamptz
    $endto_date: timestamptz
    $event_id: String
  ) {
    update_courses_batch_slots(
      where: { id: { _eq: $id } }
      _set: {
        meeting_link: $meeting_link
        instructor_id: $instructor_id
        slot_date: $slot_date
        endto_date: $endto_date
        event_id: $event_id
      }
    ) {
      returning {
        meeting_link
        batch_id
      }
    }
  }
`;

export const DISABLE_BATCH_SLOTS = gql`
  mutation disablebatchslots($id: Int, $enable_slots: Boolean) {
    update_courses_batch_slots(
      where: { id: { _eq: $id } }
      _set: { enable_slots: $enable_slots }
    ) {
      returning {
        batch_id
      }
    }
  }
`;

export const UPDATE_BATCH_SLOTS_INSTRUCTOR_ID_MUTATION = gql`
  mutation update_batch_slots_instructorid($id: Int, $instructor_id: Int) {
    update_courses_batch_slots(
      where: { id: { _eq: $id } }
      _set: { instructor_id: $instructor_id }
    ) {
      returning {
        instructor_id
      }
    }
  }
`;

export const DELETE_BATCH_SLOTS_BY_ROW_ID = gql`
  mutation batchslotrowbyid($id: Int) {
    delete_courses_batch_slots(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

export const CREATE_USER_BATCH_ENROL_MUTATION = gql`
  mutation createuserbatchenrol(
    $batch_id: Int
    $course_id: Int
    $user_id: Int
    $batch_enrol_date: timestamptz
    $enrol_by: String
  ) {
    insert_courses_user_batch_enrollment(
      objects: {
        batch_enrol_date: $batch_enrol_date
        batch_id: $batch_id
        course_id: $course_id
        user_id: $user_id
        enrol_by: $enrol_by
      }
    ) {
      affected_rows
      returning {
        user_id
        course_id
        batch_id
        batch_enrol_date
      }
    }
  }
`;
