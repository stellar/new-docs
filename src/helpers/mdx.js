import { DOCS_CONTENT_URL } from "helpers/documentation";

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

/**
 *
 * @param {object} node a Gatsby MDX node.
 * @param {string} node.id MDX id
 * @param {object} node.frontmatter frontmatter
 * @param {string} node.frontmatter.order order
 * @param {string} node.frontmatter.title title
 * @param {string} node.body body
 * @param {object} node.parent parent
 * @param {string} node.parent.relativeDirectory relativeDirectory
 * @param {string} [node.parent.relativePath] relativePath
 * @param {object} [node.parent.fields] fields
 * @param {object} [node.parent.fields.metadata.data.order] order
 * @param {object} [node.parent.fields.metadata.data.title] title
 *
 * @returns {object} An object with the below keys. Any missing fields on the
 * input will produce `undefined`. on the output.
 * id
 * order
 * title
 * githubLink
 * body
 * directory
 * currentDirectory
 * folder: {
 *   order
 *   title
 * }
 * ...node
 */
export const normalizeMdx = (node) => {
  const { id, frontmatter = {}, body, parent = {} } = node;
  const metadata = parent.fields?.metadata.data || {};
  const parentRelativeDirSplit = parent.relativeDirectory?.split("/");
  const mdxLink = parent.relativePath && DOCS_CONTENT_URL + parent.relativePath;

  return {
    ...node,
    id,
    order: frontmatter.order,
    title: frontmatter.title,
    githubLink: mdxLink,
    body,
    // paths always start with `docs` or `api` which isn't useful. Strip it.
    directory: parentRelativeDirSplit?.slice(1).join("/"),
    currentDirectory:
      parentRelativeDirSplit?.[parentRelativeDirSplit.length - 1],
    folder: {
      order: metadata.order,
      title: metadata.title,
    },
  };
};
