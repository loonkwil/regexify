import { A } from "solid-start";
import { LeftArrow } from "../../components/icons";
import styles from "./index.module.css";

export default () => (
  <div class={styles.root}>
    <A href="/" title="Home">
      <LeftArrow />
    </A>
    <article>
      <h2>
        <a href="#">Flags</a>
      </h2>
      <dl>
        <dt>d</dt>
        <dd>Generate indices for substring matches.</dd>
      </dl>
    </article>
  </div>
);
