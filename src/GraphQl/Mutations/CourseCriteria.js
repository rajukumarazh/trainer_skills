import {gql} from '@apollo/client';


export const INSERT_COURSE_CRITERIA = gql`
    mutation insetCourseCriteria(
        $apply_to_all_courses: Boolean,
        $apply_to_all_users: Boolean, 
        $apply_to_skillstrainer: Boolean, 
        $courses: [courses_course_critiera_courses_insert_input!]!, 
        $users: [courses_course_criteria_users_insert_input!]!, 
        $name: String, 
        $instructor_id: bigint, 
        $partner_id: bigint,
        $coupon_id: uuid!
    ) {
        insert_courses_course_criteria_one(object: {
            apply_to_all_courses: $apply_to_all_courses, 
            apply_to_all_users: $apply_to_all_users, 
            apply_to_skillstrainer: $apply_to_skillstrainer, 
            courses: {data: $courses}, 
            users: {data: $users}, 
            name: $name, 
            instructor_id: $instructor_id, 
            partner_id: $partner_id,
            coupon_id: $coupon_id
        }) {
        id
        name
        }
    }
`

export const UPDATE_COURSE_CRITIERA = gql`
mutation updateCourseCriteria(
    $apply_to_all_courses: Boolean,
    $apply_to_all_users: Boolean,
    $apply_to_skillstrainer: Boolean,
    $id: bigint!,
    $instructor_id: bigint!,
    $name: String,
    $partner_id: bigint!
) {
    update_courses_course_criteria_by_pk(pk_columns: {id: $id}, _set: {
        apply_to_all_courses: $apply_to_all_courses, 
        apply_to_all_users: $apply_to_all_users, 
        apply_to_skillstrainer: $apply_to_skillstrainer, 
        instructor_id: $instructor_id,
        name: $name 
        partner_id: $partner_id}) {
      name
      instructor_id
      partner_id
      apply_to_skillstrainer
      apply_to_all_users
      apply_to_all_courses
    }
  }
  
`

export const DELETE_COURSE_CRITERIA_COURSES = gql`
mutation deleteCourseCriteriaCourses(
    $id: bigint!
) {
    delete_courses_course_critiera_courses(where: {criteria_id: {_eq: $id}}) {
        affected_rows
      }
}
`

export const INSERT_COURSE_CRITERIA_COURSES = gql`
mutation insert_course_critiera_courses(
    $course_id: bigint!,
    $criteria_id: bigint!
) {
    insert_courses_course_critiera_courses(objects: {
        course_id: $course_id, 
        criteria_id: $criteria_id
    }) {
        affected_rows
        returning {
            course_id
            created_at
            criteria_id
            id
        }
    }
}
`
