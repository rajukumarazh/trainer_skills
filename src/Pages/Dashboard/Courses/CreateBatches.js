import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import ReactMultiSelectCheckboxes from "react-select";
import ReactDOM from "react-dom";
import dateFormat from "dateformat";
import DateTime from "../../../components/InputGroup/DateTime";
import {
  COURSES_QUERY,
  GET_INSTRUCTOR_ID_NAME,
} from "../../../GraphQl/Queries/Courses";

import { GET_PARTNERS } from "../../../GraphQl/Queries/Partner";

import { CREATE_COURSE_BATCHES_MUTATION } from "../../../GraphQl/Mutations/Courses";
import { CREATE_COURSE_BATCHES_SLOTS_MUTATION } from "../../../GraphQl/Mutations/BatchesSlots";
import { batchFields } from "./DbScchemas";
import Container from "../../../components/Container/Container";
import Checkbox from "../../../components/InputGroup/Checkbox";
import TextArea from "../../../components/InputGroup/TextArea";
import Input from "../../../components/InputGroup/Input";
import Select from "../../../components/InputGroup/Select";
import queryString from "query-string";
import { useLocation } from "react-router";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import MultiSelect from "../../../components/InputGroup/MultiSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import BatchesData from "./components/BatchesData";
import { GET_BATCH_DETAILS } from "../../../GraphQl/Queries/BatchesQueries";
import { AddSoltsBatch } from "./AddSoltsBatch";
import { GET_INSTRUCTORS_BY_ID } from "../../../GraphQl/Queries/Instructor";
import liveClassService from "services/LiveClass/LiveClass";
import { GET_PARTNER_PROJECT } from "../../../GraphQl/Queries/Instructor";
import {
  signInToGoogle,
  initClient,
  getSignedInUserEmail,
  signOutFromGoogle,
  publishTheCalenderEvent,
  checkSignInStatus,
} from "services/LiveClass/GoogleApi";

import axios from "axios";

