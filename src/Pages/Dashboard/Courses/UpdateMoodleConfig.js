import {useMutation, useQuery} from "@apollo/client";
import React, {useEffect, useMemo, useState} from "react";
import {useLocation, useParams} from "react-router";
import {moodleConfigSchema} from "./DbScchemas";
import {GET_MOODLE_CONFIG_BY_ID} from "../../../GraphQl/Queries/Courses";
import {UPDATE_MOODLE_CONFIG_MUTATION} from "../../../GraphQl/Mutations/Courses";
import Container from "../../../components/Container/Container";
import Input from "../../../components/InputGroup/Input";
import Checkbox from "../../../components/InputGroup/Checkbox";
import TextArea from "../../../components/InputGroup/TextArea";
import Select from "../../../components/InputGroup/Select";

const UpdateMoodleConfig = () => {
  const {search} = useLocation();

  const params = useMemo(() => new URLSearchParams(search), [search]);
  console.log(params.get("id"));
  console.log(moodleConfigSchema);
  const {
    loading,
    error,
    data: querydata,
  } = useQuery(GET_MOODLE_CONFIG_BY_ID, {
    variables: {id: parseInt(params.get("id"))},
  });
  const [update_moodle_config, update_moodle_config_response] = useMutation(
    UPDATE_MOODLE_CONFIG_MUTATION
  );
  const [data, setData] = useState({});
  useEffect(() => {
    if (!loading) setData(querydata.courses_moodle_config[0]);
    console.log(data);
  }, [loading, querydata]);
  const updateData = (e) => {
    e.preventDefault();
    update_moodle_config({
      variables: {id: parseInt(params.get("id")), ...data},
    });
  };
  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");
    const value = e.target.value;
    setData({...data, [key]: value});
  };
  return (
    <Container title={"Update moodle config"}>
      <form onSubmit={updateData} className="flex flex-wrap">
        {moodleConfigSchema.map((course) => {
          return (
            <div className="w-1/2">
              {["text", "date", "password"].includes(course.type) && (
                <Input
                  
                  label={course.label}
                  type={course.type}
                  data-key={course.column_name}
                  value={data[course.column_name]}
                  onChange={(e) => updateValue(e)}
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

        {update_moodle_config_response.data && (
          <div className="mt-1">
            <div className="text-lg text-green-800">successfully updated</div>
          </div>
        )}
      </form>
    </Container>
  );
};

export default UpdateMoodleConfig;
