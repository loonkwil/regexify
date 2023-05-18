import { isServer } from "solid-js/web";
import { onCleanup } from "solid-js";

/**
 * @param {Object} options
 * @param {string} options.key
 * @param {boolean=} options.ctrlKey
 * @param {boolean=} options.altKey
 * @param {boolean=} options.metaKey
 * @param {boolean=} options.shiftKey
 * @param {function(KeyboardEvent)} cb
 */
export default (
  { key, ctrlKey = false, altKey = false, metaKey = false, shiftKey = false },
  cb
) => {
  if (isServer) {
    return;
  }

  const handler = (e) => {
    if (
      key.toLowerCase() === e.key &&
      ctrlKey === e.ctrlKey &&
      altKey === e.altKey &&
      metaKey === e.metaKey &&
      shiftKey === e.shiftKey
    ) {
      cb(e);
    }
  };
  window.addEventListener("keydown", handler);
  onCleanup(() => {
    window.removeEventListener("keydown", handler);
  });
};
