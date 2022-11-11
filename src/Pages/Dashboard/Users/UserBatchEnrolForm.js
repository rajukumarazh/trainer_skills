import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import Container from "../../../components/Container/Container";
import Checkbox from "../../../components/InputGroup/Checkbox";
import Input from "../../../components/InputGroup/Input";
import Select from "../../../components/InputGroup/Select";
import TextArea from "../../../components/InputGroup/TextArea";
import {
  GET_PARTNER_AND_INSTRUCTOR,
  GET_USER_BY_ID,
} from "../../../GraphQl/Queries/User";
import { UPDATE_USER_BY_ID } from "../../../GraphQl/Mutations/User";
import { USER_SCHEMA_EDIT } from "./DbSchema";
import { BATCH_ENROL_USER_SCHEMA } from "./BatchEnrolDbSchema";
import { COURSES_QUERY } from "../../../GraphQl/Queries/Courses";
import liveClassService from "services/LiveClass/LiveClass";
import { CREATE_USER_BATCH_ENROL_MUTATION } from "../../../GraphQl/Mutations/BatchesSlots";

const UserBatchEnrolForm = (props) => {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  let userId = "";
  if (params.get("id")) {
    userId = params.get("id");
  } else {
    userId = props.userId;
  }
  const { data, loading, error, networkStatus } = useQuery(GET_USER_BY_ID, {
    variables: { id: parseInt(userId) },
  });
  const [update_user, update_user_data] = useMutation(UPDATE_USER_BY_ID);
  const [user, setUser] = useState([]);
  const { loading: selection_loading, data: selection_data } = useQuery(
    GET_PARTNER_AND_INSTRUCTOR
  );

  const [insertUserBatchEnrol, mutationEnrol] = useMutation(
    CREATE_USER_BATCH_ENROL_MUTATION
  );

  const [batch, setBatch] = useState([]);
  useEffect(() => {
    if (data) setUser(data.courses_users[0]);
    return () => setUser([]);
  }, [loading, data]);

  const updateValue = async (e) => {
    setUser({ ...user, [e.target.getAttribute("data-key")]: e.target.value });
    console.log(e.target.value);
    if (e.target.getAttribute("data-key") == "course_id") {
      const re = await liveClassService.getCourseBatches(e.target.value);
      if (re && re.courses_course_batches) {
        const batchOptions = re.courses_course_batches.map((course, i) => {
          return { value: course.id, label: course.batch_name };
        });

        setBatch(batchOptions);
      }
    }
  };

  const updateCheckBox = (e) =>
    setUser({ ...user, [e.target.getAttribute("data-key")]: e.target.checked });
  const updateUser = (e) => {
    e.preventDefault();

    var arr = [];
    arr["batch_id"] = user.course_batchid;
    arr["course_id"] = user.course_id;
    arr["user_id"] = user.id;
    arr["batch_enrol_date"] = new Date();
    arr["enrol_by"] = "admin";

    console.log("userhbhh", user);
    insertUserBatchEnrol({ variables: arr });
    //update_user({ variables: user });
  };
  const convertToInputDate = (value) => {
    var utc = new Date(value);
    if (utc.toString() !== "Invalid Date")
      return utc.toJSON().slice(0, 10).replace(/-/g, "-");
  };

  const courses = useQuery(COURSES_QUERY);
  useEffect(() => {
    console.log("Courses : ", courses);

    if (courses.data && courses.data.courses_course) {
      const courseOptions = courses.data.courses_course.map((course, i) => {
        return { value: course.id, label: course.full_name };
      });

      setCourses(courseOptions);
    }
  }, [courses]);

  const [courseOptions, setCourses] = useState([]);
  return (
    <Container>
      <form onSubmit={updateUser} className="flex flex-wrap">
        {BATCH_ENROL_USER_SCHEMA.map((field) => {
          return (
            <div className="w-1/2" key={field.label}>
              {["text", "password"].includes(field.type) && (
                <Input
                  label={field.label}
                  type={field.type}
                  data-key={field.column_name}
                  onChange={updateValue}
                  value={!loading && user[field.column_name]}
                />
              )}
              {field.type === "date" && (
                <Input
                  label={field.label}
                  type={field.type}
                  data-key={field.column_name}
                  onChange={updateValue}
                  value={
                    !loading && convertToInputDate(user[field.column_name])
                  }
                />
              )}
              {field.type == "text_area" && (
                <TextArea
                  label={field.label}
                  data-key={field.column_name}
                  onChange={updateValue}
                  rows="5"
                  cols="30"
                  type="text"
                />
              )}
              {field.type == "selector" && (
                <Select
                  label={field.label}
                  options={
                    field.column_name == "course_id"
                      ? courseOptions
                      : field.column_name == "course_batchid"
                      ? batch
                      : []
                  }
                  value={!loading && user[field.column_name]}
                  valueField={"value"}
                  displayField={"label"}
                  data-key={field.column_name}
                  onChange={(e) => updateValue(e)}
                />
              )}
              {field.type == "checkbox" && (
                <Checkbox
                  label={field.label}
                  type="checkbox"
                  data-key={field.column_name}
                  onChange={updateCheckBox}
                  checked={!loading && user[field.column_name]}
                />
              )}
            </div>
          );
        })}
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo"
          >
            Save
          </button>
        </div>
        {mutationEnrol.data && (
          <div className="mt-1">
            <div className="text-lg text-green-800">
              user successfully Enrolled
            </div>
          </div>
        )}
      </form>
    </Container>
  );
};

export default UserBatchEnrolForm;
