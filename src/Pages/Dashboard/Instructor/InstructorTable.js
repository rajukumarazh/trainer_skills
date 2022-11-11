import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import Container from "../../../components/Container/Container";
import {useQuery} from "@apollo/client";
import {GET_INSTRUCTORS} from "../../../GraphQl/Queries/Instructor";
import {INSTRCTOR_SCHEMA, INSTRUCTOR_DISPLAY_SCHEMA} from "./DbSchema";

const InstructorTable = ({handleEdit, data, loading, className}) => {
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    per_page: 100,
  });
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    var table_columns = [];
    INSTRUCTOR_DISPLAY_SCHEMA.map(({column_name, label}) =>
      table_columns.push({
        name: label,
        selector: (row, index) => `${row[column_name]}`,
      })
    );
    table_columns.push({
      cell: (row) => (
        <button
          className="bg-gray-700 p-2 text-base text-white"
          onClick={(e) => handleEdit(e, row)}
        >
          Edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
    setColumns(table_columns);
  }, []);
  const handlePageChange = (page) =>
    setPaginationInfo({...paginationInfo, page: page});

  const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({...paginationInfo, page: page, per_page: newPerPage});

  return (
    <DataTable
      className={className}
      columns={columns}
      data={data ? data.courses_instructor : []}
      progressPending={loading}
      pagination
      paginationTotalRows={data ? data.courses_instructor.length : 0}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
};

export default InstructorTable;
