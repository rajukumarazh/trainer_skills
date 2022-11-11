import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  INSERT_COURSE_CRITERIA,
  DELETE_COURSE_CRITERIA_COURSES,
  UPDATE_COURSE_CRITIERA,
  INSERT_COURSE_CRITERIA_COURSES,
} from "../../../GraphQl/Mutations/CourseCriteria";


import {
  GET_USERS_BY_PARTNER_ID,
  GET_USERS_BY_INSTRUCTOR_ID,
  GET_PARTNER_AND_INSTRUCTOR,
  Get_USRS_BY_PARNTER_AND_INSTRUCTOR,
  GET_USERS_QUERY,
} from "./../../../GraphQl/Queries/User";

import { COURSES_QUERY } from "../../../GraphQl/Queries/Courses";

import CourseSelection from "./components/CourseSelection";
import CriteriaComponent from "./components/CriteriaComponent";
import UserSelection from "./components/UserSelection";
import CriteriaTable from "./components/CriteriaTable";
import Input from "../../../components/InputGroup/Input";
import {
  GET_COURSE_CRITERIA,
  GET_TOTAL_COURSE_CRITERIA,
} from "../../../GraphQl/Queries/CourseCriteria";
import { GET_COURSE_COUPONS } from "../../../GraphQl/Queries/Coupons";

