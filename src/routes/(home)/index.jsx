import { A, Title, Style, useNavigate } from "solid-start";
import { createMemo, createSignal, Show, Switch, Match } from "solid-js";
import EnhancedTextarea from "~/components/EnhancedTextarea";
import HighlightWhiteSpace from "~/components/HighlightWhiteSpace";
import Table from "~/components/Table";
import range from "~/lib/range";
import { useAppState } from "~/context/app";
import styles from "./index.module.css";
import createShortcut from "~/lib/createShortcut";

function Header(props) {
  return (
    <header>
      <h1 id={props.id}>JavaScript RegExp Tester</h1>
    </header>
  );
}

function Navigation() {
  return (
    <nav>
      <A
        href="/cheat-sheet"
        title="RegExp Cheat Sheet (Ctrl + M)"
        aria-label="Click here to open the RegExp Cheat Sheet"
        aria-keyshortcuts="Control+M"
      >
        <svg width="24" height="24" role="presentation">
          <use href={`${import.meta.env.BASE_URL}icons.svg#book`} />
        </svg>
      </A>
    </nav>
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
        id="pattern"
        title="RegExp pattern (Ctrl + P)"
        ariaLabel="RegExp pattern"
        ariaKeyshortcuts="Control+P"
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
          id="input"
          title="Text input (Ctrl + I)"
          ariaLabel="Text input"
          ariaKeyshortcuts="Control+I"
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
  const [showAll, setShowAll] = createSignal(false);
  return (
    <output class={styles.matches} for="input pattern" aria-label="Matches">
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
            data={state.matches().texts}
            rowLimit={showAll() ? Infinity : 10}
            onShowAllRequest={() => setShowAll(true)}
            renderCell={(cell) => (
              <HighlightWhiteSpace>{cell}</HighlightWhiteSpace>
            )}
            onHover={setHoverPosition}
            onLeave={setHoverPosition}
          />
        </Match>
      </Switch>
    </output>
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
      <Title>Home Page - Regexify</Title>

      <Header id="title" />
      <Navigation />
      <main class={styles.main} aria-labelledby="title">
        <Pattern ref={patternEl} />
        <Input ref={inputEl} />
        <Matches />
      </main>
    </div>
  );
};
