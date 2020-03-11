export const extractTextFromAst = (ast) =>
  ast.children
    .flatMap(handleNode)
    .join("")
    .trim();

const handleNode = (astNode) => {
  const children = astNode.children
    ? astNode.children.flatMap(handleNode).join("")
    : "";

  switch (astNode.type) {
    case "text":
      return astNode.value;
    case "paragraph":
      return `${children} `;
    case "heading":
      return "";
    default:
      return children;
  }
};

const DESCRIPTION_LENGTH = 160;
export const getDescriptionFromAst = (ast) => {
  // slice the string at the description length + some padding, so we're not
  // processing a massive amount of text we know won't be used.
  // We want to truncate at a word boundary, so split the string and
  // concatenate until we go over the limit. If the last word is SUPER long (like
  // a URL) we'll end up blowing the limit by a lot, but most of the time it'll
  // be fine.
  const bodyText = extractTextFromAst(ast).slice(0, DESCRIPTION_LENGTH * 1.5);
  const bodyWords = bodyText.split(" ");
  return bodyWords.reduce((accum, word) => {
    if (accum.length > DESCRIPTION_LENGTH) {
      return accum;
    }
    const newDescription = `${accum} ${word}`;
    if (newDescription.length > DESCRIPTION_LENGTH) {
      return `${newDescription}…`;
    }
    return newDescription;
  }, "");
};
