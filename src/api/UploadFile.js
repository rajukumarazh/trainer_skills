import axios from "axios";
import api, {getHeaders} from "./Api";

export const uploadFile = async (file_data, file_name, ops_type) => {
  const data = {file_data, file_name, ops_type};
  // console.log(getHeaders());
  // console.log(data.file_data);
  const response = await api().post("/upload_file", data);
  return response.data;
};

export const getFile = async (file_url) => {
  const data = {data_url: file_url};
  console.log(getHeaders());
  console.log(file_url);
  const response = await api().post("/get_file", data);
  return response.data;
};
