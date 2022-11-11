import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {Link} from "react-router-dom";
import {csvToJson} from "./CsvToJson";
import base64 from "base-64";
import Parse from "papaparse";
import {uploadFile} from "../../../../api/UploadFile";
import {useMutation, useQuery, useLazyQuery} from "@apollo/client";
import {GET_ADMIN_CSV_USER_IMPORTS} from "../../../../GraphQl/Queries/OnboardingUsers";
import {CREATE_COURSES_ADMIN_CSV_USER_IMPORTS} from "../../../../GraphQl/Mutations/OnboardingUsers";
import {getFile} from '../../../../api/UploadFile'

const OnboardingUsers = () => {
  const [runQuery, data] = useLazyQuery(GET_ADMIN_CSV_USER_IMPORTS, {
    fetchPolicy: "network-only", // Doesn't check cache before making a network request
  });
  const [createuserImports, {loading, error, called}] = useMutation(
    CREATE_COURSES_ADMIN_CSV_USER_IMPORTS,
    {refetchQueries: [GET_ADMIN_CSV_USER_IMPORTS]}
  );
  const importColumnsStatusColors = {
    pending: "bg-gray-400",
    running: "bg-orange",
    processed: "bg-green-500",
    failed: "bg-red-500",
  };

  const handleDownload = async (e, row) => {
    console.log(row);
    const url = await getFile(row.file_url);
    window.open(url, '_blank');
  }

  const [importsColumns, setImportsColumns] = useState([
    {
      name: "Id",
      cell: (row, index) => `${row.id}`,
    },
    {
      name: "Created",
      cell: (row, index) => `${row.created}`,
    },
    {
      name: "Duplicate",
      cell: (row, index) => `${row.duplicate}`,
    },
    {
      name: "File url",
      grow: 5,
      cell: (row, index) => row.file_url,
    },
    {
      name: "Partner Id",

      cell: (row, index) => `${row.partner_id}`,
    },
    {
      name: "Status",
      grow: 5,
      cell: (row, index) => (
        <p
          className={`${
            importColumnsStatusColors[row.status] != undefined && "text-white"
          } ${importColumnsStatusColors[row.status]}  rounded p-2 m-1`}
        >
          {row.status}
        </p>
      ),
    },
    {
      name: "Created At",
      grow: 5,
      // style: {wordBreak: "break-all"},
      cell: (row, index) => row.created_at,
    },
    {
      name: "Failed",
      grow: 5,
      cell: (row, index) => `${row.created_at}`,
    },
    {
      name: "Updated",
      cell: (row, index) => `${row.updated}`,
    },
    {
      name:"",
      grow:2.5,
      cell:(row,index)=><button 
        onClick={(e) => handleDownload(e, row)} className='bg-blue-500 text-white p-2 rounded'>Download</button>
    }
  ]);

  const [user, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [csvData, setCsvData] = useState({});
  const [uploadSuccess, setUploadSucess] = useState(false);

  function processCsvData({data = []}) {
    var new_data = [...data];
    var labels = new_data[0];
    new_data = new_data.slice(1, 5);
    changeTable(labels, new_data);
  }
  const changeTable = (labels = [], data = []) => {
    var new_columns = [];
    labels.map((label, index) => {
      new_columns.push({
        name: label,
        cell: (row) => row[index],
        grow: 4,
      });
    });
    setColumns(new_columns);
    setUsers(data);
  };
  const changeFile = async (e) => {
    setUploadSucess(false);
    var file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = function (output) {
      console.log(output);
      //encoding info removed
      let data = output.target.result.split(",")[1];
      //decode into csv

      //set csv data
      setCsvData({
        csv_data: output.target.result,
        csv_name: file.name,
      });

      var decodedString = base64.decode(data);
      Parse.parse(decodedString, {
        complete: processCsvData,
      });
    };
    reader.readAsDataURL(file);
    // reader.readAsDataURL(file.slice(0, 10000000)); //read 10 mb instead of whole file
  };
  const createUsers = async () => {
    console.log("create users api");
    const response = await uploadFile(
      csvData.csv_data,
      csvData.csv_name,
      "usercsv"
    );
    console.log(response);
    createuserImports({
      variables: {status: "pending", file_url: response.data_url},
    });
    if (!loading && !error) setUploadSucess(true);
  };

  useEffect(() => {
    runQuery();
  }, []);

  const refreshUser = () => {
    runQuery();
  };

  return (
    <div className="mx-2.5">
      <div>
        <p className="text-2xl font-medium">
          Download CSV format to bulk onboard
        </p>
        <p>Please keep column names as is</p>
        <a
          href="https://skillstrainer-api.s3.amazonaws.com/user_csv_sheet.csv"
          target={"_blank"}
          className="p-2.5 rounded-lg bg-orange text-white no-underline"
        >
          Download
        </a>
      </div>
      <div className=" mt-5">
        <p className="text-2xl font-medium">Upload Csv</p>
        <input
          type={"file"}
          onInput={changeFile}
          accept=".csv"
          multiple={false}
        />
      </div>
      {user.length > 0 && (
        <div className="flex-row mt-10 w-auto">
          <p className="text-2xl mb-3 font-semibold">Preview</p>
          <DataTable columns={columns} data={user} />
          <button
            onClick={createUsers}
            className="mt-10 p-3 rounded-lg bg-orange text-white no-underline"
          >
            Confirm and Create Users
          </button>
        </div>
      )}

      {uploadSuccess && (
        <div className="mt-7 text-green-700 text-lg">
          Csv successfully uploaded
        </div>
      )}
      <div className="mt-5">
        <button
          onClick={refreshUser}
          className="mt-2 mb-2 p-2 rounded-lg bg-orange text-white no-underline"
        >
          Refresh
        </button>
        <p className="text-3xl font-medium">Status</p>
        <DataTable
          className="min-w-max"
          columns={importsColumns}
          progressPending={data.loading}
          data={!data.loading ? data.data?.courses_admin_csv_user_imports : []}
        />
      </div>
    </div>
  );
};

export default OnboardingUsers;