function CourseCriteria() {
  const [courseCriteria, setcourseCriteria] = useState({
    partner_id: -1,
    instructor_id: -1,
    apply_to_skillstrainer: false,
    coupon_id: -1,
  });

  const totalCriterias = useQuery(GET_TOTAL_COURSE_CRITERIA);

  const [updateMessage, setupdateMessage] = useState({
    message: "",
    coursesCounter: 0,
  });

  let courseCriterias = useQuery(GET_COURSE_CRITERIA);
  // const courseCoupons = useQuery(GET_COURSE_COUPONS);
  // let [runQuery, courseCriterias]  = useLazyQuery(GET_COURSE_CRITERIA, {
  //     fetchPolicy: "network-only" // Doesn't check cache before making a network request
  //   });
  const { error, loading, data } = useQuery(GET_PARTNER_AND_INSTRUCTOR);
  const [update_course_criteria, mutationCourseCriteriaUpdateData] =
    useMutation(UPDATE_COURSE_CRITIERA);
  const [delete_course_criteria_courses, mutationDeleteCourseCritieraCourses] =
    useMutation(DELETE_COURSE_CRITERIA_COURSES);
  const [insert_course_criteria_courses, mutationInsertCourseCcriteriaCourses] =
    useMutation(INSERT_COURSE_CRITERIA_COURSES, {
      refetchQueries: [GET_COURSE_CRITERIA],
    });

  const [courseCompleteCriteria, setcourseCompleteCriteria] = useState({
    courses: [],
    users: [],
    apply_to_all_courses: true,
    apply_to_all_users: true,
    name: "",
  });
  const [insert_course_criteria, insert_response] = useMutation(
    INSERT_COURSE_CRITERIA,
    {
      refetchQueries: [GET_COURSE_CRITERIA],
    }
  );

  const criteriaFields = [
    {
      column_name: "partner_id",
      label: "Select partner",
      type: "select",
    },
    {
      column_name: "instructor_id",
      label: "Select instructors",
      type: "select",
    },
    {
      column_name: "coupon_id",
      label: "Select Coupon",
      type: "select",
    },
    {
      column_name: "apply_to_skillstrainer",
      label: "Apply to skillstrainer",
      type: "checkbox",
    },
  ];

  const saveCriteria = (criteria) => {
    // //////console.log("Saving criteria : ", criteria);
    // setcourseCriteria(criteria);
    setcourseCriteria((prevState) => {
      const courseObj = {
        ...prevState,
        ...criteria,
      };

      return courseObj;
    });
  };

  useEffect(() => {
    //////console.log(courseCriteria);
    courseCompleteCriteria.criteria = courseCriteria;
    setcourseCompleteCriteria(courseCompleteCriteria);
  }, [courseCriteria]);

  const updateCheckboxInput = (e) => {
    const key = e.target.getAttribute("data-key");

    const value = e.target.checked;
    courseCompleteCriteria[key] = value;
    setcourseCompleteCriteria(courseCompleteCriteria);
  };

  const updateCourseSelection = (course_ids, checked) => {
    courseCompleteCriteria.courses = course_ids;
    setcourseCompleteCriteria(courseCompleteCriteria);
  };

  const updateUserSelection = (user_ids, checked) => {
    courseCompleteCriteria.users = user_ids;

    setcourseCompleteCriteria(courseCompleteCriteria);
  };

  const updateCourseCompletionCriteria = (critieraData) => {
    const completeCriteriaPayload = {
      courses: critieraData.courses.map(({course_id}) => {
        return course_id;
      }),
      users: critieraData.users.map(({user_id}) => {
        return user_id;
      }),
      criteria: {
        partner_id: critieraData.partner_id ? critieraData.partner_id : -1,
        instructor_id: critieraData.instructor_id
          ? critieraData.instructor_id
          : -1,
        coupon_id: critieraData.coupon_id ? critieraData.coupon_id : -1,
        apply_to_skillstrainer:
          critieraData.apply_to_skillstrainer === true
            ? critieraData.apply_to_skillstrainer
            : false,
      },
      apply_to_all_users: critieraData.apply_to_all_users,
      apply_to_all_courses: critieraData.apply_to_all_courses,
      name: critieraData.name,
      id: critieraData.id,
    };

    setcourseCompleteCriteria((prevState) => {
      const courseObj = {
        ...prevState,
        ...completeCriteriaPayload,
      };

      return courseObj;
    });

    setcourseCriteria((prevState) => {
      const courseObj = {
        ...prevState,
        ...completeCriteriaPayload.criteria,
      };

      return courseObj;
    });
  };

  const updateCriteriaName = (e) => {
    // courseCompleteCriteria.name = e.target.value;
    setcourseCompleteCriteria((prevState) => {
      const criteriaObj = {
        ...prevState,
        ...{name: e.target.value},
      };
      return criteriaObj;
    });
  };

  const submitCriteria = (e) => {
    //////console.log('Course Completion criteria : ', courseCompleteCriteria);
    e.preventDefault();
    const payload = {
      courses: courseCompleteCriteria.courses.map((course_id) => {
        return {course_id};
      }),
      users: courseCompleteCriteria.users.map((user_id) => {
        return {user_id};
      }),
      partner_id:
        courseCompleteCriteria.criteria.partner_id != -1
          ? courseCompleteCriteria.criteria.partner_id
          : null,
      instructor_id:
        courseCompleteCriteria.criteria.instructor_id != -1
          ? courseCompleteCriteria.criteria.instructor_id
          : null,
      coupon_id:
        courseCompleteCriteria.criteria.coupon_id != -1
          ? courseCompleteCriteria.criteria.coupon_id
          : null,
      apply_to_all_courses: courseCompleteCriteria.apply_to_all_courses,
      apply_to_all_users: courseCompleteCriteria.apply_to_all_users,
      apply_to_skillstrainer:
        courseCompleteCriteria.criteria.apply_to_skillstrainer,
      name: courseCompleteCriteria.name,
    };

    console.log("Final payload : ", payload);

    if (!courseCompleteCriteria.id) {
      insert_course_criteria({variables: payload});
    } else {
      console.log("Updating course criteria");
      payload.id = courseCompleteCriteria.id;
      update_course_criteria({
        variables: payload,
      });
    }
  };

  useEffect(() => {
    if (
      mutationInsertCourseCcriteriaCourses.called == true &&
      mutationInsertCourseCcriteriaCourses.loading === false
    ) {
      if (!mutationInsertCourseCcriteriaCourses.error) {
        console.log(
          "Update mutation criteria course call : ",
          mutationInsertCourseCcriteriaCourses
        );

        const update_count =
          mutationInsertCourseCcriteriaCourses.data
            .insert_courses_course_critiera_courses.affected_rows;

        console.log(
          updateMessage.coursesCounter,
          courseCompleteCriteria.courses.length
        );

        if (
          updateMessage.coursesCounter + update_count <
          courseCompleteCriteria.courses.length
        ) {
          setupdateMessage((prevState) => {
            return {
              ...prevState,
              coursesCounter: prevState.coursesCounter + update_count,
            };
          });
        }
      }
    }
  }, [mutationInsertCourseCcriteriaCourses]);

  useEffect(() => {
    console.log("mutationInsertCourseCcriteriaCourses");
    if (updateMessage.coursesCounter === 0) {
      console.log(
        "Courese completin update data: ",
        mutationCourseCriteriaUpdateData,
        mutationDeleteCourseCritieraCourses
      );
      if (
        mutationCourseCriteriaUpdateData.called === true &&
        mutationCourseCriteriaUpdateData.loading === false &&
        mutationDeleteCourseCritieraCourses.called == false
      ) {
        if (!mutationCourseCriteriaUpdateData.error) {
          setupdateMessage({message: "Course is updated ", coursesCounter: 0});
          delete_course_criteria_courses({
            variables: {
              id: courseCompleteCriteria.id,
            },
          });
        }
      }

      if (
        mutationDeleteCourseCritieraCourses.called == true &&
        mutationDeleteCourseCritieraCourses.loading === false &&
        mutationInsertCourseCcriteriaCourses.called === false
      ) {
        if (!mutationDeleteCourseCritieraCourses.error) {
          courseCompleteCriteria.courses.map((course_id) => {
            insert_course_criteria_courses({
              variables: {
                criteria_id: courseCompleteCriteria.id,
                course_id,
              },
            });
          });

          console.log(
            "Course length : ",
            courseCompleteCriteria.courses.length
          );
          setupdateMessage((prevState) => {
            return {
              message: prevState.message,
              coursesCounter: courseCompleteCriteria.courses.length,
            };
          });
        }
      }
    }
  }, [mutationCourseCriteriaUpdateData, mutationDeleteCourseCritieraCourses]);
  ////console.log('Course Completion criteria', courseCompleteCriteria, courseCriteria);

  const isCriteriaActive = () => {
    if (
      courseCriteria &&
      (courseCriteria?.partner_id != -1) & courseCriteria?.partner_id
    ) {
      return true;
    }

    if (
      courseCriteria &&
      courseCriteria.coupon_id &&
      courseCriteria?.coupon_id != -1
    ) {
      return true;
    }

    return false;
  };

  const getTotalCriterias = () => {
    if (totalCriterias.data) {
      return totalCriterias.data.courses_course_criteria_aggregate.aggregate
        .count;
    }

    return 0;
  };

  return (
    <div>
      <h2 className="text-2xt font-bold px-4">Manage Criteria</h2>
      <div className="px-4 m-3 w-3/4">
        <div className="m-3">
          <h5>Create criteria</h5>
          <div className="flex w-1/4">
            <Input
              label="Enter criteria name"
              type={"text"}
              data-key="criteria_name"
              onChange={(e) => updateCriteriaName(e)}
              value={courseCompleteCriteria.name}
            />
          </div>
          <CriteriaComponent
            saveCriteria={(criteria) => saveCriteria(criteria)}
            criteriaFields={criteriaFields}
            criteria={courseCompleteCriteria.criteria}
            data={data}
          />
        </div>
        {isCriteriaActive() && (
          <div className="m-3">
            <h5>Select Courses</h5>
            <div className=" mb-4">
              <label htmlFor="" className="block">
                <span className="pr-4">
                  Apply to all courses (Existing/Created in futuer)
                </span>
                <input
                  data-key="apply_to_all_courses"
                  type="checkbox"
                  checked={courseCompleteCriteria.apply_to_all_courses}
                  onChange={(e) => updateCheckboxInput(e)}
                  classNsame="block mt-l"
                />
              </label>
            </div>
            <CourseSelection
              courses={courseCompleteCriteria.courses}
              updateCourseSelection={(course_id, checked) =>
                updateCourseSelection(course_id, checked)
              }
            ></CourseSelection>
          </div>
        )}
        {/* {courseCriteria  && courseCriteria?.partner_id != -1 && <div className="m-3">
                    <h5>Select Users</h5>
                    <div className="mt-2 mb-2">
                        <label htmlFor="" className="block">
                            <span className="mr-3">Apply to all users (Existing/futuer)</span>
                            <input 
                                data-key = "apply_to_all_users"
                                type="checkbox" 
                                checked = {courseCompleteCriteria.apply_to_all_users}
                                onChange={(e) => updateCheckboxInput(e)}
                                className=" mt-l" />
                        </label>
                    </div>
                    <UserSelection 
                        users={courseCompleteCriteria.users}
                        updateUserSelection={(user_id, checked) => updateUserSelection(user_id, checked)} 
                        criteria={courseCriteria} >

                    </UserSelection>
                </div>} */}
        <button
          onClick={(e) => submitCriteria(e)}
          className="block w-40 h-10 border-r-4 bg-blue-600 text-1xl text-white mt-1"
        >
          Save Criteria
        </button>
        {insert_response.data?.insert_courses_course_criteria_one && (
          <div className="text-green-600 text-base mt-2">
            Course critiera created
          </div>
        )}
        {updateMessage.message != "" && (
          <div className="text-green-600 text-base mt-2">
            {`${updateMessage.message} Courses updated ${updateMessage.coursesCounter}`}
          </div>
        )}
      </div>
      <CriteriaTable
        courseCriterias={courseCriterias}
        total={getTotalCriterias()}
        updateCourseCompletionCriteria={(criteriaPayload) =>
          updateCourseCompletionCriteria(criteriaPayload)
        }
      />
    </div>
  );
}

export default CourseCriteria;
