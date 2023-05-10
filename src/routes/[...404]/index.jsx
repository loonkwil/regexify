import { HttpStatusCode } from "solid-start/server";
import styles from "./index.module.css";

export default () => (
  <>
    <HttpStatusCode code={404} />
    <div class={styles.root}>
      <h2>(☉_☉)</h2>
      <p>404 Page Not Found</p>
    </div>
  </>
);
