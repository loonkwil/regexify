import { createContext, useContext, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { getRegExpFromString } from "~/lib/helpers";

const AppContext = createContext();

/**
 * @typedef {Object} AppState
 * @property {string} patternString
 * @property {string} inputString
 * @property {RegExp | SyntaxError} patternRegExp
 * @property {Array} matches
 */

/**
 * @typedef {Object} Setters
 * @property {function(string)} setInput
 * @property {function(string)} setPattern
 */

/**
 * @param {Object} props
 * @param {string=} props.pattern
 * @param {string=} props.input
 * @returns {import('solid-js').JSX.Element}
 */
export function AppProvider(props) {
  let getPatternRegExp;
  let getMatches;

  const [appState, setAppState] = createStore({
    patternString: props.pattern ?? "",
    inputString: props.input ?? "",

    get patternRegExp() {
      return getPatternRegExp();
    },

    get matches() {
      return getMatches();
    },
  });

  getPatternRegExp = createMemo(() => {
    try {
      return getRegExpFromString(appState.patternString);
    } catch (e) {
      return e;
    }
  });

  getMatches = createMemo(() => {
    const { patternRegExp: regexp, inputString: input } = appState;

    const isValid = regexp instanceof RegExp;
    if (!isValid) {
      return [];
    }

    // Set the "d" flag in order to read the indices of the matching groups
    const regexpWithIndices = regexp.hasIndices
      ? regexp
      : new RegExp(regexp, `${regexp.flags}d`);

    let matches;
    if (regexpWithIndices.global) {
      matches = input.matchAll(regexpWithIndices);
    } else {
      const match = input.match(regexpWithIndices);
      matches = match ? [match] : [];
    }

    return Array.from(matches, (match) => {
      const { indices } = match;
      return Array.from(match, (group, index) => {
        const position = indices[index] ?? [];
        return [group, ...position];
      });
    });
  });

  const app = [
    appState,
    {
      setInput(value) {
        setAppState("inputString", value);
      },
      setPattern(value) {
        setAppState("patternString", value);
      },
    },
  ];

  return (
    <AppContext.Provider value={app}>{props.children}</AppContext.Provider>
  );
}

/**
 * @returns {[AppState, Setters]}
 */
export function useAppState() {
  return useContext(AppContext);
}
