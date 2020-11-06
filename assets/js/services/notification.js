/** @returns {string} */
export const getGenericError = () => "Une erreur est survenue";

/**
 * @param {string} subject
 * @returns {string}
 */
export const getCreateSuccess = (subject) => `${subject} a bien été crée(e)`;

/**
 * @param {string} subject
 * @returns {string}
 */
export const getEditSuccess = (subject) => `${subject} a bien été modifié(e)`;

/**
 * @param {string} subject
 * @returns {string}
 */
export const getDeleteSuccess = (subject) =>
  `${subject} a bien été supprimé(e)`;
