import { A } from "solid-start";
import { LeftArrow } from "~/components/icons";
import styles from "./index.module.css";

export default () => (
  <div class={styles.root}>
    <A href="/" title="Home">
      <LeftArrow />
    </A>
    <article>
      <h2>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#advanced_searching_with_flags"
          target="_blank"
        >
          Flags
        </a>
      </h2>
      <dl>
        <dt>
          <code>d</code>
        </dt>
        <dd>Generate indices for substring matches.</dd>
        <dt>
          <code>g</code>
        </dt>
        <dd>Global search.</dd>
        <dt>
          <code>i</code>
        </dt>
        <dd>Case-insensitive search.</dd>
        <dt>
          <code>m</code>
        </dt>
        <dd>
          Allows <code>^</code> and <code>$</code> to match newline characters.
        </dd>
        <dt>
          <code>s</code>
        </dt>
        <dd>
          Allows <code>.</code> to match newline characters.
        </dd>
        <dt>
          <code>u</code>
        </dt>
        <dd>
          "Unicode"; treat a pattern as a sequence of Unicode code points.
        </dd>
        <dt>
          <code>y</code>
        </dt>
        <dd>
          Perform a "sticky" search that matches starting at the current
          position in the target string.
        </dd>
      </dl>

      <h2>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes"
          target="_blank"
        >
          Character classes
        </a>
      </h2>
      <dl>
        <dt>
          <code>[xyz]</code>
          <br />
          <code>[a-c]</code>
        </dt>
        <dd>A character class.</dd>
        <dt>
          <code>[^xyz]</code>
          <br />
          <code>[^a-c]</code>
        </dt>
        <dd>A negated or complemented character class.</dd>
        <dt>
          <code>.</code>
        </dt>
        <dd>
          Matches any single character except line terminators: <code>\\n</code>
          , <code>\\r</code>, <code>\\u2028</code>
          or <code>\\u2029</code>.
          <br />
          Inside a character class, the dot loses its special meaning and
          matches a literal dot.
          <br />
          Note that the m multiline flag doesn't change the dot behavior. So to
          match a pattern across multiple lines, the character class{" "}
          <code>[^]</code> can be used — it will match any character including
          newlines.
          <br />
          The <code>s</code> "dotAll" flag allows the dot to also match line
          terminators.
        </dd>
        <dt>
          <code>\\d</code>
        </dt>
        <dd>
          Matches any digit. Equivalent to <code>[0-9]</code>.
        </dd>
        <dt>
          <code>\\D</code>
        </dt>
        <dd>
          Matches any character that is not a digit. Equivalent to{" "}
          <code>[^0-9]</code>.
        </dd>
        <dt>
          <code>\\w</code>
        </dt>
        <dd>
          Matches any alphanumeric character from the basic Latin alphabet,
          including the underscore. Equivalent to <code>[A-Za-z0-9_]</code>.
        </dd>
        <dt>
          <code>\\W</code>
        </dt>
        <dd>
          Matches any character that is not a word character from the basic
          Latin alphabet. Equivalent to <code>[^A-Za-z0-9_]</code>.
        </dd>
        <dt>
          <code>\\s</code>
        </dt>
        <dd>
          Matches a single white space character, including space, tab, form
          feed, line feed, and other Unicode spaces.
        </dd>
        <dt>
          <code>\\S</code>
        </dt>
        <dd>Matches a single character other than white space.</dd>
        <dt>
          <code>\\t</code>
        </dt>
        <dd>Matches a horizontal tab.</dd>
        <dt>
          <code>\\r</code>
        </dt>
        <dd>Matches a carriage return.</dd>
        <dt>
          <code>\\n</code>
        </dt>
        <dd>Matches a linefeed.</dd>
        <dt>
          <code>\\v</code>
        </dt>
        <dd>Matches a vertical tab.</dd>
        <dt>
          <code>\\f</code>
        </dt>
        <dd>Matches a form-feed.</dd>
        <dt>
          <code>[\\b]</code>
        </dt>
        <dd>Matches a backspace.</dd>
        <dt>
          <code>\\0</code>
        </dt>
        <dd>Matches a NUL character. Do not follow this with another digit.</dd>
        <dt>
          <code>\\cX</code>
        </dt>
        <dd>
          Matches a control character using caret notation, where "X" is a
          letter from A–Z (corresponding to code points <code>U+0001</code>–
          <code>U+001A</code>).
        </dd>
        <dt>
          <code>\\xhh</code>
        </dt>
        <dd>
          Matches the character with the code hh (two hexadecimal digits).
        </dd>
        <dt>
          <code>\\uhhhh</code>
        </dt>
        <dd>
          Matches a UTF-16 code-unit with the value hhhh (four hexadecimal
          digits).
        </dd>
        <dt>
          <code>{"\\\\u{hhhh}"}</code> or
          <br />
          <code>{"\\\\u{hhhhh}"}</code>
        </dt>
        <dd>
          (Only when the <code>u</code> flag is set.) Matches the character with
          the Unicode value <code>U+hhhh</code> or <code>U+hhhhh</code>{" "}
          (hexadecimal digits).
        </dd>
        <dt>
          <code>{"\\\\p{UnicodeProperty}"}</code>,
          <br />
          <code>{"\\\\P{UnicodeProperty}"}</code>
        </dt>
        <dd>
          Matches a character based on its{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape"
            target="_blank"
          >
            Unicode character properties.
          </a>
        </dd>
      </dl>
    </article>
  </div>
);
