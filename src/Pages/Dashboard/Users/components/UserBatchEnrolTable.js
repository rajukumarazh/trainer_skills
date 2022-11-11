import React from "react";
import {
  GET_TOTAL_USERS,
  GET_PARTNER_AND_INSTRUCTOR,
  GET_USERS_PAGINATION,
} from "../../../../GraphQl/Queries/User";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { COURSES_QUERY } from "GraphQl/Queries/Courses";
import liveClassService from "services/LiveClass/LiveClass";
import { CREATE_USER_BATCH_ENROL_MUTATION } from "GraphQl/Mutations/BatchesSlots";
import Select from "components/InputGroup/Select";
import { BATCH_ENROL_USER_SCHEMA } from "../BatchEnrolDbSchema";

function UserBatchEnrolTable(props) {
  console.log("props", props);

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
  ];

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

    if (props.searchby == "email") {
      graphql_exp.email = { _ilike: `%${props.searchObj}%` };
    }

    if (props.searchby == "name") {
      graphql_exp.name = { _ilike: `%${props.searchObj}%` };
    }
    if (props.searchby == "mobile number") {
      graphql_exp.mobile_number = {
        _ilike: `%${props.searchObj}%`,
      };
    }

    if (props.searchObj.length > 0) {
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
    if (props.searchObj) {
      setPaginationInfo({ ...paginationInfo, page: 0 });
    }
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

  const filteredItems = availableUsers.data?.courses_users.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  console.log("filteredItems", filteredItems);

  return (
    <div>
      <div className="">
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
            expandableRows={true}
            expandableRowsComponent={ExpandedComponent}
            paginationResetDefaultPage={resetPaginationToggle}
            persistTableHead
          />
        </div>
      </div>
    </div>
  );
}

function ExpandedComponent(props) {
  const [insertUserBatchEnrol, mutationEnrol] = useMutation(
    CREATE_USER_BATCH_ENROL_MUTATION
  );
  const [courseOptions, setCourses] = useState([]);
  const [batch, setBatch] = useState([]);
  const [user, setUser] = useState([]);

  const courses = useQuery(COURSES_QUERY);

  useEffect(() => {
    console.log("Courses : ", courses);

    if (courses.data && courses.data.courses_course) {
      const courseOptions = courses.data.courses_course.map((course, i) => {
        return { value: course.id, label: course.full_name };
      });

      setCourses(courseOptions);
    }
  }, [courses.data]);

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

  const updateUser = (e) => {
    e.preventDefault();

    var arr = [];
    arr["batch_id"] = user.batch_id;
    arr["course_id"] = user.course_id;
    arr["user_id"] = props.data.id;
    arr["batch_enrol_date"] = new Date();
    arr["enrol_by"] = "admin";

    insertUserBatchEnrol({ variables: arr });
    //update_user({ variables: user });
  };
  return (
    <div className="bg-gray w-full p-10">
      <form onSubmit={updateUser} className="flex flex-wrap">
        {BATCH_ENROL_USER_SCHEMA.map((field) => {
          return (
            <div className="w-full" key={field.label}>
              {field.type == "selector" && (
                <Select
                  label={field.label}
                  options={
                    field.column_name == "course_id"
                      ? courseOptions
                      : field.column_name == "batch_id"
                      ? batch
                      : []
                  }
                  value={user[field.column_name]}
                  valueField={"value"}
                  displayField={"label"}
                  data-key={field.column_name}
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
        {mutationEnrol.data && (
          <div className="mt-1">
            <div className="text-lg text-green-800">
              user successfully Enrolled
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default UserBatchEnrolTable;
