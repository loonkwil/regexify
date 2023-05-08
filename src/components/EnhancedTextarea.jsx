import { createUniqueId, createSignal, createEffect } from "solid-js";
import styles from "./EnhancedTextarea.module.css";

/**
 * @param {Object} props
 * @param {string} props.initialValue
 * @param {string=} props.invalid
 * @param {string} props.label
 * @param {string=} props.spellcheck
 * @param {string=} props.autofocus
 * @returns {import('solid-js').JSX.Element}
 */
export default (props) => {
  const [text, setText] = createSignal(props.initialValue);

  let ref;
  createEffect(() => {
    if (ref) {
      const message = props.invalid ?? "";
      ref.setCustomValidity(message);
    }
  });

  const id = createUniqueId();

  return (
    <div class={styles.root}>
      <label for={id}>{props.label}</label>
      <div class={styles.container}>
        <div>{text().replace(/\n$/, "\n\n")}</div>
        <textarea
          id={id}
          rows="1"
          spellcheck={props.spellcheck}
          ref={ref}
          onInput={(e) => setText(e.target.value)}
          autofocus={props.autofocus}
        >
          {text()}
        </textarea>
      </div>
    </div>
  );
};
