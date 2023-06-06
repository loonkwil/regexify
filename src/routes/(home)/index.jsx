import { A, Style, useNavigate } from "solid-start";
import { createMemo, Show, Switch, Match } from "solid-js";
import { Book } from "~/components/icons";
import EnhancedTextarea from "~/components/EnhancedTextarea";
import Table from "~/components/Table";
import range from "~/lib/range";
import { useAppState } from "~/context/app";
import styles from "./index.module.css";
import createShortcut from "~/lib/createShortcut";

function Header() {
  return (
    <header class={styles.header}>
      <div>
        <h1>JavaScript RegExp Tester</h1>
      </div>
      <div>
        <A href="/cheat-sheet" title="RegExp Cheat Sheet (Ctrl + M)">
          <Book />
        </A>
      </div>
    </header>
  );
}

/**
 * @param {Object} props
 * @param {Function} props.ref
 */
function Pattern(props) {
  const [state, { setPattern, setAnimatePattern }] = useAppState();
  return (
    <section
      class={styles.pattern}
      onAnimationEnd={() => setAnimatePattern(false)}
    >
      <EnhancedTextarea
        ref={props.ref}
        containerClasses={state.animatePattern() ? styles.animate : ""}
        label="Pattern"
        title="RegExp pattern (Ctrl + P)"
        spellcheck="false"
        invalid={
          state.patternRegExp() instanceof Error
            ? state.patternRegExp().message
            : ""
        }
        value={state.patternString()}
        setValue={setPattern}
      />
    </section>
  );
}

/**
 * @param {Object} props
 * @param {Function} props.ref
 */
function Input(props) {
  const [state, { setInput }] = useAppState();
  const selector = createMemo(() => {
    if (!state.hoverPosition()) {
      return null;
    }

    const [row, col] = state.hoverPosition();
    const isHeader = row === -1;
    const isFirstColumn = col === 0;

    if (isHeader && isFirstColumn) {
      return null;
    }

    let selector = `.${styles.input}`;

    if (!isHeader) {
      selector += ` [data-row="${row}"]`;
    }

    if (!isFirstColumn) {
      selector += ` [data-col="${col - 1}"]`;
    }

    return selector;
  });

  const highlights = createMemo(() => {
    if (state.processing()) {
      return [];
    }
    return state.matches().indices;
  });

  return (
    <>
      <Style>
        {
          // Hack: if the Style tag is empty, Solid Start will render it like
          // this: "<style />" which is invalid, hence the fallback attribute.
        }
        <Show when={selector()} fallback={" "}>
          {`${selector()} { background-color: var(--mark-bg-active); }`}
        </Show>
      </Style>
      <section class={styles.input}>
        <EnhancedTextarea
          ref={props.ref}
          label="Input"
          title="Text input (Ctrl + I)"
          spellcheck="false"
          autofocus
          highlights={highlights()}
          value={state.inputString()}
          setValue={setInput}
        />
      </section>
    </>
  );
}

function Matches() {
  const [state, { setHoverPosition }] = useAppState();
  return (
    <section class={styles.matches}>
      <Switch>
        <Match when={state.processing()}>
          <p>Processing...</p>
        </Match>
        <Match when={state.matches().texts.length === 0}>
          <p>No match</p>
        </Match>
        <Match when={true}>
          <Table
            header={[
              "$&",
              ...range(1, state.matches().texts[0].length).map((i) => `$${i}`),
            ]}
            onHover={setHoverPosition}
            onLeave={setHoverPosition}
            data={state.matches().texts}
            rowLimit={10}
          />
        </Match>
      </Switch>
    </section>
  );
}

export default () => {
  const navigate = useNavigate();
  createShortcut({ key: "m", ctrlKey: true }, (e) => {
    e.preventDefault();
    navigate("/cheat-sheet");
  });

  let patternEl;
  createShortcut({ key: "p", ctrlKey: true }, (e) => {
    e.preventDefault();
    patternEl?.focus();
  });

  let inputEl;
  createShortcut({ key: "i", ctrlKey: true }, (e) => {
    e.preventDefault();
    inputEl?.focus();
  });

  const [state, { setAnimatePattern }] = useAppState();
  createShortcut({ key: "s", ctrlKey: true }, (e) => {
    e.preventDefault();
    const text = state.patternRegExp().toString();
    navigator.clipboard.writeText(text).then(() => {
      setAnimatePattern(true);
    });
  });

  return (
    <div class={styles.root}>
      <Header />
      <Pattern ref={patternEl} />
      <Input ref={inputEl} />
      <Matches />
    </div>
  );
};
