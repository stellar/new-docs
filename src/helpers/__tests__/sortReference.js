import { flattenAndSort } from "../sortReference";
import {
  doubleDepthNestedInput,
  doubleDepthNestedOutput,
} from "./fixtures/sortReference";

/* Testing for Multiple Nested Item */
describe("flattenAndSort", () => {
  it("matches snapshot", () => {
    expect(flattenAndSort(doubleDepthNestedInput)).toStrictEqual(
      doubleDepthNestedOutput,
    );
  });
});
