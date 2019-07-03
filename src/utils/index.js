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

/**
 * @desc Shorten large numbers into abbreviations (i.e. 1,500 = 1.5k)
 * @param {number} number - the number to shorten
 * @return {string} a number with a symbol
 */
export const abbreviateNumber = (number) => {
  const newVal = parseInt(number, 10);
  const suffixes = ["", "k", "M", "B", "T"];
  // eslint-disable-next-line prefer-template
  const suffixNum = Math.floor((("" + newVal).length - 1) / 3);
  const shortValue = parseFloat(
    (suffixNum !== 0 ? newVal / 1000 ** suffixNum : newVal).toPrecision(5),
  );
  return shortValue + suffixes[suffixNum];
};

/**
 * @desc Add a comma in every 3 digit (i.e. 26000 = 26,000)
 * @param {number} number - the number to apply a comma
 * @return {string} a number with a comma
 */
export const numberWithCommas = (number) =>
  number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
