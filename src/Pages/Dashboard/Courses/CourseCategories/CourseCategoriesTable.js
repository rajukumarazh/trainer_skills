import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";

function CourseCategoriesTable({
  updateCourseCategories,
  courseCategories,
  className,
}) {
  const handleButtonClick = (e, row) => {
    updateCourseCategories(row);
  };

  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    per_page: 10,
  });

  const columns = [
    {
      name: "Name",
      selector: (row, index) => `${row.name}`,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row, index) => `${row.description}`,
      sortable: true,
    },
    {
      name: "Visible",
      selector: (row, index) => `${row.visible}`,
      sortable: true,
    },
    {
      name: "Image URL",
      selector: (row, index) => `${row.image_url || ""}`,
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

  const handlePageChange = (page) =>
    setPaginationInfo({ ...paginationInfo, page: page });

  const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({ ...paginationInfo, page: page, per_page: newPerPage });

  //console.log('Course criteris ', props.courseCriterias);

  return (
    <div className={className}>
      <DataTable
        columns={columns}
        pagination
        data={courseCategories.data?.courses_course_categories}
        progressPending={courseCategories.loading}
        paginationTotalRows={20}
        selectableRows={false}
        selectableRowsHighlight={false}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
}

export default CourseCategoriesTable;
