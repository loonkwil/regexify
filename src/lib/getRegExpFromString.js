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
export default (str) => {
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
