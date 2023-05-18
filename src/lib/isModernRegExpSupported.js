/**
 * @returns {boolean}
 */
export default () =>
  typeof String.prototype.matchAll === "function" &&
  "hasIndices" in RegExp.prototype;
