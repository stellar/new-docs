/**
 * @desc calculates the column width in percentage (%)
 * @param {number} col - { # of columns we want / a total # of columns }
 * Example: If there are 6 columns and we want the width of the single column, simply pass { 1/6 }
 * @return {string} width %
 */
export const getGridItemWidthPercent = ({ col }) => {
  const percent = col * 100;
  return `${percent}%;`;
};

/**
 * @desc get the current full year
 * * Example: 2019
 * @return {string} full year
 */
export const getCurrentYear = () => new Date().getFullYear();

/**
 * @desc get a random value within a range (min, max)
 * @param {number} min - minimum value of the range
 * @param {number} max - maximum value of the range
 * @return {number} random float value between min and max
 */
export const getRandomValue = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
