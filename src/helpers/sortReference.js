export const normalizeMdx = (node) => {
  const { id, frontmatter, body, parent } = node;
  const metadata = (parent.fields && parent.fields.metadata.data) || {};
  const parentRelativeDirSplit = parent.relativeDirectory.split("/");
  return {
    ...node,
    id,
    order: frontmatter.order,
    title: frontmatter.title,
    body,
    // paths always start with `src/[docs|api]` which isn't useful. Strip it.
    directory: parentRelativeDirSplit.slice(2).join("/"),
    currentDirectory: parentRelativeDirSplit[parentRelativeDirSplit.length - 1],
    folder: {
      order: metadata.order,
      title: metadata.title,
    },
  };
};

const compareOrders = (a, b) => a.order - b.order;
const compareNestedEntries = (a, b) => compareOrders(a[1], b[1]);

const makeBlank = () => ({
  order: 0,
  sections: [],
  nested: {},
});

/**
 * buildTree recursively builds up a file tree of the API Reference content,
 * which we then use to build a sorted flat list. Our sort order is scoped to
 * individual folders, so we need to keep that information.
 * @param {array} keys An array of file path segments. Each folder in the tree is
 * an item in the array.
 * @param {node} doc The node from Gatsby we're adding to the tree.
 * @param {object} node A mutable object that we build up to complete this part
 * of the tree.
 * @returns {object} An object with the format of
 *  {
 *    [folderName]: {
 *      nested: { <recurse> }
 *      sections: [
 *        { mdxNode }
 *      ],
 *      order: 0
 *    }
 *  }
 */
const buildTree = (keys, doc, node) => {
  if (!node.nested[keys[0]]) {
    /* eslint-disable no-param-reassign */
    node.nested[keys[0]] = makeBlank();
    node.nested[keys[0]].order = doc.folder.order || 0;
    /* eslint-enable no-param-reassign */
  }
  const currentNode = node.nested[keys[0]];
  if (keys.length === 1) {
    currentNode.sections.push(doc);
    currentNode.sections.sort(compareOrders);
    return;
  }
  buildTree(keys.slice(1), doc, currentNode);
};
const recreateFileTree = (docs) =>
  docs.reduce((accum, doc) => {
    const keys = doc.directory.split("/");
    buildTree(keys, doc, accum);
    return accum;
  }, makeBlank()).nested;

/**
 * flattenAndSort takes the file tree we create with `recreateFileTree` and
 * squashes it back down to a flat list, with all the items in the correct spot
 * as dictated by their `order` and their folder.
 * @param {object} node The tree node to flatten.
 * @returns {array} A flat list of nodes.
 */
const flattenAndSort = (node) =>
  Object.entries(node)
    .sort(compareNestedEntries)
    .flatMap((entry) => {
      const nestedNode = entry[1];
      return [
        ...nestedNode.sections,
        ...flattenAndSort(nestedNode.nested),
      ].map((innerNode) =>
        innerNode.sections ? innerNode.sections : innerNode,
      );
    });

/**
 * sortReference takes a list of normalized mdx nodes, and returns that same list
 * sorted in order per their `order` metadata and the folder they're contained in.
 * @param {array} docs The list of normalized mdx nodes from Gatsby.
 * @returns {array} Those same list items in order.
 */
export const sortReference = (docs) => {
  const tree = recreateFileTree(docs);

  return flattenAndSort(tree);
};
