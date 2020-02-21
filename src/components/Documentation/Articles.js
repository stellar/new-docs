import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FONT_WEIGHT, PALETTE } from "constants/styles";

import { BasicButton } from "basics/Buttons";
import { ArrowIcon } from "basics/Icons";
import { Link } from "basics/Links";

const topLevelNavItem = `
color: #666;
cursor: pointer;
font-size: 0.875rem;
font-weight: ${FONT_WEIGHT.light};
text-decoration: none;
&:focus {
  outline: 0;
}
`;

const ArticleLink = styled(Link)`
  ${topLevelNavItem}
  font-size: ${(props) => (props.depth > 0 ? "0.875rem" : "1rem")};
  color: ${(props) => (props.depth === 0 ? PALETTE.black80 : PALETTE.black60)};
  padding-left: ${(props) => (props.depth > 1 ? `${props.depth - 1}rem` : 0)};
`;
const ModifiedArrowIcon = styled(ArrowIcon)`
  position: absolute;
  right: 0;
`;
const NestedArticleTopicExpander = styled(BasicButton)`
  ${topLevelNavItem};
  padding-bottom: 0.5rem;
`;

const TopicExpander = styled.button`
  background: none;
  border: 0;
  color: #333;
  cursor: pointer;
  display: flex;
  padding: 0;
  width: 100%;
  padding-bottom: 0.5rem;

  &:focus {
    outline: 0;
  }
  svg {
    margin-left: 0.5em;
    transform: rotate(${(props) => (props.isCollapsed ? "90deg" : "0deg")});
    transition: transform 0.25s ease-out;
  }
`;

const ArticleList = styled.ul`
  max-height: ${({ isCollapsed }) => (isCollapsed ? "1000px" : "0")};
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
    padding-top: 1.5rem;
  }
`;

const Article = ({ article = {}, depth }) => {
  const { id, title, url } = article;

  return (
    <li key={id}>
      <ArticleLink depth={depth} href={url}>
        {title}
      </ArticleLink>
    </li>
  );
};

Article.propTypes = {
  depth: PropTypes.number.isRequired,
};

const Articles = ({
  articles,
  id,
  initialTopicsState,
  isNested,
  title,
  topicPath,
  depth = 0,
}) => {
  const [topicState, setTopicState] = React.useState(initialTopicsState);
  const isCollapsed = topicState[topicPath];
  const topicToggleHandler = () => {
    setTopicState({
      ...topicState,
      [topicPath]: !topicState[topicPath],
    });
  };

  return (
    <li key={id}>
      {isNested ? (
        <NestedArticleTopicExpander onClick={() => topicToggleHandler()}>
          {title}
        </NestedArticleTopicExpander>
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

      {Object.values(articles).map((article) =>
        article.articles ? (
          <ArticleList
            key={`ArticleList${id}${article.id}`}
            isCollapsed={isCollapsed}
          >
            <Articles
              articles={article.articles}
              initialTopicsState={initialTopicsState}
              isNested
              key={article.id}
              title={article.title}
              topicPath={article.topicPath}
              topicState={topicState}
              topicToggleHandler={topicToggleHandler}
              depth={depth + 1}
            />
          </ArticleList>
        ) : (
          <ArticleList
            key={`ArticleList${id}${article.id}`}
            isCollapsed={isCollapsed}
          >
            <Article
              key={`Article${article.id}`}
              isCollapsed={isCollapsed}
              article={article}
              depth={depth + 1}
            />
          </ArticleList>
        ),
      )}
    </li>
  );
};

Articles.propTypes = {
  id: PropTypes.string,
  initialTopicsState: PropTypes.object,
  isNested: PropTypes.bool,
  articles: PropTypes.object,
  title: PropTypes.string,
  topicPath: PropTypes.string,
  depth: PropTypes.number.isRequired,
};

Article.propTypes = {
  article: PropTypes.object,
};

export default Articles;
