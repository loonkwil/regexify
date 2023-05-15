/**
 * Returns a list of numbers from "start" (inclusive) to "end" (exclusive)
 *
 * @param {number} start
 * @param {number} end
 */
export const range = (start, end) =>
  Array.from({ length: Math.abs(end - start) }, (_, i) => start + i);

/**
 * @example
 * // returns /[0-9]/g
 * getRegExpFromString(`/
 * [0-9]
 * /g`)
 * @param {string}
 * @returns {RegExp}
 * @throws {SyntaxError}
 */
export const getRegExpFromString = (str) => {
  const oneline = str.replaceAll("\n", "").trim();
  const match = oneline.match(/\/(?<pattern>.*?)\/(?<flags>[a-z]+)?/);
  if (!match) {
    throw new SyntaxError("Invalid RegExp");
  }

  const {
    groups: { pattern, flags = "" },
  } = match;
  return new RegExp(pattern, flags);
};
