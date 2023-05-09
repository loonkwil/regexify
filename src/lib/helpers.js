/**
 * @param {number} min - inclusive
 * @param {number} max - exclusive
 * @returns {number}
 */
export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

/**
 * @param {Array<*>} arr
 * @returns {*}
 */
export const pickOne = (arr) => arr[getRandomInt(0, arr.length)];
