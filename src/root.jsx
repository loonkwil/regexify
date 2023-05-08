// @refresh reload
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Link,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Regexify</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="color-scheme" content="light dark" />

        <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <Body>
        <ErrorBoundary>
          <Routes>
            <FileRoutes />
          </Routes>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
