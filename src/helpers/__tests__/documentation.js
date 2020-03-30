import { buildDocsContents, buildAttributesList } from "../documentation";
import { input, output, attributes } from "./fixtures/documentation";

describe("buildDocsContents", () => {
  it("matches snapshot", () => {
    expect(buildDocsContents(input.basic, "docs")).toStrictEqual(output.basic);
  });
});

describe("buildAttributesList", () => {
  it("Handles empty type fields", () => {
    expect(buildAttributesList(attributes.deeplyNested)).toMatchSnapshot();
  });
  it("Throws with missing whitespace", () => {
    expect(() =>
      buildAttributesList(attributes.throwOnMissingWhitespace),
    ).toThrow("No description found");
  });
  it("parses _links correctly", () => {
    expect(buildAttributesList(attributes.weirdString)).toMatchSnapshot();
  });
});
