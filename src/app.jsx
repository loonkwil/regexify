import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { isServer } from "solid-js/web";
import { Suspense, Show, ErrorBoundary } from "solid-js";
import { AppProvider } from "~/context/app";
import ErrorMessage from "~/components/ErrorMessage";
import {
  isModernRegExpSupported,
  isCSSNestingSupported,
} from "~/lib/featureDetection";
import "./app.css";

export default function App() {
  const base = import.meta.env.SERVER_BASE_URL.replace(/\/$/, "");
  return (
    <Router
      base={base}
      root={props => (
        <MetaProvider>
          <Title>Regexify</Title>
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
                      rel="noreferrer"
                    >
                      nested CSS
                    </a>{" "}
                    and the{" "}
                    <a
                      href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll"
                      rel="noreferrer"
                      target="_blank"
                    >
                      matchAll
                    </a>{" "}
                    RegExp function (Chrome 112+, Safari 16.5+, Firefox 117+).
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
              <AppProvider>
                <Suspense>{props.children}</Suspense>
              </AppProvider>
            </ErrorBoundary>
          </Show>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
