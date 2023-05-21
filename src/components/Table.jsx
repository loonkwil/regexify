import { Show, Index, createSignal, createMemo, mergeProps } from "solid-js";
import Range from "~/components/Range";
import styles from "./Table.module.css";

/**
 * @param {Object} props
 * @param {number=} props.rowLimit
 * @param {Array<Array<string | number>>} props.data
 * @param {Array<string | number>} props.header
 * @returns {import('solid-js').JSX.Element}
 */
export default (props) => {
  props = mergeProps({ rowLimit: Infinity }, props);

  const [showAll, setShowAll] = createSignal(false);
  const length = createMemo(() => {
    if (showAll() || props.rowLimit + 1 >= props.data.length) {
      return props.data.length;
    }

    return props.rowLimit;
  });

  return (
    <table class={styles.root}>
      <thead>
        <tr>
          <Index each={props.header}>{(item) => <th>{item()}</th>}</Index>
        </tr>
      </thead>
      <tbody>
        <Range start={0} end={length()}>
          {(i) => (
            <tr>
              <Index each={props.data[i()]}>
                {(item) => <td>{item()}</td>}
              </Index>
            </tr>
          )}
        </Range>
      </tbody>
      <Show when={props.data.length !== length()}>
        <tfoot>
          <tr>
            <td colspan="999">
              <button onClick={() => setShowAll(true)}>
                {props.data.length - props.rowLimit} results are hidden
              </button>
            </td>
          </tr>
        </tfoot>
      </Show>
    </table>
  );
};
