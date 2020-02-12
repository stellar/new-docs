import { toFormattedNumber } from "../number";

describe("toFormattedNumber", () => {
  it("Formats English numbers with precision 2", () => {
    expect(toFormattedNumber({ amount: 1000 })).toBe("1,000.00");
  });
});
