import { A } from "solid-start";
import { Book } from "../../components/icons";
import EnhancedTextarea from "../../components/EnhancedTextarea";
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
  return (
    <footer class={styles.footer}>
      <p>
        <small>Tip: You can use a multiline string as a pattern.</small>
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
