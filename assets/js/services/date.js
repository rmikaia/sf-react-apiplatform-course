import moment from "moment";

const frFormat = "DD/MM/YYYY";

export const formatDate = (date) => moment(date).format(frFormat);
