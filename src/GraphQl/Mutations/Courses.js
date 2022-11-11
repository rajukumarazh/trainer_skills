import { gql } from "@apollo/client";

export const CREATE_COURSE_CATEGORY_MUTATION = gql`
  mutation insert_course_category(
    $name: String
    $description: String
    $visible: Boolean
    $slug: String
    $image_url: String
  ) {
    insert_courses_course_categories_one(
      object: {
        name: $name
        description: $description
        slug: $slug
        visible: $visible
        image_url: $image_url
      }
      on_conflict: {
        constraint: course_categories_slug_key
        update_columns: [description]
        where: { slug: { _eq: $slug } }
      }
    ) {
      id
      name
      image_url
    }
  }
`;

export const UPDATE_COURSE_CATEGORY_MUTATION = gql`
  mutation updateCourseCatgory(
    $id: bigint
    $name: String
    $description: String
    $slug: String
    $visible: Boolean
    $image_url: String
  ) {
    update_courses_course_categories(
      where: { id: { _eq: $id } }
      _set: {
        name: $name
        description: $description
        slug: $slug
        visible: $visible
        image_url: $image_url
      }
    ) {
      returning {
        id
        name
        image_url
      }
    }
  }
`;

export const CREATE_MOODLE_CONFIG_MUTATION = gql`
  mutation insert_moodle_config(
    $moodle_sp_name: String
    $moodle_sp_redirect_url: String
    $moodle_sp_client_id: String
    $moodle_sp_secret_key: String
    $moodle_sp_acs_url: String
  ) {
    insert_courses_moodle_config_one(
      object: {
        moodle_sp_name: $moodle_sp_name
        moodle_sp_redirect_url: $moodle_sp_redirect_url
        moodle_sp_secret_key: $moodle_sp_secret_key
        moodle_sp_client_id: $moodle_sp_client_id
        moodle_server_acs_url: $moodle_sp_acs_url
      }
      on_conflict: {
        constraint: moodle_config_moodle_sp_name_key
        update_columns: [moodle_server_acs_url]
        where: { moodle_sp_name: { _eq: $moodle_sp_name } }
      }
    ) {
      id
      moodle_sp_name
    }
  }
`;
export const UPDATE_MOODLE_CONFIG_MUTATION = gql`
  mutation updateMoodleConfigMutation(
    $id: bigint
    $moodle_server_acs_url: String
    $moodle_sp_client_id: String
    $moodle_sp_name: String
    $moodle_sp_redirect_url: String
    $moodle_sp_secret_key: String
  ) {
    update_courses_moodle_config(
      where: { id: { _eq: $id } }
      _set: {
        moodle_server_acs_url: $moodle_server_acs_url
        moodle_sp_client_id: $moodle_sp_client_id
        moodle_sp_name: $moodle_sp_name
        moodle_sp_redirect_url: $moodle_sp_redirect_url
        moodle_sp_secret_key: $moodle_sp_secret_key
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const CREATE_COURSE_MUTATION = gql`
  mutation insesrt_course(
    $course_category_id: bigint
    $description: String
    $end_date: timestamptz
    $full_name: String
    $is_moodle_course: Boolean
    $moodle_config_id: bigint
    $moodle_course_url: String
    $publish: Boolean
    $start_date: timestamptz
    $identifier: String
    $cost: numeric
    $discount: numeric
    $duration: String
    $image_url: String
    $is_live_course: Boolean
    $moodle_course_id: String
    $nsql_level: String
    $short_name: String
  ) {
    insert_courses_course_one(
      object: {
        course_category_id: $course_category_id
        description: $description
        end_date: $end_date
        full_name: $full_name
        is_moodle_course: $is_moodle_course
        moodle_config_id: $moodle_config_id
        moodle_course_url: $moodle_course_url
        publish: $publish
        start_date: $start_date
        identifier: $identifier
        cost: $cost
        discount: $discount
        duration: $duration
        image_url: $image_url
        is_live_course: $is_live_course
        moodle_course_id: $moodle_course_id
        nsqf_level: $nsql_level
        short_name: $short_name
      }
      on_conflict: {
        constraint: course_identifier_key
        where: { identifier: { _eq: "" } }
        update_columns: []
      }
    ) {
      id
      full_name
    }
  }
`;

export const UPDATE_COURSE_MUTATION = gql`
  mutation update_course(
    $course_category_id: bigint
    $description: String
    $end_date: timestamptz
    $full_name: String
    $is_moodle_course: Boolean
    $moodle_config_id: bigint
    $moodle_course_url: String
    $publish: Boolean
    $start_date: timestamptz
    $identifier: String
    $cost: numeric
    $discount: numeric
    $duration: String
    $image_url: String
    $is_live_course: Boolean
    $moodle_course_id: String
    $nsql_level: String
    $short_name: String
    $id: bigint
  ) {
    update_courses_course(
      where: { id: { _eq: $id } }
      _set: {
        cost: $cost
        course_category_id: $course_category_id
        description: $description
        discount: $discount
        duration: $duration
        end_date: $end_date
        full_name: $full_name
        identifier: $identifier
        image_url: $image_url
        is_live_course: $is_live_course
        is_moodle_course: $is_moodle_course
        moodle_config_id: $moodle_config_id
        moodle_course_id: $moodle_course_id
        moodle_course_url: $moodle_course_url
        nsqf_level: $nsql_level
        publish: $publish
        short_name: $short_name
        start_date: $start_date
      }
    ) {
      returning {
        id
        full_name
      }
    }
  }
`;

export const CREATE_COURSE_BATCHES_MUTATION = gql`
  mutation insert_course_batches(
    $to_time: timestamptz
    $from_time: timestamptz
    $batch_name: String
    $course_id: Int
    $instructor_id: Int
    $slots_days: String
    $platform: String
    $min_learners: Int
    $max_learners: Int
    $partner_id: Int
    $meeting_link: String
    $repeat_end_time: timestamptz
    $project_id: bigint
  ) {
    insert_courses_course_batches_one(
      object: {
        to_time: $to_time
        from_time: $from_time
        batch_name: $batch_name
        course_id: $course_id
        instructor_id: $instructor_id
        slots_days: $slots_days
        platform: $platform
        min_learners: $min_learners
        max_learners: $max_learners
        partner_id: $partner_id
        meeting_link: $meeting_link
        repeat_end_time: $repeat_end_time
        project_id: $project_id
      }
    ) {
      id
      batch_name
      instructor_id
      platform
      slots_days
    }
  }
`;
