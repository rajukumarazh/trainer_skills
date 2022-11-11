import React, { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { USER_SCHEMA_DISPLAY } from "./DbSchema";
// import Table from "../../../components/Table/Table";
import UsersTable from "./components/UsersTable";
import Input from "../../../components/InputGroup/Input";
import {
  GET_TOTAL_USERS,
  GET_PARTNER_AND_INSTRUCTOR,
  GET_USERS_PAGINATION,
} from "../../../GraphQl/Queries/User";
import Select from "react-select";
import EditUserModel from "./EditUserModal";

function ManageUsers() {
  const [partnerId, setPartnerId] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterMobileNumber, setFilterMobileNumber] = useState("");
  const [searchObj, setSearchObj] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [seletedUser, setSeletedUser] = useState({});

  const partners = useQuery(GET_PARTNER_AND_INSTRUCTOR);

  const getPartnerOptions = () => {
    const options = [
      {
        label: "Select partner",
        value: "",
      },
    ];

    const partersData = partners.data?.courses_partner.map((partner) => {
      return {
        label: partner.name,
        value: partner.id,
      };
    });

    return options.concat(partersData);
  };

  const updateSelectValue = (value) => {
    setPartnerId((prevState) => {
      return value;
    });
  };

  const getSelectedValue = (defaultValue, column_name) => {
    return partners.data?.courses_partner
      .map((partner) => {
        return {
          label: partner.name,
          value: partner.id,
        };
      })
      .filter(({ value }) => value == defaultValue)[0];
  };

  const searchUser = () => {
    const searchObj = {
      type: "email",
    };
    if (filterEmail != "") {
      searchObj["email"] = filterEmail;
      searchObj["type"] = "email";
    }
    if (filterName != "") {
      searchObj["name"] = filterName;
      searchObj["type"] = searchObj["type"] + "_" + "name";
    }
    if (filterMobileNumber != "") {
      searchObj["mobile_number"] = filterMobileNumber;
      searchObj["type"] = searchObj["type"] + "_" + "mobile_number";
    }
    if (partnerId != "") {
      searchObj["partner_id"] = partnerId;
      searchObj["type"] = searchObj["type"] + "_" + "partner_id";
    }

    // console.log("Search obj Partner id : ", partnerId, " Name : ", filterName, " Email", filterEmail)

    setSearchObj((prevState) => {
      return searchObj;
    });
  };

  const handleModalClose = () => {
    setShowUserModal(false);
  };

  // console.log("Partner id : ", partnerId, " Name : ", filterName, " Email", filterEmail)
  const editUser = (user) => {
    setSeletedUser(user);
  };

  useEffect(() => {
    if (seletedUser.id) {
      setShowUserModal(true);
    }
  }, [seletedUser]);

  return (
    <div className="">
      <div className="flex-row">
        <div className="flex-col">
          <div className="flex-row mb-5 w-1/2">
            <div className="flex w-full">
              <div className="flex-1 mx-4">Select Partner</div>
              <div className="flex-1">
                <Select
                  options={getPartnerOptions()}
                  value={getSelectedValue(partnerId)}
                  onChange={(e) => updateSelectValue(e.value)}
                />
              </div>
            </div>
            <div>
              <div className="flex-1 mb-3">
                <Input
                  id="search"
                  type="text"
                  placeholder="Enter Email"
                  aria-label="Search Input"
                  value={filterEmail}
                  onChange={(e) => setFilterEmail(e.target.value)}
                />
              </div>
              <div className="flex-1 mb-3">
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  aria-label="Search Name"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </div>
              <div className="flex-1 mb-3">
                <Input
                  id="mobile_number"
                  type="text"
                  placeholder="Enter Mobile Number"
                  aria-label="Search Mobile Number"
                  value={filterMobileNumber}
                  onChange={(e) => setFilterMobileNumber(e.target.value)}
                />
              </div>
              <div className="flex-1 mx-4">
                <button
                  onClick={() => searchUser()}
                  className="inline-flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-row w-full">
        <UsersTable
          searchObj={searchObj}
          editUser={(userObj) => editUser(userObj)}
        />
      </div>
      <EditUserModel
        show={showUserModal}
        user={seletedUser}
        handleClose={() => handleModalClose()}
      />
    </div>
  );
}

export default ManageUsers;
