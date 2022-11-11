import React, {useEffect, useState} from "react";
import {useQuery, useMutation} from "@apollo/client";

import {MOODLE_CONFIG_QUERY} from "../../../GraphQl/Queries/Courses";
import {CREATE_MOODLE_CONFIG_MUTATION} from "../../../GraphQl/Mutations/Courses";

import {moodleConfigSchema} from "./DbScchemas";
import Table from "../../../components/Table/Table";
import Container from "../../../components/Container/Container";
import Input from "../../../components/InputGroup/Input";

function MoodleConfig() {
  const {error, loading, data} = useQuery(MOODLE_CONFIG_QUERY);
  const [insert_moodle_config, {mutatioData, mutationLoading, mutationError}] =
    useMutation(CREATE_MOODLE_CONFIG_MUTATION, {
      refetchQueries: [MOODLE_CONFIG_QUERY],
    });

  const [moodleConfigs, setmoodleConfigs] = useState([]);
  const [moodleConfig, setmoodleConfig] = useState({});

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");

    e.preventDefault();
    const value = e.target.value;
    moodleConfig[key] = value;
    setmoodleConfig(moodleConfig);
  };

  useEffect(() => {
    if (data) {
      setmoodleConfigs(data.courses_moodle_config);
    }
  }, [data]);

  const submitMoodleConfig = (e) => {
    e.preventDefault();
    console.log("Moodle configuration : ", moodleConfig);
    insert_moodle_config({variables: moodleConfig});
    if (mutationError) {
      console.log(mutationError);
    }
  };

  const [values, setValues] = useState([]);
  const [labels, setLabels] = useState([
    "SP Name",
    "SP Client Id",
    "SP ACS URL",
    "SP Rediect URL",
    "Updated At",
    "Id",
  ]);
  useEffect(() => {
    setValues(
      moodleConfigs.map((moodleConfig) => [
        moodleConfig.moodle_sp_name,
        moodleConfig.moodle_sp_client_id,
        moodleConfig.moodle_server_acs_url,
        moodleConfig.moodle_sp_redirect_url,
        moodleConfig.updated_at,
        moodleConfig.id,
      ])
    );
  }, [moodleConfigs]);
  console.log(labels);
  return (
    <Container title={"Add Moodle Config"}>
      <form className="flex flex-wrap" onSubmit={submitMoodleConfig}>
        {moodleConfigSchema.map((course) => {
          return (
            <div className="w-1/2">
              {["text", "date", "password"].includes(course.type) && (
                <Input
                  
                  label={course.label}
                  type={course.type}
                  data-key={course.column_name}
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
      </form>

      <Table
        labels={labels}
        values={values}
        editRoute={"/courses/course_moodle_config_update"}
        id_index={labels.length - 1}
      />
    </Container>
  );
}

export default MoodleConfig;
