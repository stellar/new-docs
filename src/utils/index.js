import { buildPathFromFile } from "../../buildHelpers/routes";

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

/**
 * @desc Take a value in a range and return a number from 0 to 1 indicating where that value was located in that range
 * @param {number} value - value that you would like to normalize
 * @param {number} min - minimum value of the range
 * @param {number} max - maximum value of the range
 * @return {number} a number in between 0 to 1
 */
export const normalize = (value, min, max) => (value - min) / (max - min);

/**
 * @desc Linear Interpolation function - Start with a range and a normalized value and it will return the value in that range that the normalized value points to
 * @param {number} norm - normalized value
 * @param {number} min - minimum value of the range
 * @param {number} max - maximum value of the range
 * @return {number} a relevant ranged number
 */
export const lerp = (norm, min, max) => (max - min) * norm + min;

/**
 * @desc debounce function that limits the rate at which a function can fire
 * @param {function} func - function that needs to be run
 * @param {number} wait - wait period in milliseconds
 * @param {bool} immediate - if true, trigger the function on the leading edge, instead of the trailing
 * @return {function} - Returns a function, that, as long as it continues to be invoked, will not be triggered
 */
export const debounce = (func, wait, immediate, ...args) => {
  let timeout;
  const debounceFn = () => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
  return debounceFn;
};

/**
 * @desc Checks if value is an empty object
 * @param {Object} obj - object that is getting checked to see if it doesn't have its own enumerable string keyed properties
 * @return {bool} - Returns true if the object has no own enumerable string keyed properties (or empty)
 */
export const isEmpty = (obj) =>
  Object.values(obj) && Object.values(obj).length === 0;

/**
 * @desc getCookie function that retrives cookie values
 * @param {string} name - name of the cookie
 * @return {string} - Returns a value of the cookie user requested
 */
export const getCookie = (name) => {
  /* eslint-disable */
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export { buildPathFromFile };
