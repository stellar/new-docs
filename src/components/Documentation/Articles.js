import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FONT_WEIGHT, PALETTE } from "constants/styles";

import { BasicButton } from "basics/Buttons";
import { ArrowIcon } from "basics/Icons";
import { ListItem, List } from "basics/Text";
import { Link } from "basics/Links";

const topLevelNavItem = `
color: ${PALETTE.black60};
cursor: pointer;
font-size: 0.875rem;
font-weight: ${FONT_WEIGHT.light};
text-decoration: none;
&:focus {
  outline: 0;
}
`;

const El = styled(ListItem)``;
const ArticleLink = styled(Link)`
  ${topLevelNavItem}
  display: block;
  padding: 0.5rem 0;
`;
const ModifiedArrowIcon = styled(ArrowIcon)`
  position: absolute;
  right: 0;
`;
const NestedArticleTopicExpander = styled(BasicButton)`
  ${topLevelNavItem};
  text-align: left;

  &:hover {
    color: ${PALETTE.lightGrey};
  }
`;

const TopicExpander = styled(BasicButton)`
  cursor: pointer;
  text-align: left;
  background: none;
  padding: 0.5rem 0;
  border: 0;
  color: ${PALETTE.black80};
  display: flex;
  width: 100%;
  line-height: 1.5;

  &:focus {
    outline: 0;
  }
  svg {
    margin-left: 0.5em;
    transform: rotate(${(props) => (props.isCollapsed ? "90deg" : "0deg")});
    transition: transform 0.25s ease-out;
  }
`;

const ArticleList = styled(List)`
  max-height: ${({ isCollapsed }) => (isCollapsed ? "62.5rem" : "0")};
  overflow: hidden;
  padding: 0;
  transition: ${({ isCollapsed }) =>
    isCollapsed ? "max-height 1s ease-in" : "max-height .25s ease-out"};

  &:first-child {
    padding-top: 0.5rem;
  }

  li {
    list-style-type: none;
    padding: 0;
  }

  ${ArticleLink} {
    &:hover {
      color: ${PALETTE.lightGrey};
    }
  }
`;

const CustomList = styled(ListItem)`
  ${ArticleLink} {
    font-size: ${(props) => (props.depth > 0 ? "0.875rem" : "1rem")};
    color: ${(props) =>
      props.depth === 0 ? PALETTE.black80 : PALETTE.black60};
    padding-left: ${(props) => (props.depth > 1 ? `${props.depth - 1}rem` : 0)};
    font-weight: ${(props) =>
      props.isActive ? FONT_WEIGHT.bold : FONT_WEIGHT.normal};
  }
`;
const IndexArticleLink = styled(ArticleLink)``;

const Article = ({ title, url, activeItem, depth }) => {
  const isActive = url.includes(activeItem);

  return (
    <CustomList isActive={isActive} depth={depth}>
      <ArticleLink href={url}>{title}</ArticleLink>
    </CustomList>
  );
};
const IndexArticle = ({ title, url, activeItem, depth }) => {
  const isActive = url.includes(activeItem);

  return (
    <IndexArticleLink isActive={isActive} depth={depth} href={url}>
      {title}
    </IndexArticleLink>
  );
};

Article.propTypes = {
  depth: PropTypes.number,
  activeItem: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
};
IndexArticle.propTypes = Article.propTypes;

const Articles = ({
  articles,
  initialTopicsState,
  isNested,
  title,
  topicPath,
  depth = 0,
  activeItem,
}) => {
  const [topicState, setTopicState] = React.useState(initialTopicsState);
  const isCollapsed = topicState[topicPath];
  const topicToggleHandler = () => {
    setTopicState({
      ...topicState,
      [topicPath]: !topicState[topicPath],
    });
  };

  // `articles` is keyed by directory or file name.
  // Directories have a leading `/`, "index" here represents the filename
  const indexArticle = articles.index;

  return (
    <El>
      {/* eslint-disable-next-line */}
      {isNested ? (
        indexArticle ? (
          <IndexArticle
            isCollapsed={false}
            title={title}
            url={indexArticle.url}
            depth={depth}
            activeItem={activeItem}
          />
        ) : (
          <NestedArticleTopicExpander onClick={() => topicToggleHandler()}>
            {title}
          </NestedArticleTopicExpander>
        )
      ) : (
        <TopicExpander
          isCollapsed={isCollapsed}
          isNested={isNested}
          type="button"
          onClick={() => topicToggleHandler(topicPath)}
        >
          {title}
          <ModifiedArrowIcon direction="right" />
        </TopicExpander>
      )}

      <ArticleList isCollapsed={isCollapsed}>
        {Object.entries(articles)
          .filter(([filename]) => filename !== "index")
          // Only get second arg
          .map(([, article]) =>
            article.articles ? (
              <Articles
                articles={article.articles}
                initialTopicsState={initialTopicsState}
                isNested
                key={article.id}
                title={article.title}
                topicPath={article.topicPath}
                topicState={topicState}
                topicToggleHandler={topicToggleHandler}
                activeItem={activeItem}
                depth={depth + 1}
              />
            ) : (
              <Article
                key={article.id}
                isCollapsed={isCollapsed}
                title={article.title}
                url={article.url}
                depth={depth + 1}
                activeItem={activeItem}
              />
            ),
          )}
      </ArticleList>
    </El>
  );
};

Articles.propTypes = {
  initialTopicsState: PropTypes.object,
  isNested: PropTypes.bool,
  articles: PropTypes.object,
  title: PropTypes.string,
  topicPath: PropTypes.string,
  depth: PropTypes.number,
  activeItem: PropTypes.string,
};

export default Articles;
