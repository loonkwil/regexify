import { vi } from "vitest";
import markText from "./markText";

describe("markText", () => {
  test("it should mark the text", () => {
    const text = "foo bar baz";
    const boundaries = [
      [0, 3],
      [4, 7],
    ];
    const marker = (selected) => `*${selected}*`;
    expect(markText(text, boundaries, marker).join("")).toBe("*foo* *bar* baz");
  });

  test("it should return with the original text if there are no indices", () => {
    const text = "foo bar baz";
    const boundaries = [];
    const marker = (selected) => selected;
    expect(markText(text, boundaries, marker)).toEqual([text]);
  });

  test("it should call the marker function with the proper arguments", () => {
    const text = "foo bar baz";
    const boundaries = [
      [0, 3],
      [4, 7],
      [8, 11],
    ];
    const marker = vi.fn((selected) => selected);
    markText(text, boundaries, marker);

    expect(marker).toHaveBeenCalledTimes(3);
    expect(marker).toHaveBeenNthCalledWith(1, "foo", 0, boundaries[0]);
    expect(marker).toHaveBeenNthCalledWith(2, "bar", 1, boundaries[1]);
    expect(marker).toHaveBeenNthCalledWith(3, "baz", 2, boundaries[2]);
  });

  test("it should offset the coordinates", () => {
    const text = "foo bar";
    const boundaries = [[5, 8]];
    const offset = 1;
    const marker = (selected) => `*${selected}*`;
    expect(markText(text, boundaries, marker, offset).join("")).toBe(
      "foo *bar*"
    );
  });

  test("it should skip the coordinates if it is undefined", () => {
    const text = "foo bar";
    const boundaries = [undefined, [4, 7]];
    const marker = vi.fn((selected) => selected);
    markText(text, boundaries, marker);

    expect(marker).toHaveBeenCalledTimes(1);
    expect(marker).toHaveBeenNthCalledWith(1, "bar", 1, boundaries[1]);
  });
});
