import dateFormat from "dateformat";
let gapi = window.gapi;
const API_KEY = "AIzaSyAYHsG3T4x0gp2cZ9bSHyTqZduuNX6X-u0";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const CLIENT_ID =
  "326855115022-gmnmhcq5if7l9fdqpuf5d7dhacu3762j.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export function initClient(callback) {
  gapi.load("client:auth2", () => {
    try {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(
          function () {
            if (typeof callback === "function") {
              callback(true);
            }
          },
          function (error) {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  });
}

export const checkSignInStatus = async () => {
  try {
    let status = await gapi.auth2.getAuthInstance().isSignedIn.get();
    return status;
  } catch (error) {
    console.log(error);
  }
};

export const signInToGoogle = async () => {
  try {
    let googleuser = await gapi.auth2
      .getAuthInstance()
      .signIn({ prompt: "consent" });
    if (googleuser) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const signOutFromGoogle = () => {
  try {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      auth2.disconnect();
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const getSignedInUserEmail = async () => {
  try {
    let status = await checkSignInStatus();
    if (status) {
      var auth2 = gapi.auth2.getAuthInstance();
      var profile = auth2.currentUser.get().getBasicProfile();
      return profile.getEmail();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const publishTheCalenderEvent = async (dataValue) => {
  var recurren = dateFormat(dataValue.repeat_end_time, "yyyymmdd") + "T000000Z";

  var event = {
    summary: dataValue.batch_name,
    location: "SkillTrainer",
    description: "Skilltrainer Live Classes",
    attendees: dataValue.meetingAttendees,

    start: {
      dateTime: dataValue.from_time,
      timeZone: "Asia/Kolkata",
    },

    end: {
      dateTime: dataValue.to_time,
      timeZone: "Asia/Kolkata",
    },
    recurrence: [
      "RRULE:FREQ=DAILY;BYDAY=" + dataValue.slots_days + ";UNTIL=" + recurren,
    ],

    conferenceData: {
      createRequest: {
        conferenceSolutionKey: {
          type: dataValue.platform,
        },
        requestId: dataValue.batch_name,
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
  try {
    gapi.client.load("calender", "v3", () => console.log("all ok"));

    var request = await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendNotifications: true,
      conferenceDataVersion: 1,
    });

    var result = await gapi.client.calendar.events.instances({
      calendarId: "primary",
      eventId: request.result.id,
      showDeleted: false,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateTheCalenderEvent = async (dataValue) => {
  var event = {
    summary: dataValue.batch_name,
    location: "SkillTrainer",
    description: "Skilltrainer Live Classes",
    attendees: dataValue.meetingAttendees,

    start: {
      dateTime: dataValue.startcombined,
      timeZone: "Asia/Kolkata",
    },

    end: {
      dateTime: dataValue.endcombined,
      timeZone: "Asia/Kolkata",
    },

    conferenceData: {
      createRequest: {
        conferenceSolutionKey: {
          type: dataValue.platform,
        },
        requestId: dataValue.batch_name,
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
  try {
    gapi.client.load("calender", "v3", () => console.log("all ok"));

    var request = gapi.client.calendar.events.update({
      calendarId: "primary",
      eventId: dataValue.event_id,
      resource: event,
      sendNotifications: true,
    });

    return request;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTheCalenderEvent = async (event_id) => {
  try {
    gapi.client.load("calender", "v3", () => console.log("all ok"));

    var request = gapi.client.calendar.events.delete({
      calendarId: "primary",
      eventId: event_id,
      sendNotifications: true,
    });

    return request;
  } catch (error) {
    return error;
    //console.log(error)
  }
};
