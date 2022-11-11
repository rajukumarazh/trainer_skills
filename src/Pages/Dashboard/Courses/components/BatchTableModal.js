import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useState, useEffect, useMemo } from "react";
import Select from "../../../../components/InputGroup/Select";
import { GET_INSTRUCTOR_ID_NAME } from "../../../../GraphQl/Queries/Courses";
import { GET_SLOTS_ROW_DATA_BY_ID } from "../../../../GraphQl/Queries/BatchesQueries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import dateFormat from "dateformat";
import { UPDATE_BATCH_SLOTS_MEETINGLINK_MUTATION } from "../../../../GraphQl/Mutations/BatchesSlots";
import { UPDATE_BATCH_SLOTS_INSTRUCTOR_ID_MUTATION } from "../../../../GraphQl/Mutations/BatchesSlots";
import { GET_SLOTS_BY_BATCH_ID } from "../../../../GraphQl/Queries/BatchesQueries";
import { GET_INSTRUCTORS_BY_ID } from "../../../../GraphQl/Queries/Instructor";
import { GET_UPDATED_SLOTS } from "../../../../GraphQl/Queries/BatchesQueries";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DELETE_BATCH_SLOTS_BY_ROW_ID } from "../../../../GraphQl/Mutations/BatchesSlots";

import { createZoom, updateZoom, deleteZoom } from "../../../../api/Zoom";

import {
  signInToGoogle,
  initClient,
  getSignedInUserEmail,
  signOutFromGoogle,
  publishTheCalenderEvent,
  checkSignInStatus,
  updateTheCalenderEvent,
  deleteTheCalenderEvent,
} from "services/LiveClass/GoogleApi";
import moment from "moment";

import { DISABLE_BATCH_SLOTS } from "../../../../GraphQl/Mutations/BatchesSlots";

