/**
 * Calculates how many tables are required for the visitors
 * @param visitors Number of visitors
 * @returns {number} Amount of tables required for the specifiec visitors
 */
export const convertVisitorsToTables = (visitors: number) => {
  return Math.ceil(visitors / 6);
};
