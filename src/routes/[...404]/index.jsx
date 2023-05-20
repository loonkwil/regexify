import { HttpStatusCode } from "solid-start/server";
import { A } from "solid-start";
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
