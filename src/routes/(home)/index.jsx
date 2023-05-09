import { A } from "solid-start";
import { Book } from "~/components/icons";
import EnhancedTextarea from "~/components/EnhancedTextarea";
import { pickOne } from "~/lib/helpers";
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
  return (
    <section class={styles.pattern}>
      <EnhancedTextarea
        spellcheck="false"
        label="Pattern"
        initialValue="/(?<cols>\d+)x(?<rows>\d+)/i"
        invalid="Invalid RegExp"
      />
    </section>
  );
}

function Input() {
  return (
    <section class={styles.input}>
      <EnhancedTextarea
        spellcheck="false"
        label="Input"
        initialValue="/13x13/1c00a005000001400a00700000000000
/13/1c00a005000001400a00700000000000
/13x12/1c00a005000001400a00700000000000
/13xA/1c00a005000001400a00700000000000"
        highlights={[
          [1, 5],
          [78, 5],
        ]}
        autofocus
      />
    </section>
  );
}

function Matches() {
  return (
    <section class={styles.matches}>
      <table>
        <thead>
          <tr>
            <th>{`$&`}</th>
            <th>{`$1`}</th>
            <th>{`$2`}</th>
            <th>{`$<cols>`}</th>
            <th>{`$<rows>`}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>13x13</td>
            <td>13</td>
            <td>13</td>
            <td>13</td>
            <td>13</td>
          </tr>
          <tr>
            <td>13x12</td>
            <td>13</td>
            <td>12</td>
            <td>13</td>
            <td>12</td>
          </tr>
        </tbody>
      </table>
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
