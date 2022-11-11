import axios from "axios";
import _ from "lodash";

const _axios = (...args) => axios(...args).then(({ data }) => data);

export const resolvers = {
  IND: (pincode) => {
    return _axios({
      method: "get",
      url: "https://api.postalpincode.in/pincode/" + pincode,
    })
      .then(
        (data) => (data[0] && data[0].PostOffice && data[0].PostOffice[0]) || {}
      )
      .then(
        (res) =>
          !_.isEmpty(res) && {
            district: res.District,
            city_town: res.Name,
            state: res.State,
          }
      );
  },
};