function BatchTableModal(props) {
  const instructorIdName = useQuery(GET_INSTRUCTOR_ID_NAME);
  const [instructorOptions, setInstructors] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState();
  const [search, { loading, error, data }] = useLazyQuery(
    GET_SLOTS_ROW_DATA_BY_ID
  );
  const [searchInstructor, dataInstructor] = useLazyQuery(
    GET_INSTRUCTORS_BY_ID
  );
  const [inputText, setInputText] = useState("");
  const [selectedCount, setSelectedCount] = useState("");

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [fromDate, setFrom] = useState();

  const [deleteRow, setDeleteRow] = useMutation(DELETE_BATCH_SLOTS_BY_ROW_ID, {
    refetchQueries: [GET_SLOTS_BY_BATCH_ID],
  });

  const [allupdate, setSelected] = useState();
  const [update_batch_slots_meeting_link] = useMutation(
    UPDATE_BATCH_SLOTS_MEETINGLINK_MUTATION,
    {
      refetchQueries: [GET_SLOTS_BY_BATCH_ID],
    }
  );

  const [disable_batch_slots] = useMutation(DISABLE_BATCH_SLOTS, {
    refetchQueries: [GET_SLOTS_BY_BATCH_ID],
  });

  const generateLink = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("id");
    search({ variables: { id: id } });
    const CurrentInstId = e.target.getAttribute("attr");

    searchInstructor({
      variables: {
        id: CurrentInstId,
      },
    });
  };

  const [course, setCourse] = useState({});

  const onDelete = async ({ id, event_id, platform }) => {
    //console.log("Delete Data: id:", id, " Event_id: ", event_id , "Platform:", platform)
    if (event_id) {
      if (platform == "hangoutsMeet") {
        var googleResponse = "";
        let stat = await checkSignInStatus();
        if (stat) {
          googleResponse = await deleteTheCalenderEvent(event_id);
        } else {
          let signInGoogle = await signInToGoogle();
          if (signInGoogle) {
            googleResponse = await deleteTheCalenderEvent(event_id);
          }
        }

        console.log("resourcee", googleResponse);

        if (googleResponse.status == 204 || googleResponse.status == 410) {
          disable_batch_slots({
            variables: {
              id: id,
              enable_slots: false,
            },
          });
        }
      } else {
        const zoomDel = async () => {
          const deleteResult = await deleteZoom({ event_id });

          if (deleteResult.data == 204) {
            console.log("Zoom meet deleted");
            deleteRow({
              variables: {
                id: id,
              },
            });
          }
          return deleteResult;
        };
        zoomDel();
      }
    } else {
      disable_batch_slots({
        variables: {
          id: id,
          enable_slots: false,
        },
      });
    }
  };

  const onEdit = ({ id }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
  };

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");

    const value = e.target.value;
    const update = {};
    update[key] = value;

    setCourse((prevState) => {
      const courseObj = {
        ...prevState,
        update,
      };

      courseObj[key] = value;

      return courseObj;
    });

    e.preventDefault();
  };

  const updateAll = (e) => {
    e.preventDefault();

    allupdate.map((batch) => {
      console.log(
        "Batch Name:",
        batch.Course_batch_slots.batch_name,
        "start Date: ",
        batch.slot_date,

        " End Date:",
        batch.endto_date,
        "Instructor details:",
        batch.Course_batch_slots.Batch_Instructor.email
      );
    });
  };

  const handleFromdate = (date, name, id) => {
    setFrom(date);
    const key = name + id;
    const value = date;
    const update = {};
    update[key] = value;

    setInputText((prevState) => {
      const courseObj = {
        ...prevState,
        update,
      };

      courseObj[key] = value;

      return courseObj;
    });
  };

  const updateTimeValue = (e) => {
    const key =
      e.target.getAttribute("data-key") + e.target.getAttribute("data-row");

    const value = e.target.value;
    const update = {};
    update[key] = value;

    setInputText((prevState) => {
      const courseObj = {
        ...prevState,
        update,
      };

      courseObj[key] = value;

      return courseObj;
    });

    e.preventDefault();
  };

  const updateTextValue = (e) => {
    const key = e.target.getAttribute("data-text");

    const value = e.target.value;
    const update = {};
    update[key] = value;

    setInputText((prevState) => {
      const courseObj = {
        ...prevState,
        update,
      };

      courseObj[key] = value;

      return courseObj;
    });

    e.preventDefault();
  };

  useEffect(() => {
    initClient((success) => {
      if (success) {
        getGoogleAuthorizedEmail();
      }
    });
  }, []);

  const getGoogleAuthorizedEmail = async () => {
    let email = await checkSignInStatus();
    if (email) {
      console.log("Status", email);
    }
  };

  useEffect(() => {
    if (data && dataInstructor.data) {
      var dataValue = [];
      dataValue["batch_name"] =
        data.courses_batch_slots[0].Course_batch_slots.batch_name;
      dataValue["platform"] = data.courses_batch_slots[0].platform;
      dataValue["slot_date"] = data.courses_batch_slots[0].slot_date;
      dataValue["endtotime"] = data.courses_batch_slots[0].endto_date;
      dataValue["id"] = data.courses_batch_slots[0].id;
      dataValue["event_id"] = data.courses_batch_slots[0].event_id;
      dataValue["meeting_link"] = data.courses_batch_slots[0].meeting_link;

      console.log(
        "start Date",
        inputText["meeting_date" + dataValue["id"]]
          ? inputText["meeting_date" + dataValue["id"]]
          : dataValue["slot_date"],
        "time",
        inputText["from_time" + dataValue["id"]]
      );

      /*  Start Date **/
      const startDate = inputText["meeting_date" + dataValue["id"]]
        ? inputText["meeting_date" + dataValue["id"]]
        : new Date(dataValue["slot_date"]);
      var fromString =
        new Date(dataValue["slot_date"]).getHours() +
        ":" +
        new Date(dataValue["slot_date"]).getMinutes() +
        ":00";
      var fromStringTo = inputText["from_time" + dataValue["id"]]
        ? inputText["from_time" + dataValue["id"]]
        : fromString;

      const year = startDate.getFullYear();
      const month = startDate.getMonth() + 1;
      const day = startDate.getDate();
      const dateString = "" + year + "-" + month + "-" + day;
      const startcombined = new Date(dateString + " " + fromStringTo);

      dataValue["startcombined"] = startcombined;

      /****End Date  ***/

      const endDate = inputText["meeting_date" + dataValue["id"]]
        ? inputText["meeting_date" + dataValue["id"]]
        : new Date(dataValue["endtotime"]);
      var toString =
        new Date(dataValue["endtotime"]).getHours() +
        ":" +
        new Date(dataValue["endtotime"]).getMinutes() +
        ":00";
      var toStringTo = inputText["to_time" + dataValue["id"]]
        ? inputText["to_time" + dataValue["id"]]
        : toString;

      const yearend = endDate.getFullYear();
      const monthend = endDate.getMonth() + 1;
      const dayend = endDate.getDate();
      const dateStringendDate = "" + yearend + "-" + monthend + "-" + dayend;
      const endcombined = new Date(dateStringendDate + " " + toStringTo);

      dataValue["endcombined"] = endcombined;

      dataValue["instructor_id"] = dataInstructor.data.courses_instructor[0].id;
      dataValue["instructor_email"] =
        dataInstructor.data.courses_instructor[0].email;
      const meetingAttendees = [
        {
          displayName: dataInstructor.data.courses_instructor[0].name,
          email: dataInstructor.data.courses_instructor[0].email,
          responseStatus: "needsAction",
        },
      ];

      dataValue["meetingAttendees"] = meetingAttendees;

      if (
        !inputText[dataValue["id"]] ||
        (inputText[dataValue["id"]] == dataValue["meeting_link"] &&
          dataValue["event_id"])
      ) {
        if (dataValue["platform"] == "hangoutsMeet") {
          console.log("gogole");
          GoogleMeet(dataValue);
        } else {
          ZoomMeet(dataValue);
        }
      } else {
        update_batch_slots_meeting_link({
          variables: {
            id: dataValue["id"],
            meeting_link: inputText[dataValue["id"]],
            instructor_id: dataInstructor.data.courses_instructor[0].id,
            slot_date: startcombined,
            endto_date: endcombined,
            event_id: "",
          },
        });

        setInEditMode({
          status: false,
          rowKey: null,
        });
      }
    }
  }, [data, dataInstructor.data]);

  function ZoomMeet(dataValue) {
    console.log("zoom dat", dataValue);

    //var stDate=  dateFormat (dataValue.startcombined.toISOString(),"yyyy-MM-ddTHH:mm:ss")
    var zoomstartTime = new Date(dataValue.startcombined);
    var zoomendTime = new Date(dataValue.endcombined);
    var difference = zoomendTime.getTime() - zoomstartTime.getTime(); // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);
    const article = {
      topic: dataValue.batch_name,
      type: "2",
      start_time: dataValue.startcombined,
      duration: resultInMinutes,
      instructor_email: dataValue.instructor_email,
      event_id: dataValue.event_id,
    };

    console.log("zooom Data", article);

    const response = async () => {
      if (dataValue.event_id) {
        const result = await updateZoom(article);

        if (result.data == 204) {
          console.log("Zoom Update Status", result.data);
          update_batch_slots_meeting_link({
            variables: {
              id: dataValue.id,
              meeting_link: dataValue.meet_link,
              instructor_id: dataValue.instructor_id,
              slot_date: dataValue.startcombined,
              endto_date: dataValue.endcombined,
              event_id: dataValue.event_id,
            },
          });

          return result;
        } else {
          alert("Something will be wrong please try again");
        }
      } else {
        const result = await createZoom(article);
        console.log("Status: ", result.data);
        update_batch_slots_meeting_link({
          variables: {
            id: dataValue.id,
            meeting_link: result.data.join_url,
            instructor_id: dataValue.instructor_id,
            slot_date: dataValue.startcombined,
            endto_date: dataValue.endcombined,
            event_id: result.data.id.toString(),
          },
        });

        return result.data.id;
      }
    };
    setInEditMode({
      status: false,
      rowKey: null,
    });
    response();
  }

  const GoogleMeet = async (dataValue) => {
    var googleResponse = "";
    let stat = await checkSignInStatus();
    if (stat) {
      googleResponse = await updateTheCalenderEvent(dataValue);
    } else {
      let signInGoogle = await signInToGoogle();
      if (signInGoogle) {
        googleResponse = await updateTheCalenderEvent(dataValue);
      }
    }

    console.log("resourcee", googleResponse);

    update_batch_slots_meeting_link({
      variables: {
        id: dataValue.id,
        meeting_link: googleResponse.result.hangoutLink,
        instructor_id: dataValue.instructor_id,
        slot_date: dataValue.startcombined,
        endto_date: dataValue.endcombined,
        event_id: googleResponse.result.id,
      },
    });

    setInEditMode({
      status: false,
      rowKey: null,
    });
  };

  useEffect(() => {
    if (instructorIdName.data && instructorIdName.data.courses_instructor) {
      const instructorOptions = instructorIdName.data.courses_instructor.map(
        (inst, i) => {
          return { value: inst.id, label: inst.name + " - " + inst.email };
        }
      );

      setInstructors(instructorOptions);
    }
  }, [instructorIdName.data]);

  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    per_page: 10,
  });

  const dayNames = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  const columns = [
    {
      name: "Batch Name",
      selector: (row, index) => `${row.Course_batch_slots.batch_name}`,
      sortable: true,
    },

    {
      name: "Course Name",
      selector: (row, index) => `${row.Course_batch_slots.Courses.full_name}`,
      sortable: true,
    },

    {
      name: "Slot Date",
      selector: (row, index) =>
        inEditMode.status && inEditMode.rowKey === row.id ? (
          <DatePicker
            selected={
              inputText["meeting_date" + row.id]
                ? inputText["meeting_date" + row.id]
                : new Date(row.slot_date)
            }
            placeholderText="MM-dd-yyyy"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            name="meeting_date"
            onChange={(date) => handleFromdate(date, "meeting_date", row.id)}
          />
        ) : (
          `${
            dateFormat(row.slot_date, "yyyy-mm-dd ") +
            " (" +
            dayNames[new Date(row.slot_date).getDay()] +
            ")"
          }`
        ),
      sortable: true,
    },

    {
      name: "Slot Time",
      selector: (row, index) =>
        inEditMode.status && inEditMode.rowKey === row.id ? (
          <>
            {console.log(
              "  new Date(row.slot_date).getHours())",
              moment(row.slot_date).format("HH:mm")
            )}
            <input
              value={
                inputText["from_time" + row.id]
                  ? inputText["from_time" + row.id]
                  : moment(row.slot_date).format("HH:mm")
              }
              type="time"
              name="from_time"
              min="06:00"
              data-row={row.id}
              data-key="from_time"
              className="bg-gray-100 text-base text-black w-100 rounded-md"
              onChange={(e) => updateTimeValue(e)}
            />{" "}
            <p> to </p>
            <input
              value={
                inputText["to_time" + row.id]
                  ? inputText["to_time" + row.id]
                  : moment(row.endto_date).format("HH:mm")
              }
              type="time"
              name="to_time"
              data-row={row.id}
              data-key="to_time"
              className="bg-gray-100 text-base text-black w-100 rounded-md"
              onChange={(e) => updateTimeValue(e)}
            />
          </>
        ) : (
          `${
            new Date(row.slot_date).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
              hour: "numeric",
              minute: "numeric",
            }) +
            " to " +
            new Date(row.endto_date).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
              hour: "numeric",
              minute: "numeric",
            })
          }`
        ),
      sortable: true,
    },

    {
      name: "Instructor",
      sortable: false,

      cell: (row) => (
        <Select
          options={instructorOptions}
          valueField={"value"}
          date-refer={row.id}
          displayField={"label"}
          data-key={row.id}
          onChange={(e) => updateValue(e)}
          value={course[row.id] ? course[row.id] : row.instructor_id}
        />
      ),
    },

    {
      name: "Meeting Links",
      cell: (row) =>
        inEditMode.status && inEditMode.rowKey === row.id ? (
          <input
            type="text"
            name="meeting_link"
            className="bg-gray-100 text-base text-black w-100 rounded-md"
            attr={inputText[row.id]}
            data-text={row.id}
            value={
              inputText[row.id]
                ? inputText[row.id]
                : row.meeting_link
                ? row.meeting_link
                : ""
            }
            onChange={(e) => updateTextValue(e)}
          />
        ) : row.meeting_link ? (
          row.meeting_link
        ) : (
          "---"
        ),

      ignoreRowClick: true,
      allowOverflow: true,
    },
    {
      name: " Action ",
      cell: (row) =>
        inEditMode.status && inEditMode.rowKey === row.id ? (
          <button
            className="bg-gray-700 p-2 text-base text-white"
            attr={
              course[row.id]
                ? course[row.id]
                : row.Course_batch_slots.Batch_Instructor.id
            }
            id={row.id}
            onClick={generateLink}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-gray-700 p-2 text-base text-white"
            attr={course[row.id]}
            id={row.id}
            data-key={row.meeting_link}
            onClick={() => onEdit({ id: row.id })}
          >
            Edit
          </button>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },

    {
      cell: (row) =>
        inEditMode.status && inEditMode.rowKey === row.id ? (
          <button
            className="bg-gray-700 p-2 text-base text-white"
            onClick={() => {
              setInEditMode({
                status: false,
                rowKey: null,
              });
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            className="bg-gray-700 p-2 text-base text-white"
            onClick={() => {
              const confirmBox = window.confirm(
                "Do you really want to delete this slot?"
              );
              if (confirmBox === true) {
                onDelete({
                  id: row.id,
                  event_id: row.event_id,
                  platform: row.platform,
                });
              }
            }}
          >
            Delete
          </button>
        ),

      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleRowSelection = (allSelected, selectedRows) => {
    const courseids = selectedRows.map((course) => course.meeting_link);

    setSelectedCount(courseids.length);

    console.log("Total selected", selectedCount);

    setSelected(selectedRows);
    console.log("Course ids : ", selectedRows);

    // props.updateCourseSelection(courseids, true);
  };
  const handlePageChange = (page) =>
    setPaginationInfo({ ...paginationInfo, page: page });

  const handlePerRowsChange = async (newPerPage, page) =>
    setPaginationInfo({ ...paginationInfo, page: page, per_page: newPerPage });

  //const rowSelectCritera = row => props.courses.indexOf(parseInt(row.id)) > -1;

  return (
    <div>
      <DataTable
        columns={columns}
        pagination
        data-key={columns}
        data={props.batchslots.courses_batch_slots}
        paginationTotalRows={20}
        selectableRows={false}
        selectableRowsHighlight={false}
        selectableRows
        selectableRowsHighlight={false}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        // onSelectedRowsChange={({
        //   allSelected,
        //   selectedCount,
        //   selectedRows,
        // }) => {
        //   handleRowSelection(allSelected, selectedRows);
        // }}
      />
    </div>
  );
}

export default BatchTableModal;
