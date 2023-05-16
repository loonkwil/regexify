import { Index } from "solid-js";
import { range } from "~/lib/helpers";

/**
 * @param {Object} props
 * @param {number} props.start
 * @param {number} props.end
 * @param {function(function(): number, number)} props.children
 * @returns {import('solid-js').JSX.Element}
 */
export default (props) => (
  <Index each={range(props.start, props.end)}>{props.children}</Index>
);
