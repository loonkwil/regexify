import { vi } from "vitest";
import { getRandomInt, pickOne, range, getRegExpFromString } from "./helpers";

describe("getRandomInt", () => {
  beforeEach(() => {
    vi.spyOn(global.Math, "random");
  });

  afterEach(() => {
    vi.spyOn(global.Math, "random").mockRestore();
  });

  test('it should generate number which are greater or equal than "min"', () => {
    const min = 10;
    const max = 20;

    global.Math.random.mockReturnValue(0);
    expect(getRandomInt(min, max)).toBe(min);

    global.Math.random.mockReturnValue(0.5);
    expect(getRandomInt(min, max)).toBeGreaterThan(min);
  });

  test('it should generate number which are less than "max"', () => {
    const min = 10;
    const max = 20;

    global.Math.random.mockReturnValue(1 - 1e-10);
    expect(getRandomInt(min, max)).toBeLessThan(max);
  });
});

describe("pickOne", () => {
  beforeEach(() => {
    vi.spyOn(global.Math, "random");
  });

  afterEach(() => {
    vi.spyOn(global.Math, "random").mockRestore();
  });

  test("it should return undefined if the array is empty", () => {
    expect(pickOne([])).toBe(undefined);
  });

  test("it should pick one element from the array", () => {
    const arr = ["a", "b", "c", "d", "e"];

    global.Math.random.mockReturnValue(0);
    const first = arr[0];
    expect(pickOne(arr)).toBe(first);

    global.Math.random.mockReturnValue(0.5);
    const middle = arr[Math.floor(arr.length / 2)];
    expect(pickOne(arr)).toBe(middle);

    global.Math.random.mockReturnValue(1 - 1e-10);
    const last = arr[arr.length - 1];
    expect(pickOne(arr)).toBe(last);
  });
});

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
