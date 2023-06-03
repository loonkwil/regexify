import { A, useNavigate } from "solid-start";
import { LeftArrow } from "~/components/icons";
import styles from "./index.module.css";
import createShortcut from "~/lib/createShortcut";

export default () => {
  const navigate = useNavigate();
  createShortcut({ key: "m", ctrlKey: true }, (e) => {
    e.preventDefault();
    navigate("/");
  });

  return (
    <div class={styles.root}>
      <A href="/" title="Home (Ctrl + M)">
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
            Allows <code>^</code> and <code>$</code> to match newline
            characters.
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
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences#types"
            target="_blank"
          >
            Groups and backreferences
          </a>
        </h2>
        <dl>
          <dt>
            <code>(x)</code>
          </dt>
          <dd>Capturing group</dd>

          <dt>
            <code>(?&lt;Name&gt;x)</code>
          </dt>
          <dd>Named capturing group</dd>

          <dt>
            <code>(?:x)</code>
          </dt>
          <dd>Non-capturing group</dd>

          <dt>
            <code>&#92;N</code>
          </dt>
          <dd>
            Where "N" is a positive integer. A back reference to the last
            substring matching the N parenthetical in the regular expression
            (counting left parentheses).
          </dd>

          <dt>
            <code>&#92;k&lt;Name&gt;</code>
          </dt>
          <dd>
            A back reference to the last substring matching the named capture
            group specified by <code>&lt;Name&gt;</code>.
          </dd>
        </dl>

        <h2>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#types"
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
            Matches any single character except line terminators:{" "}
            <code>&#92;n</code>, <code>&#92;r</code>, <code>&#92;u2028</code> or{" "}
            <code>&#92;u2029</code>.
            <br />
            Inside a character class, the dot loses its special meaning and
            matches a literal dot.
            <br />
            Note that the m multiline flag doesn't change the dot behavior. So
            to match a pattern across multiple lines, the character class{" "}
            <code>[^]</code> can be used — it will match any character including
            newlines.
            <br />
            The <code>s</code> "dotAll" flag allows the dot to also match line
            terminators.
          </dd>

          <dt>
            <code>&#92;d</code>
          </dt>
          <dd>
            Matches any digit. Equivalent to <code>[0-9]</code>.
          </dd>

          <dt>
            <code>&#92;D</code>
          </dt>
          <dd>
            Matches any character that is not a digit. Equivalent to{" "}
            <code>[^0-9]</code>.
          </dd>

          <dt>
            <code>&#92;w</code>
          </dt>
          <dd>
            Matches any alphanumeric character from the basic Latin alphabet,
            including the underscore. Equivalent to <code>[A-Za-z0-9_]</code>.
          </dd>

          <dt>
            <code>&#92;W</code>
          </dt>
          <dd>
            Matches any character that is not a word character from the basic
            Latin alphabet. Equivalent to <code>[^A-Za-z0-9_]</code>.
          </dd>

          <dt>
            <code>&#92;s</code>
          </dt>
          <dd>
            Matches a single white space character, including space, tab, form
            feed, line feed, and other Unicode spaces.
          </dd>

          <dt>
            <code>&#92;S</code>
          </dt>
          <dd>Matches a single character other than white space.</dd>

          <dt>
            <code>&#92;t</code>
          </dt>
          <dd>Matches a horizontal tab.</dd>

          <dt>
            <code>&#92;r</code>
          </dt>
          <dd>Matches a carriage return.</dd>

          <dt>
            <code>&#92;n</code>
          </dt>
          <dd>Matches a linefeed.</dd>

          <dt>
            <code>&#92;v</code>
          </dt>
          <dd>Matches a vertical tab.</dd>

          <dt>
            <code>&#92;f</code>
          </dt>
          <dd>Matches a form-feed.</dd>

          <dt>
            <code>[&#92;b]</code>
          </dt>
          <dd>Matches a backspace.</dd>

          <dt>
            <code>&#92;0</code>
          </dt>
          <dd>
            Matches a NUL character. Do not follow this with another digit.
          </dd>

          <dt>
            <code>&#92;cX</code>
          </dt>
          <dd>
            Matches a control character using caret notation, where "X" is a
            letter from A–Z (corresponding to code points <code>U+0001</code>–
            <code>U+001A</code>).
          </dd>

          <dt>
            <code>&#92;xhh</code>
          </dt>
          <dd>
            Matches the character with the code hh (two hexadecimal digits).
          </dd>

          <dt>
            <code>&#92;uhhhh</code>
          </dt>
          <dd>
            Matches a UTF-16 code-unit with the value hhhh (four hexadecimal
            digits).
          </dd>

          <dt>
            <code>&#92;u&lbrace;hhhh&rbrace;</code> or
            <br />
            <code>&#92;u&lbrace;hhhhh&rbrace;</code>
          </dt>
          <dd>
            (Only when the <code>u</code> flag is set.) Matches the character
            with the Unicode value <code>U+hhhh</code> or <code>U+hhhhh</code>{" "}
            (hexadecimal digits).
          </dd>

          <dt>
            <code>&#92;p&lbrace;UnicodeProperty&rbrace;</code>,
            <br />
            <code>&#92;P&lbrace;UnicodeProperty&rbrace;</code>
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

        <h2>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions#types"
            target="_blank"
          >
            Assertions
          </a>
        </h2>
        <dl>
          <dt>
            <code>^</code>
          </dt>
          <dd>
            Matches the beginning of input. If the multiline flag is set to
            true, also matches immediately after a line break character.
          </dd>

          <dt>
            <code>$</code>
          </dt>
          <dd>
            Matches the end of input. If the multiline flag is set to true, also
            matches immediately before a line break character.
          </dd>

          <dt>
            <code>&#92;b</code>
          </dt>
          <dd>
            Matches a word boundary. This is the position where a word character
            is not followed or preceded by another word-character, such as
            between a letter and a space. Note that a matched word boundary is
            not included in the match.
          </dd>

          <dt>
            <code>&#92;B</code>
          </dt>
          <dd>Matches a non-word boundary.</dd>

          <dt>
            <code>x(?=y)</code>
          </dt>
          <dd>
            Lookahead assertion: Matches "x" only if "x" is followed by "y".
          </dd>

          <dt>
            <code>x(?!y)</code>
          </dt>
          <dd>
            Negative lookahead assertion: Matches "x" only if "x" is not
            followed by "y".
          </dd>

          <dt>
            <code>(?&lt;=y)x</code>
          </dt>
          <dd>
            Lookbehind assertion: Matches "x" only if "x" is preceded by "y".
          </dd>

          <dt>
            <code>(?&lt;!y)x</code>
          </dt>
          <dd>
            Negative lookbehind assertion: Matches "x" only if "x" is not
            preceded by "y".
          </dd>
        </dl>

        <h2>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers#types"
            target="_blank"
          >
            Quantifiers
          </a>
        </h2>
        <dl>
          <dt>
            <code>x*</code>
          </dt>
          <dd>Matches the preceding item "x" 0 or more times.</dd>

          <dt>
            <code>x+</code>
          </dt>
          <dd>Matches the preceding item "x" 1 or more times.</dd>

          <dt>
            <code>x?</code>
          </dt>
          <dd>Matches the preceding item "x" 0 or 1 times.</dd>

          <dt>
            <code>x&lbrace;n&rbrace;</code>
          </dt>
          <dd>
            Where "n" is a positive integer, matches exactly "n" occurrences of
            the preceding item "x".
          </dd>

          <dt>
            <code>x&lbrace;n,&rbrace;</code>
          </dt>
          <dd>
            Where "n" is a positive integer, matches at least "n" occurrences of
            the preceding item "x".
          </dd>

          <dt>
            <code>x&lbrace;n,m&rbrace;</code>
          </dt>
          <dd>
            Where "n" is 0 or a positive integer, "m" is a positive integer, and{" "}
            <code>m &gt; n</code>, matches at least "n" and at most "m"
            occurrences of the preceding item "x".{" "}
          </dd>

          <dt>
            <code>x*?</code>
            <br />
            <code>x+?</code>
            <br />
            <code>x??</code>
            <br />
            <code>x&lbrace;n&rbrace;?</code>
            <br />
            <code>x&lbrace;n,&rbrace;?</code>
            <br />
            <code>x&lbrace;n,m&rbrace;?</code>
          </dt>
          <dd>
            The <code>?</code> character after the quantifier makes the
            quantifier "non-greedy": meaning that it will stop as soon as it
            finds a match.
          </dd>
        </dl>
        <p>
          Source:{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions"
            target="_blank"
          >
            MDN Web Docs
          </a>
        </p>
      </article>
    </div>
  );
};
