const path = require("path");

// The metadata is keyed off the relative path of the containing folder. Its
// contents are the complete contents of `metadata.json`, plus a `parent` key
// that contains any content from 1 folder up.
const metadataLookup = {};

const isParentFolder = (folder, maybeParent) =>
  path.relative(folder, maybeParent) === "..";

const buildMetadata = (file, metadata) => {
  // The find will get a [path, data] tuple or null
  const parent = Object.entries(metadataLookup).find(([path]) =>
    isParentFolder(file.relativeDirectory, path),
  ) || [null, null];
  return {
    data: metadata,
    parent: parent[1],
  };
};

const fillChildMetadata = (path, metadata) => {
  Object.entries(metadataLookup).forEach(([maybeChild, data]) => {
    if (isParentFolder(maybeChild, path) && !data.parent) {
      data.parent = metadata;
      console.log({ data });
    }
  });
};

exports.onCreateNode = ({ node, actions }, options = {}) => {
  // We need the absolute path so we can correctly `require()` these json
  // files, and the relative directory so we can compare their locations sans
  // details like .cache/ or the filename.
  const { absolutePath, relativeDirectory: dir } = node;
  if (!absolutePath || !dir) {
    return;
  }

  const metadataFilename = options.filename || "metadata.json";

  if (node.base === metadataFilename) {
    const json = require(absolutePath);
    const metadata = buildMetadata(node, json);
    // Nodes aren't added strictly from child -> parent, so we need to backfill
    // any child folders that have already been processed.
    fillChildMetadata(dir, metadata);
    metadataLookup[dir] = metadata;
    return;
  }

  const foundMetadata = metadataLookup[dir];
  if (foundMetadata) {
    actions.createNodeField({
      node,
      name: "metadata",
      value: foundMetadata,
    });
  }
};
