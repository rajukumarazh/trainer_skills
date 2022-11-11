/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import jsonToCsv from "utils/jsontocsv";
import { GET_USER_BY_PARTNER_PROJECT_ID } from "../../../../GraphQl/Queries/Partner";

export default function PartnerModal(props) {
  const [getTableData, { data, loading, error }] = useLazyQuery(
    GET_USER_BY_PARTNER_PROJECT_ID,
    {
      fetchPolicy: "network-only", // Doesn't check cache before making a network request
    }
  );
  const [csvData, setCsvData] = useState("");

  useEffect(() => {
    fetchUserTableData();
  }, [props.selectedProjectRow]);

  useEffect(() => {
    console.log("Data user", data);
    console.log("Data error", error);

    if (data) {
      const convertedCsvData = jsonToCsv(
        data?.courses_partner_project_users,
        columns
      );
      setCsvData(convertedCsvData);
    }
  }, [data, error]);

  const fetchUserTableData = () => {
    getTableData({ variables: { project_id: props.selectedProjectRow } });
  };

  const columns = [
    {
      name: `ID`,
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: `Updated At`,
      selector: (row) => row.updated_at,
      sortable: true,
    },
    {
      name: `Name`,
      selector: (row) => row.user.name,
      sortable: true,
    },
    {
      name: `Mobile Number`,
      selector: (row) => row.user.mobile_number,
      sortable: true,
    },
    {
      name: `Email`,
      selector: (row) => row.user.email,
      sortable: true,
    },
    {
      name: `Date of Birth`,
      selector: (row) => row.user.date_of_birth,
      sortable: true,
    },
    {
      name: `Created At`,
      selector: (row) => row.user.created_at,
      sortable: true,
    },
    {
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <div>
        <Modal
          size="xl"
          show={props.show}
          onHide={() => props.handleClose()}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.selectedProjectRow && (
              <>
                {data?.courses_partner_project_users && (
                  <div className="my-4 px-4">
                    <CSVLink
                      className="no-underline bg-orange p-2 rounded-md text-white my-5"
                      filename="User Details Data Table"
                      data={csvData}
                    >
                      Export CSV
                    </CSVLink>
                  </div>
                )}
                <DataTable
                  columns={columns}
                  data={data?.courses_partner_project_users}
                  pagination
                  progressPending={loading}
                />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
