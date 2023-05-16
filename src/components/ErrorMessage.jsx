import styles from "./ErrorMessage.module.css";
import { createEffect } from "solid-js";

/**
 * @param {Object} props
 * @param {string} props.message
 * @param {Error=} props.error
 * @returns {import('solid-js').JSX.Element}
 */
export default (props) => {
  createEffect(() => {
    if (props.error) {
      console.error(props.error);
    }
  });

  return (
    <div class={styles.root}>
      <h2>(☉_☉)</h2>
      <p>{props.message}</p>
    </div>
  );
};
