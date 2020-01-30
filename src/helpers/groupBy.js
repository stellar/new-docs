/**
 * Group items in a collection into new collections based on the {property} you pass.
 * @param {array} objectArray an array of objects that is going to be grouped by the {property}
 * @param {string} property the name of the key that the array of objects is going to be grouped by
 * @returns {object} the final grouped collection
 */

export const groupBy = (objectArray, property) =>
  objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
