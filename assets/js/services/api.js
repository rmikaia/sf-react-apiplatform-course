import axios from "axios";
import jwtDecode from "jwt-decode";

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
  axios
    .post("http://localhost:8000/api/login_check", credentials)
    .then(({ data }) => {
      window.localStorage.setItem("authToken", data.token);
      setAuthHeader(data.token);
    });

const fetch = (entity) =>
  axios
    .get(`http://localhost:8000/api/${entity}`)
    .then((response) => response.data["hydra:member"]);

const deleteItem = (entity, id) =>
  axios.delete(`http://localhost:8000/api/${entity}/${id}`);

export default {
  auth,
  delete: deleteItem,
  fetch,
  isAuthenticated,
  logout,
  setup,
};
