import React, {useEffect, useState} from "react";
import Container from "../../../components/Container/Container";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_INSTRUCTOR_SEARCH} from "../../../GraphQl/Queries/Instructor";
import InstructorTable from "./InstructorTable";
import Input from "../../../components/InputGroup/Input";
import UpdateInstructor from "./UpdateInstructor";
import UpdateInstructorModal from "./UpdateInstructorModal";

const ManageInstructor = () => {
  const [runQuery, {loading, data}] = useLazyQuery(GET_INSTRUCTOR_SEARCH, {
    fetchPolicy: "network-only", // Doesn't check cache before making a network request
  });
  const [search, setSearch] = useState({email: "", name: ""});
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  // useEffect(() => {
  //   SearchUsers();
  // }, [search]);

  useEffect(() => {
    SearchUsers();
  }, []);
  const SearchUsers = (e) => {
    if (e) e.preventDefault();
    var variables = {where: {}};
    if (search.email) variables.where.email = {_ilike: `%${search.email}%`};
    if (search.name) variables.where.name = {_ilike: `%${search.name}%`};
    runQuery({variables: variables});
  };
  const handleEdit = (e, row) => {
    e.preventDefault();
    setEditId(row.id);
    setShowEdit(true);
  };

  return (
    <Container>
      <form className="flex flex-wrap m-2" onSubmit={SearchUsers}>
        <div className={"w-5/12 mx-6"}>
          <Input
            value={search.name}
            onChange={(e) => setSearch({...search, name: e.target.value})}
            type={"text"}
            placeholder={"Enter Instructor's name"}
          />
        </div>
        <div className={"w-5/12"}>
          <Input
            value={search.email}
            onChange={(e) => setSearch({...search, email: e.target.value})}
            type={"text"}
            placeholder={"Enter Instructor's email"}
          />
        </div>
        <button
          type="submit"
          className="m-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange"
        >
          Search
        </button>
      </form>

      <InstructorTable handleEdit={handleEdit} data={data} loading={loading} />

      <UpdateInstructorModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        id={editId}
      />
    </Container>
  );
};

export default ManageInstructor;
