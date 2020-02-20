import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FONT_WEIGHT } from "constants/styles";

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
`;
const ModifiedArrowIcon = styled(ArrowIcon)`
  position: absolute;
  right: 0;
`;
const NestedArticleTopicExpander = styled(BasicButton)`
  ${topLevelNavItem}
`;

const TopicExpander = styled.button`
  background: none;
  border: 0;
  color: #333;
  cursor: pointer;
  display: flex;
  padding: 0;

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

  li {
    list-style-type: none;
    /* padding: 0.375rem 0; */
    padding: 1rem 0;
  }
`;

const Article = ({ article = {} }) => {
  const { id, title, url } = article;
  return (
    <li key={id}>
      <ArticleLink href={url}>{title}</ArticleLink>
    </li>
  );
};

const Articles = ({
  articles,
  id,
  initialTopicsState,
  isNested,
  title,
  topicPath,
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
};

Article.propTypes = {
  article: PropTypes.object,
};

export default Articles;
