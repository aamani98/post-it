import Axios from "axios";

const axios = Axios.create({
  baseURL: "/api/",
});

export const setAuthHeader = (token) =>
  (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);

export const removeAuthHeader = () => delete axios.defaults.headers.common["Authorization"];

export default axios;
