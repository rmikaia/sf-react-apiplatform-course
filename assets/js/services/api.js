import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL } from "../configs/env";

const encryptedBy = "Bearer";

const setAuthHeader = (token) => {
  axios.defaults.headers["Authorization"] = `${encryptedBy} ${token}`;
};

const isAuthenticated = () => Boolean(getWorkingToken());

const getWorkingToken = () => {
  const token = window.localStorage.getItem("authToken");

  if (token) {
    const { exp: expiration } = jwtDecode(token);

    if (expiration * 1000 > new Date()) {
      return token;
    }
  }

  return "";
};

const setup = () => {
  const token = getWorkingToken();

  if (token) {
    setAuthHeader(token);
  }
};

const logout = () => {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
};

const auth = (credentials) =>
  axios.post(`${API_URL}login_check`, credentials).then(({ data }) => {
    window.localStorage.setItem("authToken", data.token);
    setAuthHeader(data.token);
  });

const post = (entity, data) => axios.post(`${API_URL}${entity}`, data);

const put = (entity, id, data) => axios.put(`${API_URL}${entity}/${id}`, data);

const fetch = (entity) =>
  axios
    .get(`${API_URL}${entity}`)
    .then((response) => response.data["hydra:member"]);

const get = (entity, id) =>
  axios.get(`${API_URL}${entity}/${id}`).then((response) => response.data);

const deleteItem = (entity, id) => axios.delete(`${API_URL}${entity}/${id}`);

export default {
  auth,
  delete: deleteItem,
  fetch,
  get,
  isAuthenticated,
  logout,
  post,
  put,
  setup,
};
