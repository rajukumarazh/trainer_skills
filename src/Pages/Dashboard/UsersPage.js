import React, {useEffect, useState} from "react";
import {fetchUsers, searchUsers} from "../../api/User";
import DataTable from "react-data-table-component";
import NewUserForm from "./components/NewUserForm";
import UserSearch from "./components/UserSearch";

const columns = [
  {
    name: "Name",
    selector: (row, index) =>
      `${row.name && row.name.givenName ? row.name.givenName : ""}
			${row.name && row.name.familyName ? row.name.familyName : ""}`,
    sortable: true,
  },
  {
    name: "UserName",
    selector: (row, index) => row.userName,
  },
  {
    name: "Email",
    selector: (row, index) =>
      row.email
        ? row.emails[0].value
          ? row.emails[0].value
          : row.emails[0]
        : null,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row, index) =>
      row.phoneNumbers
        ? row.phoneNumbers[0]
          ? row.phoneNumbers[0].value
            ? row.phoneNumbers[0].value
            : row.phoneNumbers[0]
          : null
        : null,
    sortable: true,
  },
  {
    name: "Roles",
    selector: (row, index) => row.roles.map(({display}) => display).toString(),
    sortable: true,
  },
];

// const UsersPageExpandable = (item) => {
// 	const keys = Object.keys(item.data);
// 	const values = Object.values(item.data);
// 	var s = '';
// 	for (var i = 0; i < keys.length; i++) {
// 		console.log(keys[i].toString() + ': ');
// 		console.log(
// 			typeof values[i] === 'object'
// 				? JSON.stringify(values[i])
// 				: values[i].toString(),
// 		);
// 	}
// 	return `a`;
// };

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    per_page: 10,
  });

  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const users = await fetchUsers(
      paginationInfo.page,
      paginationInfo.per_page
    );
    if (users) setData(users);
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
    return () => setData([]);
  }, [paginationInfo]);

  const handlePageChange = (page) =>
    setPaginationInfo({...paginationInfo, page: page});

  const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({...paginationInfo, page: page, per_page: newPerPage});

  const onSearchValueChange = async (searchValue) => {
    const searchedUsers = await searchUsers({
      [searchValue.target.id]: searchValue.target.value,
    });
    if (searchedUsers) setData(searchedUsers);
  };

  return (
    <>
      <UserSearch onSearchValueChange={onSearchValueChange} />
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={1000}
        selectableRows
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </>
  );
};

export default UsersPage;
