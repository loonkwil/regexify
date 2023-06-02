/** @returns {boolean} */
export const isCSSNestingSupported = () => CSS.supports("selector(&)");

/** @returns {boolean} */
export const isModernRegExpSupported = () =>
  typeof String.prototype.matchAll === "function" &&
  "hasIndices" in RegExp.prototype;
