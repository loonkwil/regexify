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
import { AppProvider } from "./context/app";
import "./root.css";

export default function Root() {
  const initialPattern = "/(?<cols>\\d+)x(?<rows>\\d+)/gi";
  const initialInput = `/13x13/1c00a005000001400a00700000000000
/13/1c00a005000001400a00700000000000
/13x12/1c00a005000001400a00700000000000
/13xA/1c00a005000001400a00700000000000`;

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
          <AppProvider pattern={initialPattern} input={initialInput}>
            <Routes>
              <FileRoutes />
            </Routes>
          </AppProvider>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
