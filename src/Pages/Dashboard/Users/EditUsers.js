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

const EditUsers = (props) => {
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
  useEffect(() => {
    if (data) setUser(data.courses_users[0]);
    return () => setUser([]);
  }, [loading, data]);

  const updateValue = (e) => {
    setUser({ ...user, [e.target.getAttribute("data-key")]: e.target.value });
    console.log(e.target.value);
  };

  const updateCheckBox = (e) =>
    setUser({ ...user, [e.target.getAttribute("data-key")]: e.target.checked });
  const updateUser = (e) => {
    e.preventDefault();
    update_user({ variables: user });
  };
  const convertToInputDate = (value) => {
    var utc = new Date(value);
    if (utc.toString() !== "Invalid Date")
      return utc.toJSON().slice(0, 10).replace(/-/g, "-");
  };
  return (
    <Container>
      <form onSubmit={updateUser} className="flex flex-wrap">
        {USER_SCHEMA_EDIT.map((field) => {
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
                    field.column_name == "instructor_id"
                      ? selection_data?.courses_instructor
                      : field.column_name == "partner_id"
                      ? selection_data?.courses_partner
                      : []
                  }
                  value={!loading && user[field.column_name]}
                  valueField={"id"}
                  displayField={"name"}
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
        {update_user_data.data && (
          <div className="mt-1">
            <div className="text-lg text-green-800">
              user updated successfully
            </div>
          </div>
        )}
      </form>
    </Container>
  );
};

export default EditUsers;
