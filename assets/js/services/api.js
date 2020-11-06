import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL } from "../configs/env";

const encryptedBy = "Bearer";

/** @param {string} token */
const setAuthHeader = (token) => {
  axios.defaults.headers["Authorization"] = `${encryptedBy} ${token}`;
};

/** @returns {boolean} */
const isAuthenticated = () => Boolean(getWorkingToken());

/** @returns {string} */
const getWorkingToken = () => {
  const token = window.localStorage.getItem("authToken");

  if (token) {
    const { exp: expiration } = jwtDecode(token);

    if (expiration * 1000 > new Date().getTime()) {
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

/** @returns {Promise<CreatedUserData>} */
const auth = (credentials) =>
  axios.post(`${API_URL}login_check`, credentials).then(({ data }) => {
    window.localStorage.setItem("authToken", data.token);
    setAuthHeader(data.token);

    return data;
  });

/**
 * @param {EntityName} entityName
 * @param {PostedData} data
 * @returns {Promise<CreatedData>}
 */
const post = (entityName, data) => axios.post(`${API_URL}${entityName}`, data);

/**
 * @param {EntityName} entityName
 * @param {number} id
 * @param {PostedData} data
 * @returns {Promise<EditedData>}
 */
const put = (entityName, id, data) =>
  axios.put(`${API_URL}${entityName}/${id}`, data);

/**
 * @param {EntityName} entityName
 * @returns {Promise<FetchedData[]>}
 */
const fetch = (entityName) =>
  axios
    .get(`${API_URL}${entityName}`)
    .then((response) => response.data["hydra:member"]);

/**
 * @param {EntityName} entityName
 * @param {number} id
 * @returns {Promise<FetchedData>}
 */
const get = (entityName, id) =>
  axios.get(`${API_URL}${entityName}/${id}`).then((response) => response.data);

/**
 * @param {EntityName} entityName
 * @param {number} id
 * @returns {Promise}
 */
const deleteItem = (entityName, id) =>
  axios.delete(`${API_URL}${entityName}/${id}`);

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
