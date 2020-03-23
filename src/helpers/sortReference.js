export const compareOrders = (a, b) => a.order - b.order;
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
 * insert takes an array which is going to be a list of sections,
 * index that will put newItems in this specified index,
 * and newItems that are going to be flattened and inserted into an arr at specified index
 * @param {array} arr An array of sections that is going to be re-ordered based on its folder's order
 * @param {number} index The specified index that newItems will be inserted at
 * @param {object} newItems Object of items that is going to be inserted
 * @returns {array} A flat list of nodes in reorder.
 */
const insert = (arr, index, newItems) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // run a flattenAndSort() and to insert its flat nested items
  ...flattenAndSort(newItems),
  // part of the array after the specified index
  ...arr.slice(index),
];

/**
 * sortWithNestedOrder takes the nestedNode's items and
 * its sister sections that nestedNode's items need to be a part of
 * then take the nested items and reorder the sections in the correct spot
 * @param {array} sections The array of the sections that current nestedNode needs to be a part of and re-ordered
 * @param {object} nestedNode The nested items node that need to be flatten
 * @returns {array} A re-ordered flat list of nodes.
 */
const sortWithNestedOrder = (sections, nestedNode) => {
  const nestedItems = Object.entries(nestedNode);

  nestedItems.forEach((nestedSectionEntry) => {
    const nestedItemOrder = nestedSectionEntry[1].order.toString()[0];
    const obj = {};
    obj[nestedSectionEntry[0]] = nestedSectionEntry[1];

    /* eslint-disable no-param-reassign */
    sections = insert(sections, nestedItemOrder, obj);
  });

  return sections;
};

/**
 * flattenAndSort takes the file tree we create with `recreateFileTree` and
 * squashes it back down to a flat list, with all the items in the correct spot
 * as dictated by their `order` and their folder.
 * @param {object} node The tree node to flatten.
 * @returns {array} A flat list of nodes.
 */
export const flattenAndSort = (node) =>
  Object.entries(node)
    .sort(compareNestedEntries)
    .flatMap((entry) => {
      const nestedNode = entry[1];
      const hasNestedItems =
        Object.values(nestedNode.nested) && Object.values(nestedNode.nested)[0];
      const isDoubleNested =
        hasNestedItems &&
        hasNestedItems.sections[0].directory.split("/").length > 2;
      let reorderedItems;

      if (isDoubleNested) {
        reorderedItems = sortWithNestedOrder(
          nestedNode.sections,
          nestedNode.nested,
        );
        return reorderedItems;
      }

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
