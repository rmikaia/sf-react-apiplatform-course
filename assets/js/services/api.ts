import axios from "axios";
// @ts-ignore
import jwtDecode from "jwt-decode";
import { API_URL } from "../configs/env";
import { EntityName } from "../types/api";
import { CommonObject } from "../types/common";
import { Credentials } from "../types/user";

const encryptedBy = "Bearer";

const setAuthHeader = (token: string) => {
  axios.defaults.headers["Authorization"] = `${encryptedBy} ${token}`;
};

const isAuthenticated = () => Boolean(getWorkingToken());

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

const auth = (credentials: Credentials) =>
  axios.post(`${API_URL}login_check`, credentials).then(({ data }) => {
    window.localStorage.setItem("authToken", data.token);
    setAuthHeader(data.token);

    return data;
  });

const post = <T extends CommonObject>(entityName: EntityName, data: T) =>
  axios.post(`${API_URL}${entityName}`, data);

const put = (entityName: EntityName, id: string, data: CommonObject) =>
  axios.put(`${API_URL}${entityName}/${id}`, data);

const fetch = (entityName: EntityName) =>
  axios
    .get(`${API_URL}${entityName}`)
    .then((response) => response.data["hydra:member"]);

const get = (entityName: EntityName, id: string) =>
  axios.get(`${API_URL}${entityName}/${id}`).then((response) => response.data);

const deleteItem = (entityName: EntityName, id: number) =>
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
