import Chevron from "assets/icons/chevron.svg";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Link } from "basics/Links";

const TopicExpander = styled.button`
  color: #333;
  &:focus {
    outline: 0;
  }
  padding: 0;
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
    padding: 0.375rem 0;
  }
`;

const ArticleLink = styled(Link)`
  color: #666;
  font-size: 0.875rem;
  text-decoration: none;
`;

const Article = ({ article = {} }) => {
  const { id, title, url } = article;
  return (
    <li key={id}>
      <ArticleLink href={url}>{title || "Untitled"}</ArticleLink>
    </li>
  );
};

const Articles = ({
  articles,
  id,
  title,
  topicPath,
  topicToggleHandler,
  topicState,
}) => {
  const isCollapsed = topicState[topicPath];

  return (
    <li key={id}>
      <TopicExpander
        isCollapsed={isCollapsed}
        type="button"
        onClick={() => topicToggleHandler(topicPath)}
      >
        {title}
        <Chevron />
      </TopicExpander>

      {Object.values(articles).map((article) =>
        article.articles ? (
          <ArticleList
            key={`ArticleList${id}${article.id}`}
            isCollapsed={isCollapsed}
          >
            <Articles
              articles={article.articles}
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
  articles: PropTypes.object,
  title: PropTypes.string,
  topicToggleHandler: PropTypes.func,
  topicPath: PropTypes.string,
  topicState: PropTypes.object,
};

Article.propTypes = {
  article: PropTypes.object,
};

export default Articles;
