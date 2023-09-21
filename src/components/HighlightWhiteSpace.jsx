import { Show, createMemo } from "solid-js";
import markText from "~/lib/markText";
import styles from "./HighlightWhiteSpace.module.css";

const replacements = {
  "\u{0020}": "·", // Space
  "\u{00A0}": "⍽", // No-Break Space
  "\u{0009}": "→", // Tab
  "\u{000A}": "⏎", // New Line
};

/**
 * @param {Object} props
 * @param {string} props.children
 * @returns {Element}
 */
export default (props) => {
  const positions = createMemo(() =>
    props.children
      ? Array.from(props.children.matchAll(/\s/g), ({ index }) => [
          index,
          index + 1,
        ])
      : [],
  );

  return (
    <Show when={props.children}>
      <div class={styles.root} aria-label={props.children}>
        <span aria-hidden="true">
          {markText(props.children, positions(), (char) => {
            const replacement = replacements[char];
            if (!replacement) {
              return char;
            }

            return (
              <>
                <span data-char={replacement}>{char !== "\n" && char}</span>
                {char === "\n" && <br />}
              </>
            );
          })}
        </span>
      </div>
    </Show>
  );
};
