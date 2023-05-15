import { range, getRegExpFromString } from "./helpers";

describe("range", () => {
  test.each([
    // start, end, expected
    [-1, 2, [-1, 0, 1]],
    [1, 2, [1]],
  ])("it should create the range", (start, end, expected) => {
    expect(range(start, end)).toMatchObject(expected);
  });

  test("it should create an empty range if the start and the end is equal", () => {
    expect(range(1, 1)).toHaveLength(0);
  });
});

describe("getRegExpFromString", () => {
  test.each([
    "/",
    "/(?:)/z", // Invalid flag
    "/[/g",
  ])("it should throw an error if the RegExp is invalid", (pattern) => {
    expect(() => getRegExpFromString(pattern)).toThrowError(SyntaxError);
  });

  test("it should convert the string literal to a RegExp object", () => {
    const str = "/./g";
    const regexp = getRegExpFromString(str);
    expect(regexp).toBeInstanceOf(RegExp);
    expect(regexp.toString()).toBe(str);
  });

  test("it should work with a multiline pattern", () => {
    const str = `/
[0-9]+/`;
    const regexp = getRegExpFromString(str);
    expect("1234".match(regexp)[0]).toEqual("1234");
  });
});
