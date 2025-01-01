import { HttpStatusCode } from "@solidjs/start";
import { A } from "@solidjs/router";
import ErrorMessage from "~/components/ErrorMessage";

export default () => (
  <>
    <HttpStatusCode code={404} />
    <ErrorMessage
      message={
        <>
          404 Page Not Found
          <br />
          <A href="/">Go Back to the Home Page</A>
        </>
      }
    />
  </>
);
