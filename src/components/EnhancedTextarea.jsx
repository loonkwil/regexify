import { createUniqueId, createEffect, mergeProps, Show } from "solid-js";
import markText from "~/lib/markText";
import styles from "./EnhancedTextarea.module.css";

/**
 * @param {Object} props
 * @param {string} props.initialValue
 * @param {Array<Array<Array<number>>>=} props.highlights
 * @param {string=} props.invalid
 * @param {string} props.label
 * @param {string=} props.id
 * @param {string=} props.spellcheck
 * @param {string=} props.autofocus
 * @param {Function=} props.ref
 * @param {string=} props.title
 * @param {string=} props.containerClasses
 * @param {string=} props.ariaLabel
 * @param {string=} props.ariaKeyShortcuts
 * @returns {Element}
 */
export default (props) => {
  props = mergeProps(
    { highlights: [], ref() {}, containerClasses: "", id: createUniqueId() },
    props,
  );

  let textareaEl;
  createEffect(() => {
    if (textareaEl) {
      const message = props.invalid ?? "";
      textareaEl.setCustomValidity(message);
    }
  });

  const highlightedText = () => {
    // Hack: if the text ends with a new line character, we have to insert an
    // extra "\n" in order to have the same height as the textarea
    const rawText = props.value.replace(/\n$/, "\n\n");

    if (props.highlights.length === 0) {
      return rawText;
    }

    const mainMarks = [];
    const subMarks = [];
    for (const positions of props.highlights) {
      mainMarks.push(positions[0]);
      subMarks.push(positions.slice(1));
    }

    return markText(rawText, mainMarks, (mainText, rowIndex, boundary) => (
      <mark data-row={rowIndex}>
        {markText(
          mainText,
          subMarks[rowIndex],
          (subText, colIndex) => (
            <span data-col={colIndex}>{subText}</span>
          ),
          boundary[0],
        )}
      </mark>
    ));
  };

  return (
    <div class={styles.root}>
      <Show when={props.label}>
        <label for={props.id} title={props.title}>
          {props.label}
        </label>
      </Show>
      <div class={`${styles.container} ${props.containerClasses}`}>
        <div aria-hidden="true">{highlightedText()}</div>
        {
          // By default, Firefox will persist the value of the textarea across page loads.
          // With the feature, it is hard to keep the props.value the highlighted text and the textarea in sync.
          // This feature can be disabled with the "autocomplete" attribute.
        }
        <textarea
          id={props.id}
          rows="1"
          autocomplete="off"
          spellcheck={props.spellcheck}
          ref={(el) => {
            textareaEl = el;
            props.ref(el);
          }}
          onInput={({ target: { value } }) => {
            props.setValue(value);
          }}
          autofocus={props.autofocus}
          aria-label={props.ariaLabel}
          aria-keyshortcuts={props.ariaKeyshortcuts}
        >
          {props.value}
        </textarea>
      </div>
    </div>
  );
};
