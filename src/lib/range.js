/**
 * Returns a list of numbers from "start" (inclusive) to "end" (exclusive)
 *
 * @param {number} start
 * @param {number} end
 */
export default (start, end) =>
  Array.from({ length: Math.abs(end - start) }, (_, i) => start + i);
