import axios from "./Api";

export const fetchUsers = async (page, per_page) => {
  const {
    data: { users, success },
  } = await axios().get("/users", {
    params: {
      page: page,
      per_page: per_page,
    },
  });

  if (success) return users;
  else return false;
};
export const searchUsers = async (values) => {
  console.log({ values: values });
  const {
    data: { users, success },
  } = await axios().post("/users/search", { values: values });

  if (success) return users;
  else return false;
};


export const api = async (endpoint, payload) => {
  console.log("Payload : ", payload);
  const data = await axios().post('/'+endpoint, { data: payload})
  
  return data.data;
}
