import {gql} from '@apollo/client';

export const GET_BATCH_DETAILS = gql`
query get_batches {
    courses_course_batches(order_by: {id: desc}) {
      batch_name
      from_time
      id
      max_learners
      min_learners
      
      repeat_end_time
      slots_days
      to_time
      platform
      Batch_Partner {
        name
      }
      Batch_Instructor {
        name
      }
      Courses {
        full_name
      }
    }
  }

  `

export const GET_SLOTS_BY_BATCH_ID = gql`
  query get_slots ($batch_id: Int){
    courses_batch_slots(where: {batch_id: {_eq: $batch_id}, enable_slots: {_eq: true} }, order_by: {slot_date: asc}) {
      id
      slot_date
      slots_days
      endto_date 
      platform
      batch_id
      meeting_link
      instructor_id
      event_id
      Course_batch_slots {
        batch_name
        Batch_Instructor {
          id
          name
          email
          
        }
        Courses {
          full_name
        }
      }
    }
  }


  `

  export const GET_SLOTS_ROW_DATA_BY_ID = gql`
  query get_slots_row_data ($id: Int) {
    courses_batch_slots(where: {id: {_eq: $id}}) {
      id
      platform
      slot_date
      slots_days
      endto_date 
      instructor_id  
      batch_id
      event_id 
      meeting_link     

      Course_batch_slots {
        batch_name
      }
    }
  }
  `
  export const GET_UPDATED_SLOTS = gql`
  query UpdateQuery ($id: Int){
    courses_batch_slots(where: {id: {_eq: $id}}) {
      batch_id
      endto_date
      event_id
      id
      meeting_link
      platform
      slot_date
      slots_days
    }
  }
  `

  export const GET_COURSE_BATCHES = gql`
query getCourseBatches($course_id: Int) {
    courses_course_batches(where: {course_id: {_eq: $course_id}}) {
      batch_name
      id
    }
  }
  
`