import React from "react";
import {
  GET_TOTAL_USERS,
  GET_PARTNER_AND_INSTRUCTOR,
  GET_USERS_PAGINATION,
} from "../../../../GraphQl/Queries/User";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import DataTable from "react-data-table-component";
import FilterComponent from "../../../../components/InputGroup/FilterComponent";
import { useState, useEffect } from "react";
import Select from "react-select";

function UsersTable(props) {
  const [partnerId, setPartnerId] = useState("");
  const handleButtonClick = (e, row) => {
    console.log("clicked : ", row);
    props.editUser(row);
  };

  const columns = [
    {
      name: "User Id",
      selector: (row, index) => `${row.id}`,
      //   sortable: true,
    },
    {
      name: "Name",
      selector: (row, index) => `${row.name}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row, index) => `${row.email}`,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row, index) => `${row.mobile_number}`,
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          className="bg-gray-700 p-2 text-base text-white"
          onClick={(e) => handleButtonClick(e, row)}
        >
          Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const partners = useQuery(GET_PARTNER_AND_INSTRUCTOR);

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const totalUsers = useQuery(GET_TOTAL_USERS);
  const [runQuery, availableUsers] = useLazyQuery(GET_USERS_PAGINATION, {
    fetchPolicy: "network-only", // Doesn't check cache before making a network request
  });

  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    per_page: 100,
  });

  const getUsers = async () => {
    const { page, per_page } = paginationInfo;

    const variables = {
      page: page * per_page,
      per_page: per_page,
    };

    const graphql_exp = {};

    if (props.searchObj.email) {
      graphql_exp.email = { _ilike: `%${props.searchObj.email}%` };
    }
    if (props.searchObj.partner_id) {
      graphql_exp.partner_id = { _eq: `${props.searchObj.partner_id}` };
    }
    if (props.searchObj.name) {
      graphql_exp.name = { _ilike: `%${props.searchObj.name}%` };
    }
    if (props.searchObj.mobile_number) {
      graphql_exp.mobile_number = {
        _ilike: `%${props.searchObj.mobile_number}%`,
      };
    }
    variables.where = graphql_exp;

    console.log("Varilables : ", variables);

    runQuery({
      variables: variables,
    });
  };

  useEffect(() => {
    // getUsers();
    console.log("Fetching Users");
    getUsers();
  }, [paginationInfo]);

  useEffect(() => {
    setPaginationInfo({ ...paginationInfo, page: 0 });
  }, [props.searchObj]);

  const handlePageChange = (page) =>
    setPaginationInfo({ ...paginationInfo, page: page });

  const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({ ...paginationInfo, page: page, per_page: newPerPage });

  const getTotalUsers = () => {
    if (totalUsers.data) {
      return totalUsers.data.courses_users_aggregate.aggregate.count;
    }
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const filteredItems = availableUsers.data?.courses_users.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const getPartnerOptions = () => {
    return partners.data?.courses_partner.map((partner) => {
      return {
        label: partner.name,
        value: partner.id,
      };
    });
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

  return (
    <div>
      <div className="">
        {/* <div className="flex-row mb-5">
                    <div className="flex w-2/3">
                        <div className="flex-1">
                            Select Partner
                        </div>
                        <div className="flex-1">
                            <Select
                                options={getPartnerOptions()}
                                value={getSelectedValue(partnerId)}
                                onChange={(e) => updateSelectValue( e.value)}
                            />
                        </div>
                    </div>
                </div> */}
        <div className="flex-row w-full">
          <DataTable
            columns={columns}
            data={filteredItems}
            progressPending={availableUsers.loading}
            pagination
            paginationServer
            paginationTotalRows={getTotalUsers()}
            // selectableRowsHighlight={true}
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100, 150, 200, 250]}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            paginationResetDefaultPage={resetPaginationToggle}
            persistTableHead
          />
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
