/**
 * Convert a string to a URL slug.
 * @param {string} string Random text, with symbols and mixed case maybe.
 * @returns {string} A string with no spaces or symbols, all lowercase.
 */
export const slugify = (string) =>
  string
    .replace(/[“‘”’'",.<>/?[\]\\|{}=+()]/g, "")
    .trim()
    .split(" ")
    .join("-")
    .toLowerCase();
