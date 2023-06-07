import { Show, Index, createMemo, mergeProps } from "solid-js";
import Range from "~/components/Range";
import styles from "./Table.module.css";

/** @typedef {import('solid-js').JSX.Element} Element */

/**
 * @param {Object} props
 * @param {number=} props.rowLimit - Only show the first "n" row and a link to show the rest.
 * @param {Array<Array<Element>>} props.data
 * @param {Array<Element>} props.header
 * @param {function(Element): Element=} props.renderCell
 * @param {Function=} props.onShowAllRequest
 * @param {function(Array<number>)=} props.onHover
 * @param {Function=} props.onLeave
 * @returns {Element}
 */
export default (props) => {
  props = mergeProps(
    {
      rowLimit: Infinity,
      renderCell(el) {
        return el;
      },
      onShowAllRequest() {},
      onHover() {},
      onLeave() {},
    },
    props
  );

  const length = createMemo(() => Math.min(props.rowLimit, props.data.length));

  /**
   * @param {HTMLElement} el
   * @returns {?Array<number>}
   */
  const getCoordinates = (el) => {
    let elWithColProp = el;
    while (elWithColProp && !elWithColProp.dataset.col) {
      elWithColProp = elWithColProp.parentElement;
    }

    if (!elWithColProp) {
      return null;
    }

    const {
      dataset: { col },
    } = elWithColProp;
    const {
      dataset: { row },
    } = elWithColProp.parentElement;
    return [parseInt(row, 10), parseInt(col, 10)];
  };

  const handleMouseLeave = () => props.onLeave();
  const handleMouseOver = ({ target }) => {
    const coordinates = getCoordinates(target);
    if (coordinates) {
      props.onHover(coordinates);
    }
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
                  {(item, colIndex) => (
                    <td data-col={colIndex}>{props.renderCell(item())}</td>
                  )}
                </Index>
              </tr>
            )}
          </Range>
        </tbody>
      </table>
      <Show when={props.data.length !== length()}>
        <button onClick={() => props.onShowAllRequest()}>
          {props.data.length - props.rowLimit} results are hidden
        </button>
      </Show>
    </div>
  );
};
