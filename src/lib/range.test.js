import range from "./range";

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
