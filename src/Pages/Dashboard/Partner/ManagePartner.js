import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { GET_PARTNERS } from "../../../GraphQl/Queries/Partner";
import { CREATE_PARTNER } from "../../../GraphQl/Mutations/Partner";

import { PARTNER_DISPLAY_SCHEMA, PARTNER_SCHEMA } from "./DbSchema";
import Table from "../../../components/Table/Table";
import Container from "../../../components/Container/Container";
import TextArea from "../../../components/InputGroup/TextArea";
import Input from "../../../components/InputGroup/Input";
import Checkbox from "../../../components/InputGroup/Checkbox";
import PartnerTable from "./components/PartnerTable";
import EditPartnerModal from "./EditParnterModal";
import Select from "react-select";
import base64 from "base-64";
import Parse from "papaparse";
import { uploadFile } from "../../../api/UploadFile";
import ReactSelect from "react-select";
import axios from "axios";
import Creatable, { useCreatable } from "react-select/creatable";

function ManagePartner() {
  const { error, loading, data } = useQuery(GET_PARTNERS);
  const [showUserModal, setShowUserModal] = useState(false);
  const [seletedUser, setSeletedUser] = useState({});
  const [reqLoading, setreqLoading] = useState(false);

  const [childRefreshFunction, setChildRefreshFunction] = useState(null);

  const [insertPartner, { mutationData, mutationLoading, mutationError }] =
    useMutation(CREATE_PARTNER, {
      refetchQueries: [GET_PARTNERS],
    });

  const [partner, setPartner] = useState({});
  const [errors, setErrors] = useState([]);

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");
    e.preventDefault();
    const value = e.target.value;
    partner[key] = value;
    setPartner({ ...partner });
  };

  const updateCheckbox = (e) => {
    const key = e.target.getAttribute("data-key");

    const value = e.target.checked;
    partner[key] = value;
    setPartner(partner);
  };

  const CheckFields = async () => {
    PARTNER_SCHEMA.map(async (partner_schema) => {
      if (
        partner_schema.type === "checkbox" &&
        partner[partner_schema.column_name] == undefined
      ) {
        var key = partner_schema.column_name;
        partner[key] = false;
        setPartner({ ...partner });
      }
    });
    return partner;
  };

  const submitPartner = async (e) => {
    e.preventDefault();
    setErrors([]);
    CheckFields();
    var submit_errors = [];
    PARTNER_SCHEMA.map((v) => {
      if (v.required)
        if (!(v.column_name in partner)) {
          if (v.required_or) {
            v.required_or.map((j) => {
              if (!(PARTNER_SCHEMA[j].column_name in partner)) {
                submit_errors.push({ message: `${v.label} is required` });
              }
            });
          } else {
            submit_errors.push({ message: `${v.label} is required` });
          }
        }
    });
    console.log("Partner_>>>", partner);
    if (submit_errors.length) {
      setErrors(submit_errors);
      return;
    }
    partner.identifier = partner.name.toLowerCase().replaceAll(" ", "-");
    insertPartner({ variables: { object: partner, update_columns: [] } });
    if (mutationError) {
      console.log(mutationError);
    }
  };

  const editPartners = (user) => {
    setSeletedUser(user);
    setShowUserModal(true);
  };

  useEffect(() => {
    if (seletedUser.id) {
      setShowUserModal(true);
    }
  }, [seletedUser]);

  const handleModalClose = () => {
    setShowUserModal(false);
  };

  useEffect(() => {
    if (childRefreshFunction) {
      childRefreshFunction();
    }
  }, [mutationData]);

  const getSelectedValue = (defaultValue, column_name, options) => {
    if (column_name == "organization_type") {
      return options.filter(({ value }) => value == defaultValue)[0];
    }
    if (column_name == "organization_category") {
      return options.filter(({ value }) => value == defaultValue)[0];
    }
  };

  const checkAdressUpdate = () => {};

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
  const uploadNewFile = async (column_name) => {
    const response = await uploadFile(
      partner[column_name].file_data,
      partner[column_name].file_name,
      "images"
    );
    partner[column_name] = response.data_url;

    setPartner(partner);
    console.log("File uploaded end", partner);
  };
  const updateFile = async (e) => {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function (output) {
      // let data = output.target.result.split(",")[1];
      partner[e.target.getAttribute("data-key")] = {
        file_name: file.name,
        file_data: output.target.result,
      };
      setPartner(partner);
      uploadNewFile(e.target.getAttribute("data-key"));
      console.log("setting", partner);
    };
    reader.readAsDataURL(file);
    // reader.readAsDataURL(file.slice(0, 10000000)); //read 10 mb instead of whole file
  };
  const [addressOptions, setAddressOptions] = useState([]);
  const [addressMenuOpen, setAddressMenuOpen] = useState(false);

  const getAddressOptions = async (column_name) => {
    const res = await axios.get(
      `https://api.postalpincode.in/pincode/${partner[column_name]}`
    );
    console.log(res.data[0].Status != "Success");
    if (res.data[0].Status != "Success") return;
    var new_address_options = [];

    res.data[0].PostOffice.map((post) =>
      new_address_options.push({
        value: `${post.Name},${post.District},${post.State}`,
        label: `${post.Name},${post.District},${post.State}`,
      })
    );

    setAddressOptions([...new_address_options]);
  };
  useEffect(() => {
    getAddressOptions("pin_code");
  }, [partner["pin_code"]]);
  useEffect(() => {
    if (addressOptions.length < 1) return;
    setAddressMenuOpen(true);
  }, [addressOptions]);

  return (
    <Container title={"Add New Partner"}>
      <form className="flex flex-wrap" onSubmit={submitPartner}>
        {PARTNER_SCHEMA.map((partner_schema) => {
          return (
            <div className="w-1/2">
              {["select-address"].includes(partner_schema.type) && (
                <div className={`mx-4`}>
                  <label className="block text-sm font-medium text-gray-700">
                    {partner_schema.label}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Creatable
                      onMenuOpen={() => setAddressMenuOpen(true)}
                      menuIsOpen={addressMenuOpen}
                      onMenuClose={() => setAddressMenuOpen(false)}
                      onCreateOption={(option) => {
                        setAddressOptions([
                          ...addressOptions,
                          { value: option, label: option },
                        ]);
                        updateSelectValue(option, partner_schema.column_name);
                      }}
                      options={addressOptions}
                      value={{
                        value: partner[partner_schema.column_name],
                        label: partner[partner_schema.column_name],
                      }}
                      onChange={(e) =>
                        updateSelectValue(e.value, partner_schema.column_name)
                      }
                    />
                  </div>
                </div>
              )}
              {["file"].includes(partner_schema.type) && (
                <>
                  <div className={`mx-4`}>
                    <label className="block text-sm font-medium text-gray-700">
                      {partner_schema.label}
                    </label>
                    <div className="mt-1 relative rounded-md">
                      <input
                        onInput={updateFile}
                        type={partner_schema.type}
                        data-key={partner_schema.column_name}
                      />
                    </div>
                  </div>
                </>
              )}
              {["text", "date", "password"].includes(partner_schema.type) && (
                <Input
                  label={partner_schema.label}
                  type={partner_schema.type}
                  data-key={partner_schema.column_name}
                  onChange={(e) => updateValue(e)}
                />
              )}
              {partner_schema.type == "text_area" && (
                <TextArea
                  label={partner_schema.label}
                  data-key={partner_schema.column_name}
                  onChange={(e) => updateValue(e)}
                  rows="5"
                  cols="30"
                  type="text"
                />
              )}
              {partner_schema.type == "checkbox" && (
                <Checkbox
                  className="mt-3"
                  label={partner_schema.label}
                  type="checkbox"
                  data-key={partner_schema.column_name}
                  onChange={(e) => updateCheckbox(e)}
                />
              )}
              {partner_schema.type == "select" && (
                <div className={`mx-4`}>
                  <label className="block text-sm font-medium text-gray-700">
                    {partner_schema.label}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <Select
                      options={partner_schema.options}
                      value={getSelectedValue(
                        partner[partner_schema.column_name],
                        partner_schema.column_name,
                        partner_schema.options
                      )}
                      onChange={(e) =>
                        updateSelectValue(e.value, partner_schema.column_name)
                      }
                    />
                  </div>
                </div>
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
        {errors && (
          <div className="mt-1">
            {errors.map(({ message }) => {
              return <div className="text-lg text-red-800">{message}</div>;
            })}
          </div>
        )}
      </form>
      <PartnerTable
        editRoute={"/partner/update_partner"}
        editPartners={(partner) => editPartners(partner)}
        setRefreshFunction={(f) => {
          setChildRefreshFunction(f);
        }}
      />
      <EditPartnerModal
        show={showUserModal}
        partner={seletedUser}
        handleClose={() => handleModalClose()}
      />
    </Container>
  );
}

export default ManagePartner;
