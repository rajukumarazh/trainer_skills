import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { USER_SCHEMA_DISPLAY } from "./DbSchema";
// import Table from "../../../components/Table/Table";

import UserBatchEnrolTable from "./components/UserBatchEnrolTable";
import Input from "../../../components/InputGroup/Input";
import {
  GET_TOTAL_USERS,
  GET_PARTNER_AND_INSTRUCTOR,
  GET_USERS_PAGINATION,
} from "../../../GraphQl/Queries/User";
import Select from "components/InputGroup/Select";
import BatchEnrolUser from "./BatchEnrolUser";

function ManageUsers() {
  const [partnerId, setPartnerId] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterMobileNumber, setFilterMobileNumber] = useState("");
  const [searchObj, setSearchObj] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [seletedUser, setSeletedUser] = useState({});

  const partners = useQuery(GET_PARTNER_AND_INSTRUCTOR);
  const [searchPlaceHolder, setPlaceHolder] = useState("Search by name");

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

  const [searchText, setsearchText] = useState("");

  const getItems = useCallback(() => {
    return searchText;
  }, [searchText]);

  const searchby = [
    { value: "email", label: "Email" },
    { value: "name", label: "Name" },
    { value: "mobile number", label: "Mobile No." },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const handler = (event) => {
    const value = event.target.value;
    if (value == "email") {
      setPlaceHolder("Search by email");
    } else if (value == "name") {
      setPlaceHolder("Search by name");
    } else if (value == "mobile number") {
      setPlaceHolder("Search by Mobile");
    } else {
      setPlaceHolder("Search by name");
    }

    setSelectedOption(value);
  };

  
  return (
    <div className="">
      <div className="flex-row w-full">
        <div class="grid grid-cols-2 gap-10">
          <div className="flex pb-8">
            <Input
              type="text"
              name="search"
              value={searchText}
              onChange={(e) => setsearchText(e.target.value)}
              placeholder={searchPlaceHolder}
            />

            
          </div>

          <div>
            <Select
              label="Search filter"
              options={searchby}
              value={selectedOption}
              onChange={handler}
              valueField={"value"}
              displayField={"label"}
            />
          </div>
        </div>

        <UserBatchEnrolTable
          searchObj={searchText}
          editUser={(userObj) => editUser(userObj)}
          searchby={selectedOption ? selectedOption : "name"}
        />
      </div>
      <BatchEnrolUser
        show={showUserModal}
        user={seletedUser}
        handleClose={() => handleModalClose()}
      />
    </div>
  );
}

export default ManageUsers;
