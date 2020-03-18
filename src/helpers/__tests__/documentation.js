import { buildDocsContents } from "../documentation";
import { input, output } from "./fixtures/documentation";

describe("buildDocsContents", () => {
  it("matches snapshot", () => {
    expect(buildDocsContents(input.basic, "docs")).toStrictEqual(output.basic);
  });
});
