/** @typedef {import('solid-js').JSX.Element} Element */

/** @typedef {Array<number>} Boundary */

/**
 * @callback MarkerFn
 * @param {string} text - Selected text
 * @param {number} count - Iteration number (0-indexed)
 * @param {Boundary} boundary
 * @returns {Element}
 */

/**
 * @example
 * // returns ['ABC', <mark>DE</mark>, 'F']
 * markText('ABCDEF', [[2, 4]], (text) => <mark>{text}</mark>)
 * @param {string} text
 * @param {Array<Boundary|undefined>} boundaries
 * @param {MarkerFn} markerFn
 * @param {number=} offset - Offset the coordinates in the boundaries array
 * @returns {Array<Element>}
 */
export default (text, boundaries, markerFn, offset = 0) => {
  const fragments = [];
  for (let i = 0; i < boundaries.length; i += 1) {
    const boundary = boundaries[i];
    if (!boundary) {
      continue;
    }

    const start = boundary[0] - offset;
    const end = boundary[1] - offset;

    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    fragments.push(before, markerFn(selected, i, boundary));

    text = after;
    offset = boundary[1];
  }

  if (text) {
    fragments.push(text);
  }

  return fragments;
};
