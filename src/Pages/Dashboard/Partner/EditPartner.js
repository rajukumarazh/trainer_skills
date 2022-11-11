import useRouterQuery from "../../../utils/hooks/useRouterQuery";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PARTNERS_BY_ID } from "../.../../../../GraphQl/Queries/Partner";
import { PARTNER_SCHEMA } from "./DbSchema";
import Container from "../../../components/Container/Container";
import Checkbox from "../../../components/InputGroup/Checkbox";
import Input from "../../../components/InputGroup/Input";
import Select from "../../../components/InputGroup/Select";
import TextArea from "../../../components/InputGroup/TextArea";
import { UPDATE_PARTNER_BY_ID } from "../../../GraphQl/Mutations/Partner";

const EditPartner = (props) => {
  const [partner, setPartner] = useState([]);
  const searchQuery = useRouterQuery();

  let userId = "";
  if (searchQuery.get("id")) {
    userId = searchQuery.get("id");
  } else {
    userId = props.userId;
  }

  const { data, loading } = useQuery(GET_PARTNERS_BY_ID, {
    variables: { id: parseInt(userId) },
  });
  const [update_partner, update_partner_data] =
    useMutation(UPDATE_PARTNER_BY_ID);
  useEffect(() => {
    if (!loading) setPartner(data.courses_partner[0]);
    return () => setPartner([]);
  }, [loading]);
  const updateValue = (e) =>
    setPartner({
      ...partner,
      [e.target.getAttribute("data-key")]: e.target.value,
    });
  const updateCheckbox = (e) =>
    setPartner({
      ...partner,
      [e.target.getAttribute("data-key")]: e.target.checked,
    });
  const updatePartner = (e) => {
    e.preventDefault();
    update_partner({ variables: partner });
  };
  const convertToInputDate = (value) => {
    var utc = new Date(value);
    if (utc.toString() !== "Invalid Date")
      return utc.toJSON().slice(0, 10).replace(/-/g, "-");
  };
  const getSelectedValue = (defaultValue, column_name, options) => {
    console.log(defaultValue, options);
    return options.filter(({ value }) => value == defaultValue)[0];
  };

  const updateSelectValue = (value, key) => {
    const obj = {};
    obj[key] = value;

    setPartner((prevState) => {
      const criteriaObj = {
        ...prevState,
        ...obj,
      };
      return criteriaObj;
    });
  };
  return (
    <Container title={"Add New Partner"}>
      <form className="flex flex-wrap" onSubmit={updatePartner}>
        {PARTNER_SCHEMA.map((field) => {
          return (
            <div className="w-1/2">
              {["text", "password"].includes(field.type) && (
                <Input
                  label={field.label}
                  type={field.type}
                  data-key={field.column_name}
                  onChange={updateValue}
                  value={!loading && partner[field.column_name]}
                />
              )}
              {field.type === "date" && (
                <Input
                  label={field.label}
                  type={field.type}
                  data-key={field.column_name}
                  onChange={updateValue}
                  value={
                    !loading && convertToInputDate(partner[field.column_name])
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
                  value={!loading && partner[field.column_name]}
                />
              )}
              {field.type == "checkbox" && (
                <Checkbox
                  label={field.label}
                  type="checkbox"
                  data-key={field.column_name}
                  onChange={updateCheckbox}
                  checked={!loading && partner[field.column_name]}
                />
              )}
              {field.type == "select" && (
                <Select
                  className="max-w-xs mt-3"
                  options={field.options}
                  value={getSelectedValue(
                    partner[field.column_name],
                    field.column_name,
                    field.options
                  )}
                  onChange={(e) =>
                    updateSelectValue(e.value, field.column_name)
                  }
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
        {update_partner_data.data && (
          <div className="mt-1">
            <div className="text-lg text-green-800">
              partner updated successfully
            </div>
          </div>
        )}
      </form>
    </Container>
  );
};

export default EditPartner;
