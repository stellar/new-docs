import { slugify } from "../slugify";

describe("slugify", () => {
  it("Converts titles to slugs", () => {
    const titles = [
      ["Organizational Development", "organizational-development"],
      ["Ecosystem Development", "ecosystem-development"],
      [
        "Product and Technology Development",
        "product-and-technology-development",
      ],
      ["First steps", "first-steps"],
      ["For token issuers", "for-token-issuers"],
      ["For money transfer operators", "for-money-transfer-operators"],
      ["For wallets and exchanges", "for-wallets-and-exchanges"],
      ["For individuals", "for-individuals"],
    ];
    titles.forEach(([title, slug]) => expect(slugify(title)).toBe(slug));
  });
});
