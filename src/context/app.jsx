import { createContext, useContext, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import getRegExpFromString from "~/lib/getRegExpFromString";

const AppContext = createContext();

/**
 * @typedef {Object} AppState
 * @property {string} patternString
 * @property {string} inputString
 * @property {RegExp | SyntaxError} patternRegExp
 * @property {{
 *   texts: Array<Array<string>>,
 *   indices: Array<Array<number>>
 * }} matches
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
    const { patternRegExp: regExp, inputString: input } = appState;

    const texts = [];
    const indices = [];

    const isValid = regExp instanceof RegExp;
    if (isValid) {
      // Set the "d" flag in order to read the indices of the matching groups
      const regExpWithIndices = regExp.hasIndices
        ? regExp
        : new RegExp(regExp, `${regExp.flags}d`);

      let matches;
      if (regExpWithIndices.global) {
        matches = input.matchAll(regExpWithIndices);
      } else {
        const match = input.match(regExpWithIndices);
        matches = match ? [match] : [];
      }

      for (let match of matches) {
        texts.push(Array.from(match));
        indices.push(match.indices);
      }
    }

    return { texts, indices };
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