function CreateBatches() {
  const [searchInstructor, dataInstructor] = useLazyQuery(
    GET_INSTRUCTORS_BY_ID
  );
  const courses = useQuery(COURSES_QUERY);
  const [courseOptions, setCourses] = useState([]);
  const instructorIdName = useQuery(GET_INSTRUCTOR_ID_NAME);
  const batchesDataQuery = useQuery(GET_BATCH_DETAILS);
  const partnersDetails = useQuery(GET_PARTNERS);
  const [partnerOption, setPartners] = useState([]);
  const [partnerProjectOption, setPartnerProject] = useState([]);
  const [instructorOptions, setInstructors] = useState([]);
  const [instructorDetails, setinstructorDetails] = useState({
    name: null,
    email: null,
  });

  const [runPartnerQuery, availablePartnerProject] = useLazyQuery(
    GET_PARTNER_PROJECT,
    {
      fetchPolicy: "network-only", // Doesn't check cache before making a network request
    }
  );

  const [insert_course_batches, mutatioData] = useMutation(
    CREATE_COURSE_BATCHES_MUTATION,
    {
      refetchQueries: [GET_BATCH_DETAILS],
    }
  );

  const [insert_course_batches_slots, { mutationError }] = useMutation(
    CREATE_COURSE_BATCHES_SLOTS_MUTATION
  );

  const [slots, setBatchSlots] = useState();

  const [course, setCourse] = useState({});

  const updateValue = (e) => {
    const key = e.target.getAttribute("data-key");
    const value = e.target.value;
    e.preventDefault();
    if (key == "instructor_id") {
      searchInstructor({
        variables: {
          id: value,
        },
      });
    }

    if (key == "partner_id") {
      runPartnerQuery({
        variables: {
          id: value,
        },
      });
    }

    course[key] = value;
    setCourse(course);
  };

  useEffect(() => {
    if (
      availablePartnerProject.data &&
      availablePartnerProject.data.courses_partner_projects
    ) {
      const partnerProjectOption =
        availablePartnerProject.data.courses_partner_projects.map((part, i) => {
          return { value: part.id, label: part.name };
        });

      setPartnerProject(partnerProjectOption);
    }
  }, [availablePartnerProject.data]);

  //console.log("partnerProjectOption",availablePartnerProject)

  useEffect(() => {
    initClient((success) => {
      if (success) {
        getGoogleAuthorizedEmail();
      }
    });
  }, []);

  const getGoogleAuthorizedEmail = async () => {
    let email = await getSignedInUserEmail();
    if (email) {
      console.log("Loggin email", email);
    }
  };

  const [repeatEnd, setEndDate] = useState();

  const [fromDate, setFrom] = useState();

  const [fromTo, setTo] = useState();

  const [repeat, setRepeat] = useState(false);

  const [partner, setPartnerEnable] = useState(false);

  const handleCheckboxChecked = () => {
    {
      repeat == false ? setRepeat(true) : setRepeat(false);
    }
  };

  const handlePartnerChecked = () => {
    {
      partner == false ? setPartnerEnable(true) : setPartnerEnable(false);
    }
  };

  const handleEnddate = (date, name) => {
    setEndDate(date);
    const key = name;
    const value = date;
    course[key] = value;
    setCourse(course);
  };

  const handleFromdate = (date, name) => {
    setFrom(date);
    const key = name;
    const value = date;
    course[key] = value;
    setCourse(course);
    handleTodate(new Date(date.getTime() + 30 * 60000), "to_time");
  };

  const handleTodate = (date, name) => {
    setTo(date);
    const key = name;
    const value = date;
    course[key] = value;
    setCourse(course);
  };

  const [selectedValue, setSelectedValue] = useState([]);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  useEffect(() => {
    var arr = [];

    if (slots) {
      if (mutatioData.data) {
        slots.result.items.map((emp) => {
          arr["slot_date"] = emp.start.dateTime;
          arr["endto_date"] = emp.end.dateTime;
          arr["platform"] = course.platform;
          arr["slots_days"] = course.slots_days;
          arr["instructor_id"] = course.instructor_id;
          arr["batch_id"] = mutatioData.data
            ? mutatioData.data.insert_courses_course_batches_one.id
            : "";
          arr["meeting_link"] = emp.hangoutLink;
          arr["event_id"] = emp.id;

          console.log("arr", arr);

          insert_course_batches_slots({ variables: arr });
        });
      }
    }
  }, [mutatioData.data]);

  useEffect(() => {
    if (dataInstructor.data) {
      setinstructorDetails({
        name: dataInstructor.data.courses_instructor[0].name,
        email: dataInstructor.data.courses_instructor[0].email,
      });
    }
  }, [dataInstructor.data]);

  const submitCourse = async (e) => {
    e.preventDefault();
    course["identifier"] = course.batch_name.toLowerCase().replaceAll(" ", "-");

    //  const datesRecurring = liveClassService.datesRecurring(
    //   new Date(course.from_time),
    //   new Date(course.repeat_end_time),
    //   new Date(course.to_time),
    //   course["slots_days"]
    // );

    console.log("batches data", course);

    const slots = [
      { value: "0", label: "SU" },
      { value: "1", label: "MO" },
      { value: "2", label: "TU" },
      { value: "3", label: "WE" },
      { value: "4", label: "TH" },
      { value: "5", label: "FR" },
      { value: "6", label: "SA" },
    ];

    const uniqueResultArrayObjOne = slots.filter(function (objOne) {
      return selectedValue.some(function (objTwo) {
        return objOne.value == objTwo;
      });
    });

    const days = [];

    uniqueResultArrayObjOne.map((e) => {
      days.push(e.label);
    });

    course["slots_days"] = days.join();

    const meetingAttendees = [
      {
        displayName: instructorDetails.name,
        email: instructorDetails.email,
        responseStatus: "needsAction",
      },
    ];

    course["meetingAttendees"] = meetingAttendees;

    // //setBatchSlots(datesRecurring);

    console.log("Data Batch");

    let stat = await checkSignInStatus();

    if (stat) {
      let resource = await publishTheCalenderEvent(course);

      console.log("resource", resource);
      insert_course_batches({ variables: course });
      setBatchSlots(resource);
    } else {
      let signInGoogle = await signInToGoogle();

      if (signInGoogle) {
        let resource = await publishTheCalenderEvent(course);
        insert_course_batches({ variables: course });

        console.log("resourcee", resource);
        setBatchSlots(resource);
      }
    }
  };

  useEffect(() => {
    console.log("Courses : ", courses);

    if (courses.data && courses.data.courses_course) {
      const courseOptions = courses.data.courses_course.map((course, i) => {
        return { value: course.id, label: course.full_name };
      });

      setCourses(courseOptions);
    }
  }, [courses.data]);

  const location = useLocation();
  const params = queryString.parse(location.search);
  console.log("Params : ", params);

  /******Set or Get Instructor name and id */
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

  // console.log("Instructot options :", instructorOptions);

  /********End***** */

  /******Partner Details**** */

  useEffect(() => {
    if (partnersDetails.data && partnersDetails.data.courses_partner) {
      const partnerOption = partnersDetails.data.courses_partner.map(
        (part, i) => {
          return { value: part.id, label: part.name };
        }
      );

      setPartners(partnerOption);
    }
  }, [partnersDetails.data]);

  const daysOptions = [
    { value: "0", label: "Sunday" },
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thrusday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
  ];

  const platform = [
    { value: "hangoutsMeet", label: "Google Meet" },
    { value: "zoomMeet", label: "Zoom Meet" },
  ];
  const filterPassedTime = (time, name) => {
    //console.log("name",name)

    const currentDate =
      name == "to_time" && fromDate ? new Date(fromDate) : new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <Container title={"Create Course"}>
      <form onSubmit={submitCourse} className="">
        {Object.keys(batchFields).map((course_key) => {
          return (
            <div className="flex flex-wrap">
              {batchFields[course_key].map((course) => {
                return (
                  <div className="w-1/2 p-1">
                    {["text", "date", "password", "number"].includes(
                      course.type
                    ) && (
                      <Input
                        label={course.label}
                        type={course.type}
                        data-key={course.column_name}
                        onChange={(e) => updateValue(e)}
                      />
                    )}
                    {course.type == "text_area" && (
                      <TextArea
                        label={course.label}
                        data-key={course.column_name}
                        onChange={(e) => updateValue(e)}
                        rows="5"
                        cols="30"
                        type="text"
                      />
                    )}
                    {course.type == "checkbox" &&
                      course.column_name == "repeat" && (
                        <Checkbox
                          label={course.label}
                          type="checkbox"
                          data-key={course.column_name}
                          onChange={
                            course.column_name == "repeat"
                              ? handleCheckboxChecked
                              : []
                          }
                        />
                      )}

                    {course.type == "checkbox" &&
                      course.column_name == "enable_partner" && (
                        <Checkbox
                          label={course.label}
                          type="checkbox"
                          data-key={course.column_name}
                          onChange={
                            course.column_name == "enable_partner"
                              ? handlePartnerChecked
                              : []
                          }
                        />
                      )}

                    {course.type == "selector" && (
                      <Select
                        label={course.label}
                        options={
                          course.column_name == "instructor_id"
                            ? instructorOptions
                            : course.column_name == "course_id"
                            ? courseOptions
                            : []
                        }
                        valueField={"value"}
                        displayField={"label"}
                        data-key={course.column_name}
                        onChange={(e) => updateValue(e)}
                      />
                    )}

                    {partner
                      ? course.type == "partnerselector" && (
                          <Select
                            label={course.label}
                            options={
                              course.column_name == "partner_id"
                                ? partnerOption
                                : course.column_name == "project_id"
                                ? partnerProjectOption
                                : []
                            }
                            valueField={"value"}
                            displayField={"label"}
                            data-key={course.column_name}
                            onChange={(e) => updateValue(e)}
                          />
                        )
                      : ""}

                    {course.type == "datetimepicker" && (
                      <>
                        <DateTime
                          label={course.label}
                          selected={
                            course.column_name == "from_time"
                              ? fromDate
                              : course.column_name == "to_time" &&
                                fromDate &&
                                !fromTo
                              ? new Date(fromDate.getTime() + 30 * 60000)
                              : fromTo
                          }
                          placeholderText="MM-dd-yyyy h:mm"
                          dateFormat="MMMM d, yyyy h:mm a"
                          filterTime={(time) =>
                            filterPassedTime(time, course.column_name)
                          }
                          minDate={
                            course.column_name == "from_time"
                              ? new Date()
                              : fromDate
                          }
                          name={course.column_name}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeCaption="time"
                          onChange={(date) =>
                            course.column_name == "from_time"
                              ? handleFromdate(date, course.column_name)
                              : course.column_name == "to_time"
                              ? handleTodate(date, course.column_name)
                              : ""
                          }
                        />
                      </>
                    )}

                    {course.type == "selectorplatform" && (
                      <Select
                        label={course.label}
                        options={platform}
                        valueField={"value"}
                        displayField={"label"}
                        data-key={course.column_name}
                        onChange={(e) => updateValue(e)}
                      />
                    )}

                    {repeat
                      ? course.type == "multiselector" && (
                          <label className="block text-sm font-medium text-gray-700">
                            {" "}
                            {course.label}
                            <ReactSelect
                              placeholder="Select Days"
                              options={daysOptions}
                              isMulti
                              closeMenuOnSelect={false}
                              hideSelectedOptions={false}
                              allowSelectAll={true}
                              onChange={handleChange}
                            />
                          </label>
                        )
                      : ""}

                    {repeat
                      ? course.type == "datepicker" && (
                          <DateTime
                            className={course.className}
                            label={course.label}
                            selected={repeatEnd}
                            placeholderText="MM-dd-yyyy"
                            dateFormat="MMMM d, yyyy"
                            minDate={fromDate && fromTo ? fromTo : new Date()}
                            name={course.column_name}
                            onChange={(date) =>
                              handleEnddate(date, course.column_name)
                            }
                          />
                        )
                      : ""}
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo"
          >
            Create Batch
          </button>
        </div>

        {mutatioData.data?.insert_courses_course_batches_one && (
          <div className="mt-1">
            <div className="text-lg text-green-800">
              {mutatioData.data.insert_courses_course_batches_one.batch_name}{" "}
              Batch is updated
            </div>
          </div>
        )}
        {mutatioData.data &&
          mutatioData.data.insert_courses_course_batches_one == null && (
            <div className="text-lg text-red-800">
              {course.batch_name} Batch is already exists
            </div>
          )}
      </form>
      {console.log("Batch data:", batchesDataQuery)}

      <BatchesData batchesData={batchesDataQuery} />
    </Container>
  );
}

export default CreateBatches;
