import axios from "axios";
import {getLoginCookie} from "../utils/Auth";
import {domain} from "./Consts";

function getHeaders() {
  var headers = {};
  if (getLoginCookie()) {
    headers = {...headers, "access-token": getLoginCookie()};
  }

  return headers;
}

function api() {
  const Axios = axios.create({
    baseURL: domain + "/api",
    headers: getHeaders(),
  });

  return Axios;
}

export {getHeaders};
export default api;
