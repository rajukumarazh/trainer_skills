/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import jsonToCsv from "utils/jsontocsv";
import { CSVLink } from "react-csv";

export default function PartnerDashboardTable(props) {
  const [csvData, setCsvData] = useState("");
  const handleButtonClick = (e, row) => {
    console.log("Clicked : ", row);
    props.setModalOpen(true);
    props.setSelectedProjectRow(row.id);
  };

  useEffect(() => {
    if (props.data) {
      const convertedCsvData = jsonToCsv(
        props.data?.courses_partner_projects,
        columns
      );
      setCsvData(convertedCsvData);
    }
  }, [props.data]);

  const columns = [
    {
      name: `ID`,
      selector: (row) => (row.id ? row.id : "NULL"),
      sortable: true,
    },
    {
      name: `Project Name`,
      selector: (row) => (row.name ? row.name : "NULL"),
      sortable: true,
    },
    {
      name: `Created At`,
      selector: (row) => (row.created_at ? row.created_at : "NULL"),
      sortable: true,
    },
    {
      name: `City`,
      selector: (row) => (row.city ? row.city : "NULL"),
      sortable: true,
    },
    {
      name: `State`,
      selector: (row) => (row.state ? row.state : "NULL"),
      sortable: true,
    },
    {
      name: `Country`,
      selector: (row) => (row.country ? row.country : "NULL"),
      sortable: true,
    },
    {
      name: `Pincode`,
      selector: (row) => (row.pincode ? row.pincode : "NULL"),
      sortable: true,
    },
    {
      name: `Type`,
      selector: (row) => (row.type ? row.type : "NULL"),
      sortable: true,
    },
    {
      name: `Updated At`,
      selector: (row) => (row.updated_at ? row.updated_at : "NULL"),
      sortable: true,
    },
    {
      name: `Project Courses Count`,
      selector: (row) =>
        row.project_course_aggregate?.aggregate?.count
          ? row.project_course_aggregate?.aggregate?.count
          : "NULL",
      sortable: true,
    },
    {
      name: `Project Users Count`,
      selector: (row) =>
        row.project_users_aggregate?.aggregate?.count
          ? row.project_users_aggregate?.aggregate?.count
          : "NULL",
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          className="bg-orange px-4 py-1 rounded-md text-base text-white"
          onClick={(e) => handleButtonClick(e, row)}
        >
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <div className="my-4 px-4">
        {props.data?.courses_partner_projects && (
          <CSVLink
            className="no-underline bg-orange p-2 rounded-md text-white my-5"
            filename="Partner Project Data Table"
            data={csvData}
          >
            Export CSV
          </CSVLink>
        )}
      </div>
      <DataTable
        columns={columns}
        data={props.data?.courses_partner_projects}
        pagination
        progressPending={props.loading}
      />
    </div>
  );
}
