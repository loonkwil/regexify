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
import { isServer } from "solid-js/web";
import { Show } from "solid-js";
import { AppProvider } from "~/context/app";
import ErrorMessage from "~/components/ErrorMessage";
import {
  isModernRegExpSupported,
  isCSSNestingSupported,
} from "~/lib/featureDetection";
import "./root.css";

export default function Root() {
  const initialPattern = "/(?<modifier>ctrl|alt|cmd)\\s?[+]\\s?(?<key>\\w)/gi";
  const initialInput = `🐭 Size and Speed
It takes less than 50 kB to render the initial page.
SolidJS and Server Side Rendering are used to be fast.

🔒 Privacy
Everything is calculated in your browser.
Your data will not be uploaded or stored anywhere.
There are no ads or cookies.

⌨️ Keyboard Shortcuts
Select pattern: Ctrl + P.
Select input field: Ctrl + I.
Copy RegExp: Ctrl + S.
Open cheat sheet: Ctrl + M (hit Ctrl + M again to close it).

✨ Extended RegExp
You can use a multiline string as a pattern.`;

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
        <Show
          when={
            isServer || (isModernRegExpSupported() && isCSSNestingSupported())
          }
          fallback={
            <ErrorMessage
              message={
                <>
                  Your Browser is not Supported
                  <br />
                  Try to use a browser that supports{" "}
                  <a
                    href="https://drafts.csswg.org/css-nesting/"
                    target="_blank"
                  >
                    nested CSS
                  </a>{" "}
                  and the{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll"
                    target="_blank"
                  >
                    matchAll
                  </a>{" "}
                  RegExp function (Chrome 112+, Safari 16.5+, Firefox 116+).
                </>
              }
            />
          }
        >
          <ErrorBoundary
            fallback={(e) => (
              <ErrorMessage
                message={
                  <>
                    Something Went Wrong
                    <br />
                    <a href="/">Try to reload the page</a>
                  </>
                }
                error={e}
              />
            )}
          >
            <AppProvider pattern={initialPattern} input={initialInput}>
              <Routes>
                <FileRoutes />
              </Routes>
            </AppProvider>
          </ErrorBoundary>
        </Show>
        <Scripts />
      </Body>
    </Html>
  );
}
