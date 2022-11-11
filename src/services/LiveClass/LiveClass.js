import { client } from "App";

import { getJwtToken } from "utils/Auth";

import { GET_COURSE_BATCHES } from "../../GraphQl/Queries/BatchesQueries";

class liveClass {
  datesRecurring(startDate, endDate, toDate, slotsDay) {
    var recurrencePattern = 0; // 2 weeks
    var day = JSON.parse("[" + slotsDay + "]");
    var daysSelected = day; //0 - sunday to 4 - thursday

    var startDay = Math.min(...daysSelected);

    var endDay = Math.max(...daysSelected);
    var datesObj = [];
    var dayNames = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    var toTimeString = toDate.getHours() + ":" + toDate.getMinutes() + ":00";

    while (startDate <= endDate) {
      if (startDay <= startDate.getDay() && endDay >= startDate.getDay()) {
        var year = startDate.getFullYear();
        var month = startDate.getMonth() + 1; // Jan is 0, dec is 11
        var day = startDate.getDate();
        var dateString = "" + year + "-" + month + "-" + day;
        var combined = new Date(dateString + " " + toTimeString);

        datesObj.push({
          ["slot_date"]: startDate.toISOString(),
          ["endto_date"]: combined,
          ["slots_days"]: dayNames[startDate.getDay()],
        });
        datesObj.push();
      }

      if (datesObj.length > 0 && startDate.getDay() == 6) {
        startDate.setDate(startDate.getDate() + 1);
      } else {
        startDate.setDate(startDate.getDate() + 1);
      }
    }
    return datesObj;
  }

  async getCourseBatches(courseid) {
    const rep = await client
      .query({
        query: GET_COURSE_BATCHES,
        variables: { course_id: courseid },
      })
      .then((res) => res.data);
    return rep;
  }
}

const liveClassService = new liveClass();

export default liveClassService;
