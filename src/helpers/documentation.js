import { graphql } from "gatsby";

import { groupBy } from "helpers/groupBy";
import { buildPathFromFile } from "helpers/routes";
import { compareOrders } from "helpers/sortReference";

export const DOCS_CONTENT_URL =
  "https://github.com/stellar/new-docs/blob/master/content/";

export const query = graphql`
  fragment ApiReferencePage on Mdx {
    id
    frontmatter {
      title
      order
    }
    body
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

export const buildRelPath = (relativeDirectory, rootDir) =>
  relativeDirectory.replace(rootDir, "") || "/";

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
    const currentPathSegments = pgPath.split("/");

    if (currentPathSegments.length > 2) {
      findPath(
        pathSegments.slice(0, pathSegments.length - 1).join("/"),
        currentPathSegments.slice(0, currentPathSegments.length - 1).join("/"),
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
  const sortedDocs = [...data].sort((a, b) => {
    const aFields = a.nodes[0].fields;
    const bFields = b.nodes[0].fields;
    return (
      (aFields ? aFields.metadata.data.order : Infinity) -
      (bFields ? bFields.metadata.data.order : Infinity)
    );
  });

  sortedDocs.forEach((topic) => {
    const { fieldValue: topicPath } = topic;
    const firstTopic = topic.nodes[0];
    const relPath = buildRelPath(topicPath, rootDir);
    const topicId = firstTopic.id;
    const topicTitle = firstTopic.fields
      ? firstTopic.fields.metadata.data.title
      : "MISSING METADATA.JSON";
    const articles = {};

    topic.nodes.forEach((node) => {
      const { childMdx, modifiedTime, name, relativePath } = node;
      const mdxLink = relativePath && DOCS_CONTENT_URL + relativePath;
      const {
        body,
        headings,
        frontmatter: { title: articleTitle, description },
        id: articleId,
      } = childMdx;
      articles[name] = {
        id: articleId,
        body,
        headings,
        githubLink: mdxLink,
        modifiedTime,
        title: articleTitle || "{`title` Not Found}",
        description,
        url: buildPathFromFile(relativePath),
      };
    });
    const rootPageData = {
      id: topicId,
      topicPath: relPath,
      title: topicTitle,
    };
    insertPageData(relPath, contents, articles, rootPageData);
  });

  // Now that content is in proper order, travel through tree and add Next Up link to each article
  const contentsList = Object.values(contents);
  contentsList.forEach((topicData, topicIndex) => {
    const topicArticles = Object.values(topicData.articles);
    const nextTopic = contentsList[topicIndex + 1];

    addNextUpToArticles(topicArticles, 0, nextTopic);
  });
  return contents;
};

/**
 * addNextUpToArticles recursively travels through contents tree to add a Next Up property to each
 * @param {array} articles List of articles of the current topic.
 * @param {number} articleIndex The index of the article we're working with
 * @param {number} nextTopic List of articles of the next topic
 * @returns {void}
 */
const addNextUpToArticles = (articles, articleIndex, nextTopic) => {
  if (articles.length === articleIndex) return;
  const articleData = articles[articleIndex];
  if (articleData && articleData.articles) {
    addNextUpToArticles(Object.values(articleData.articles), 0, nextTopic);
  } else {
    Object.assign(articleData, {
      nextUp: nextUpLink(articles, articleIndex, nextTopic),
    });
    addNextUpToArticles(articles, articleIndex + 1, nextTopic);
  }
};

/**
 * nextUpLink returns the url and title of the next article, whether it's in the same topic or if it's in the next topic
 * @param {array} topicArticles List of articles of the current topic.
 * @param {number} articleIndex The index of the article we're working with
 * @param {number} nextTopic List of articles of the next topic
 * @returns {object} { title, url }
 */
export const nextUpLink = (topicArticles, articleIndex, nextTopic) => {
  // // Go to next topic
  if (topicArticles.length === articleIndex + 1) {
    // We've reached the end
    if (!nextTopic) {
      return null;
    }
    const nextTopicFirstArticle = findNextFirstArticle(nextTopic);

    return {
      title: nextTopicFirstArticle.title,
      url: nextTopicFirstArticle.url,
    };
  }

  // Go to next article in topic
  const nextChild = topicArticles[articleIndex + 1];
  const nextNestedFirstArticle = findNextFirstArticle(nextChild);

  return {
    title: nextNestedFirstArticle.title,
    url: nextNestedFirstArticle.url,
  };
};

/**
 * findNextFirstArticle recursively drills down nested articles to find the first article we can link to
 * Scenario 1: Next article is a sibling, simply return that article
 * Scenario 2: Next article is in another topic, drill down a level to get that topic's articles
 * Scenario 3: Next article is nested multiple levels deep, keep drilling down
 * @param {object} articleData List of articles of the current topic.
 * @returns {object} { title, url }
 */
const findNextFirstArticle = (articleData) => {
  if (!articleData.articles) return articleData;
  const firstChild = Object.values(articleData.articles)[0];

  if (firstChild.articles) {
    return findNextFirstArticle(firstChild);
  }

  return firstChild;
};

// The `groupByCategory` function is used to build up the categories for the API
// Reference sidebar. We want these to share the same behavior as the rest of the
// page links, so we need to pass through the path somehow.
// This is a little hacky, but the rest of the sidebars assume they won't affect
// the route.
const useHrefAsId = (item) => {
  if (!item.parent) {
    return item;
  }
  return {
    ...item,
    id: buildPathFromFile(item.parent.relativePath),
  };
};

const createNestedItems = (totalCategories, currentCategoryItems) => ({
  id: buildPathFromFile(currentCategoryItems[0].parent.relativePath),
  title: currentCategoryItems[0].folder.title,
  directory: currentCategoryItems[0].directory,
  previousParent: totalCategories[totalCategories.length - 2],
  currentDirectory: currentCategoryItems[0].currentDirectory,
  order: currentCategoryItems[0].folder
    ? currentCategoryItems[0].folder.order
    : currentCategoryItems[0].frontmatter.order,
  items: currentCategoryItems.map(useHrefAsId),
});

export const groupByCategory = (referenceDocs) => {
  const groupByParentCategory = groupBy(referenceDocs, "directory");
  return Object.keys(groupByParentCategory).reduce((acc, category) => {
    const splitCategories = category.split("/");
    const numberOfCategories = splitCategories.length;
    const categoryName = splitCategories[0];

    if (!acc[categoryName]) {
      acc[categoryName] = groupByParentCategory[category].map(useHrefAsId);
    }

    if (numberOfCategories > 1) {
      const currentCategoryItems = groupByParentCategory[category];
      const nestedItemsObj = createNestedItems(
        splitCategories,
        currentCategoryItems,
      );

      if (categoryName !== nestedItemsObj.previousParent) {
        const newItems = acc[categoryName].find(
          (el) => el.currentDirectory === nestedItemsObj.previousParent,
        );
        newItems.items.push(nestedItemsObj);
        newItems.items.sort(compareOrders);
      } else {
        acc[categoryName].push(nestedItemsObj);
      }
    }

    return acc;
  }, {});
};
