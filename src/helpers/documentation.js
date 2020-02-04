import { graphql } from "gatsby";

import { groupBy } from "helpers/groupBy";
import { buildPathFromFile } from "utils";

export const query = graphql`
  fragment ApiReferencePage on Mdx {
    id
    frontmatter {
      title
      order
    }
    body
    tableOfContents
    parent {
      ... on File {
        relativePath
        relativeDirectory
        fields {
          metadata {
            data {
              order
              title
            }
          }
        }
      }
    }
  }
`;

export const buildUrlFromPath = (relPath) =>
  `/developers${buildPathFromFile(relPath)}`;

export const buildRelPath = (relativeDirectory, rootDir) =>
  relativeDirectory.replace(rootDir, "") || "/";

export const nextUp = (topicArr, topicIndex, childArr, childIndex) => {
  // End of list
  if (topicIndex + 1 === topicArr.length) {
    return { title: "", url: "" };
  }

  // Go to next topic
  if (childIndex === childArr.length - 1) {
    const nextTopic = topicArr[topicIndex + 1];
    return {
      title: nextTopic.nodes[0].fields.metadata.data.title,
      url: `${buildUrlFromPath(nextTopic.nodes[0].relativePath)}`,
    };
  }

  // Go to next article in topic
  const nextChild = childArr[childIndex + 1];
  return {
    title: nextChild.childMdx.frontmatter.title,
    url: buildUrlFromPath(nextChild.relativePath),
  };
};

/**
 * findInitialOpenTopics builds an object of booleans signifying which nav items should be in an open state on page load.
 * @param {object} data Raw data from graphQL query.
 * @param {string} pagePath Path of the current page.
 * @param {string} rootDir The root dir, as defined in CreateDocsPage.js.
 * @returns {object} An object with the format of
 *  {
 *    [path]: boolean
 *  }
 */
export const findInitialOpenTopics = (data, pagePath, rootDir) => {
  const initialTopicsState = {};
  const findPath = (relPath, pgPath) => {
    initialTopicsState[relPath] = relPath === pgPath;

    const pathSegments = relPath.split("/");

    // if path is nested, open the parent dir as well
    if (pathSegments.length > 2) {
      const pagePathSegments = pgPath.split("/");
      findPath(
        pathSegments.slice(0, pathSegments.length - 1).join("/"),
        pagePathSegments.slice(0, pagePathSegments.length - 1).join("/"),
      );
    }
  };
  data.forEach((file) => {
    const relPath = buildRelPath(file.fieldValue, rootDir);
    findPath(relPath, pagePath);
  });

  return initialTopicsState;
};

/**
 * findArticle recursively travels down file paths to find child articles
 * @param {string} pagePath / delimited string representing filepath.
 * @param {object} docsContents Passed object to traverse.
 * @returns {object} An object with the format of
 *  {
 *    [articleName]: {
 *      body,
 *      headings,
 *      id,
 *      modifiedTime,
 *      nextUp,
 *      title,
 *      url
 *    }
 *  }
 */

export const findArticle = (pagePath, docsContents, isNested = false) => {
  if (!pagePath) return docsContents.articles;
  const levels = pagePath.split("/");
  return findArticle(
    levels[2] ? `/${levels[2]}` : null,
    isNested
      ? docsContents.articles[`/${levels[1]}`]
      : docsContents[`/${levels[1]}`],
    true,
  );
};

/**
 * insertPageData inserts page data and articles into corresponding keys of object
 * @param {string} pagePath / delimited string representing filepath.
 * @param {object} contents Passed object that will update object in caller.
 * @param {object} articles Object containing all articles scoped to path.
 * @param {object} rootPageData Title, TopicPath, and Id associated with each path.
 * @returns {object} An object with the format of
 *  {
 *    [folderName]: {
 *      articles: {
 *        { mdxNode }
 *        { nestedArticles}
 *      },
 *      id,
 *      topicPath,
 *      title
 *    }
 *  }
 */
