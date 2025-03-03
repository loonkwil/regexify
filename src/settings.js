export const initialPattern =
  "/(?<modifier>ctrl|alt|cmd)\\s?[+]\\s?(?<key>\\w)/gi";

export const initialInput = `🐭 Size and Speed
It uses SolidJS and Server Side Rendering to be fast.
The initial page is less than 40kB.

♿️ Accessibility
Keyboard navigation, screen readers, light and dark modes, and high contrast are supported.

⌨️ Keyboard Shortcuts
Select pattern: Ctrl + P.
Select input field: Ctrl + I.
Copy RegExp: Ctrl + S.
Open cheat sheet: Ctrl + M (hit Ctrl + M again to close it).

🔒 Privacy
Everything is calculated in your browser.
Your data will not be uploaded or stored anywhere.
There are no ads or cookies.

✨ Extended RegExp
You can use a multiline string as a pattern.`;

// Debounce input events if the text is too large
export const largeInput = 1e4;

export const debounceTimeoutInMs = 200;
