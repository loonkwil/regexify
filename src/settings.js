export const initialPattern =
  "/(?<modifier>ctrl|alt|cmd)\\s?[+]\\s?(?<key>\\w)/gi";

export const initialInput = `🐭 Size and Speed
It takes less than 30 kB to render the initial page.
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

// Debounce input events if the text is too large
export const largeInput = 1e4;

export const debounceTimeoutInMs = 200;
