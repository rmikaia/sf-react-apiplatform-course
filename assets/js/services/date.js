import moment from "moment";

const frFormat = "DD/MM/YYYY";

/**
 * @param {Date} date
 * @returns {string}
 */
export const formatDate = (date) => moment(date).format(frFormat);
