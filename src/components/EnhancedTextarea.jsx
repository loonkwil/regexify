import { createUniqueId, createEffect, mergeProps, Show } from "solid-js";
import styles from "./EnhancedTextarea.module.css";

/**
 * @param {Object} props
 * @param {string} props.initialValue
 * @param {Array<Array<number>=} props.highlights
 * @param {string=} props.invalid
 * @param {string} props.label
 * @param {string=} props.spellcheck
 * @param {string=} props.autofocus
 * @returns {import('solid-js').JSX.Element}
 */
export default (props) => {
  props = mergeProps({ highlights: [] }, props);

  const id = createUniqueId();

  let ref;
  createEffect(() => {
    if (ref) {
      const message = props.invalid ?? "";
      ref.setCustomValidity(message);
    }
  });

  const highlightedText = () => {
    // Hack: if the text ends with a new line character, we have to insert an
    // extra "\n" in order to have the same height as the textarea
    const rawText = props.value.replace(/\n$/, "\n\n");

    if (props.highlights.length === 0) {
      return rawText;
    }

    const sortedHighlights = props.highlights.sort((a, b) => a[0] - b[0]);

    const fragments = [];
    let cursor = 0;
    for (let [highlightStart, highlightEnd] of sortedHighlights) {
      if (cursor < highlightStart) {
        fragments.push(rawText.substring(cursor, highlightStart));
      }

      fragments.push(
        <mark>{rawText.substring(highlightStart, highlightEnd)}</mark>
      );

      cursor = highlightEnd;
    }

    if (cursor < rawText.length - 1) {
      fragments.push(rawText.substring(cursor));
    }

    return fragments;
  };

  return (
    <div class={styles.root}>
      <Show when={props.label}>
        <label for={id}>{props.label}</label>
      </Show>
      <div class={styles.container}>
        <div>{highlightedText()}</div>
        {
          // By default, Firefox will persist the value of the textarea across page loads.
          // With the feature, it is hard to keep the props.value the highlighted text and the textarea in sync.
          // This feature can be disabled with the "autocomplete" attribute.
        }
        <textarea
          id={id}
          rows="1"
          autocomplete="off"
          spellcheck={props.spellcheck}
          ref={ref}
          onInput={({ target: { value } }) => {
            props.setValue(value);
          }}
          autofocus={props.autofocus}
        >
          {props.value}
        </textarea>
      </div>
    </div>
  );
};
