import {
  createContext,
  useContext,
  createSignal,
  createMemo,
  createEffect,
  onCleanup,
  batch,
  on,
} from "solid-js";
import getRegExpFromString from "~/lib/getRegExpFromString";

/**
 * @typedef {Object} Matches
 * @property {Array<Array<string>>} texts
 * @property {Array<Array<number>>} indices
 */

/**
 * @typedef {Object} AppState
 * @property {string} patternString
 * @property {RegExp|SyntaxError} patternRegExp
 * @property {boolean} animatePattern
 * @property {string} inputString
 * @property {?Array<number>} hoverPosition
 * @property {boolean} processing
 * @property {Matches} matches
 */

/**
 * @typedef {Object} Setters
 * @property {function(string)} setPattern
 * @property {function(boolean)} setAnimatePattern
 * @property {function(string)} setInput
 * @property {function(?Array<number>=)} setHoverPosition
 */

const AppContext = createContext();

/**
 * @param {Object} props
 * @param {string=} props.pattern
 * @param {string=} props.input
 * @returns {import('solid-js').JSX.Element}
 */
export function AppProvider(props) {
  const [patternString, setPatternString] = createSignal(props.pattern ?? "");
  const patternRegExp = createMemo(() => {
    try {
      return getRegExpFromString(patternString());
    } catch (e) {
      return e;
    }
  });
  const [animatePattern, setAnimatePattern] = createSignal(false);

  const [inputString, setInputString] = createSignal(props.input ?? "");

  const [hoverPosition, setHoverPosition] = createSignal(null);

  const [processing, setProcessing] = createSignal(false);

  /** @returns {Matches} */
  const calculateMatches = () => {
    const texts = [];
    const indices = [];

    const regExp = patternRegExp();
    const input = inputString();
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
        indices.push(Array.from(match.indices));
      }
    }

    return { texts, indices };
  };

  const updateMatches = () => {
    batch(() => {
      setMatches(calculateMatches());
      setProcessing(false);
    });
  };

  const [matches, setMatches] = createSignal(calculateMatches());

  let tick;
  createEffect(
    on(
      [patternRegExp, inputString],
      () => {
        clearTimeout(tick);

        const isLargeInput = inputString().length > 1e4;
        if (isLargeInput) {
          setProcessing(true);
          tick = setTimeout(updateMatches, 200);
        } else {
          updateMatches();
        }

        onCleanup(() => clearTimeout(tick));
      },
      // Do not run the computation immediately.
      // The initial value of the matches signal has the correct values.
      { defer: true }
    )
  );

  const app = [
    {
      patternString,
      patternRegExp,
      animatePattern,
      inputString,
      hoverPosition,
      processing,
      matches,
    },
    {
      setPattern: setPatternString,
      setAnimatePattern,
      setInput: setInputString,
      setHoverPosition,
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
