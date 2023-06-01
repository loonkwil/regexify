import { Show, Index, createSignal, createMemo, mergeProps } from "solid-js";
import Range from "~/components/Range";
import styles from "./Table.module.css";

/** @typedef {import('solid-js').JSX.Element} Element */

/**
 * @param {Object} props
 * @param {number=} props.rowLimit - Only show the first "n" row and a link to show the rest.
 * @param {Array<Array<Element>>} props.data
 * @param {Array<Element>} props.header
 * @param {function(Array<number>)} onHover
 * @param {Function} onLeave
 * @returns {Element}
 */
export default (props) => {
  props = mergeProps({ rowLimit: Infinity, onHover() {}, onLeave() {} }, props);

  const [showAll, setShowAll] = createSignal(false);
  const length = createMemo(() => {
    if (showAll() || props.rowLimit + 1 >= props.data.length) {
      return props.data.length;
    }

    return props.rowLimit;
  });

  const handleMouseLeave = () => props.onLeave();
  const handleMouseOver = ({ target }) => {
    if (!["TH", "TD"].includes(target.nodeName)) {
      return;
    }

    const {
      dataset: { col },
    } = target;
    const {
      dataset: { row },
    } = target.parentElement;
    props.onHover([parseInt(row, 10), parseInt(col, 10)]);
  };

  return (
    <div class={styles.root}>
      <table onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver}>
        <thead>
          <tr data-row={-1}>
            <Index each={props.header}>
              {(item, colIndex) => <th data-col={colIndex}>{item()}</th>}
            </Index>
          </tr>
        </thead>
        <tbody>
          <Range start={0} end={length()}>
            {(rowIndex) => (
              <tr data-row={rowIndex()}>
                <Index each={props.data[rowIndex()]}>
                  {(item, colIndex) => <td data-col={colIndex}>{item()}</td>}
                </Index>
              </tr>
            )}
          </Range>
        </tbody>
      </table>
      <Show when={props.data.length !== length()}>
        <button onClick={() => setShowAll(true)}>
          {props.data.length - props.rowLimit} results are hidden
        </button>
      </Show>
    </div>
  );
};
