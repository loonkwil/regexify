import { HttpStatusCode } from "solid-start/server";
import ErrorMessage from "~/components/ErrorMessage";

export default () => (
  <>
    <HttpStatusCode code={404} />
    <ErrorMessage message="404 Page Not Found" />
  </>
);
