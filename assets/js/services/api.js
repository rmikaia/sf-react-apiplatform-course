import axios from "axios";

const fetch = (entity) =>
  axios
    .get(`http://localhost:8000/api/${entity}`)
    .then((response) => response.data["hydra:member"]);

const deleteItem = (entity, id) =>
  axios.delete(`http://localhost:8000/api/${entity}/${id}`);

export default {
  fetch,
  delete: deleteItem,
};
