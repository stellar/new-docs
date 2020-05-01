import { isRelativeUrl, resolveRelativePath } from "../routes";

describe("isRelativeUrl", () => {
  it("is false on external urls", () => {
    const paths = [
      "https://example.com/",
      "https://example.com/butts",
      "https://example.com/butts#wow",
      "https://example.com/butts?stuff=thing",
      "https://example.com/butts?stuff=thing#wow",
      "https://example.com:39284/butts?stuff=thing#wow",
    ];
    expect.assertions(paths.length);
    paths.forEach((path) => {
      expect(isRelativeUrl(path)).toBe(false);
    });
  });
  it("is true on relative pathnames", () => {
    const paths = [
      "../index.mdx",
      "../index.mdx#wow",
      "../index.mdx?stuff=thing",
      "../index.mdx?stuff=thing#wow",

      "./index.mdx",
      "./index.mdx#wow",
      "./index.mdx?stuff=thing",
      "./index.mdx?stuff=thing#wow",

      "index.mdx",
      "index.mdx#wow",
      "index.mdx?stuff=thing",
      "index.mdx?stuff=thing#wow",
    ];
    expect.assertions(paths.length);
    paths.forEach((path) => {
      expect(isRelativeUrl(path)).toBe(true);
    });
  });
  it("is false on absolute pathnames", () => {
    const paths = [
      "/index.mdx",
      "/index.mdx#wow",
      "/index.mdx?stuff=thing",
      "/index.mdx?stuff=thing#wow",
    ];
    expect.assertions(paths.length);
    paths.forEach((path) => {
      expect(isRelativeUrl(path)).toBe(false);
    });
  });
});

describe("resolveRelativePath", () => {
  it("resolves with a filename and relative path", () => {
    const paths = [
      ["path/to/file.mdx", "../something", "/path/something/"],
      ["path/to/file.mdx", "./something", "/path/to/something/"],
      ["path/to/file.mdx", "something", "/path/to/something/"],
      ["path/to/file.mdx", "../../../something", "/something/"],
      ["path/to/file.mdx", "../../../../../../../../something", "/something/"],
    ];
    expect.assertions(paths.length);
    paths.forEach(([file, relativePath, expectedPath]) => {
      expect(resolveRelativePath(file, relativePath)).toBe(expectedPath);
    });
  });
});
