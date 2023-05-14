import { A } from "solid-start";
import { Index } from "solid-js";
import { Book } from "~/components/icons";
import EnhancedTextarea from "~/components/EnhancedTextarea";
import { useAppState } from "~/context/app";
import { pickOne, range } from "~/lib/helpers";
import styles from "./index.module.css";

function Header() {
  return (
    <header class={styles.header}>
      <div>
        <h1>JavaScript RegExp Tester</h1>
        <p class={styles.privacy}>
          <small>
            Everything is calculated in your browser.
            <br />
            Your data will not be uploaded or stored anywhere.
          </small>
        </p>
      </div>
      <div>
        <A href="/cheat-sheet" title="RegExp Cheat Sheet">
          <Book />
        </A>
      </div>
    </header>
  );
}

function Pattern() {
  const [state, { setPattern }] = useAppState();
  return (
    <section class={styles.pattern}>
      <EnhancedTextarea
        label="Pattern"
        spellcheck="false"
        invalid={
          state.patternRegExp instanceof Error
            ? state.patternRegExp.message
            : ""
        }
        value={state.patternString}
        setValue={setPattern}
      />
    </section>
  );
}

function Input() {
  const [state, { setInput }] = useAppState();
  return (
    <section class={styles.input}>
      <EnhancedTextarea
        label="Input"
        spellcheck="false"
        autofocus
        highlights={state.matches.map((match) => {
          const [[_, start, end]] = match;
          return [start, end];
        })}
        value={state.inputString}
        setValue={setInput}
      />
    </section>
  );
}

function Matches() {
  const [state] = useAppState();
  return (
    <section class={styles.matches}>
      <Show when={state.matches.length > 0} fallback={<p>No match</p>}>
        <table>
          <thead>
            <tr>
              <th>$&</th>
              <Index each={range(1, state.matches[0].length)}>
                {(i) => <th>{`$${i()}`}</th>}
              </Index>
            </tr>
          </thead>
          <tbody>
            <Index each={state.matches}>
              {(match) => (
                <tr>
                  <Index each={match()}>
                    {(groups) => <td>{groups()[0]}</td>}
                  </Index>
                </tr>
              )}
            </Index>
          </tbody>
        </table>
      </Show>
    </section>
  );
}

function Footer() {
  const tips = [
    "You can search in a large text because the app is using WebWorkers.",
    "Use Ctrl + p to select the pattern and Ctrl + i to select the input field.",
    "Use Ctrl + m to open the cheat sheet and Esc to come back to the home page.",
    "Use Ctrl + s to copy the RegExp.",
    "You can use a multiline string as a pattern",
  ];
  const tip = pickOne(tips);

  return (
    <footer class={styles.footer}>
      <p>
        <small>Tip: {tip}</small>
      </p>
    </footer>
  );
}

export default () => (
  <div class={styles.root}>
    <Header />
    <Pattern />
    <Input />
    <Matches />
    <Footer />
  </div>
);