const insertPageData = (pagePath, contents, articles, rootPageData) => {
  const currentNode = contents;

  const enterDir = (remainingPath, newNode, isNested) => {
    if (!remainingPath) {
      Object.assign(newNode, rootPageData);
      Object.assign(newNode.articles, articles);
      return contents;
    }
    const levels = remainingPath.split("/");

    if (!levels[1]) {
      Object.assign(newNode, { "/": { articles: {} } });
    } else if (!newNode || !newNode[`/${levels[1]}`]) {
      if (isNested) {
        Object.assign(newNode.articles, {
          [`/${levels[1]}`]: { articles: {} },
        });
      } else {
        Object.assign(newNode, { [`/${levels[1]}`]: { articles: {} } });
      }
    }
    return enterDir(
      levels[2] ? `/${levels[2]}` : null,
      isNested ? newNode.articles[`/${levels[1]}`] : newNode[`/${levels[1]}`],
      true,
    );
  };

  enterDir(pagePath, currentNode, false);
};

/**
 * buildDocsContents creates an object from the data pulled from graphQL
 * @param {object} data Raw data from GraphQL query.
 * @param {string} rootDir The root dir, as defined in CreateDocsPage.js.
 * @returns {object} An object with the format of
 *  {
 *    [folderName]: {
 *      articles: {
 *        { mdxNode }
 *        { nestedArticles}
 *      },
 *      id,
 *      topicPath,
 *      title
 *    }
 *  }
 */
export const buildDocsContents = (data, rootDir) => {
  const contents = {};
  const sortedDocs = [...data].sort(
    (a, b) =>
      a.nodes[0].fields.metadata.data.order -
      b.nodes[0].fields.metadata.data.order,
  );

  sortedDocs.forEach((topic, topicIndex, topicArr) => {
    const { fieldValue: topicPath } = topic;
    const relPath = buildRelPath(topicPath, rootDir);
    const topicId = topic.nodes[0].id;
    const topicTitle = topic.nodes[0].fields.metadata.data.title;
    const articles = {};

    topic.nodes.forEach((node, childIndex, childArr) => {
      const { childMdx, modifiedTime, name, relativePath } = node;
      const {
        body,
        headings,
        frontmatter: { title: articleTitle },
        id: articleId,
      } = childMdx;
      articles[name] = {
        id: articleId,
        body,
        headings,
        modifiedTime,
        title: articleTitle || "{`title` Not Found}",
        url: buildUrlFromPath(relativePath),
        nextUp: nextUp(topicArr, topicIndex, childArr, childIndex),
      };
    });
    const rootPageData = {
      id: topicId,
      topicPath: relPath,
      title: topicTitle,
    };
    insertPageData(relPath, contents, articles, rootPageData);
  });

  return contents;
};

const createNestedItems = (totalCategories, currentCategoryItems) => ({
  id: currentCategoryItems[0].id,
  title: currentCategoryItems[0].folder.title,
  directory: currentCategoryItems[0].directory,
  previousParent: totalCategories[totalCategories.length - 2],
  currentDirectory: currentCategoryItems[0].currentDirectory,
  items: currentCategoryItems,
});

export const groupByCategory = (referenceDocs) => {
  const groupByParentCategory = groupBy(referenceDocs, "directory");

  return Object.keys(groupByParentCategory).reduce((acc, category) => {
    const splitCategories = category.split("/");
    const numberOfCategories = splitCategories.length;

    if (!acc[splitCategories[0]]) {
      acc[splitCategories[0]] = groupByParentCategory[category];
    }

    if (numberOfCategories > 1) {
      const currentCategoryItems = groupByParentCategory[category];

      const nestedItemsObj = createNestedItems(
        splitCategories,
        currentCategoryItems,
      );

      if (splitCategories[0] !== nestedItemsObj.previousParent) {
        const newItems = acc[splitCategories[0]].find(
          (el) => el.currentDirectory === nestedItemsObj.previousParent,
        );
        newItems.items.push(nestedItemsObj);
      } else {
        acc[splitCategories[0]].push(nestedItemsObj);
      }
    }
    return acc;
  }, {});
};
