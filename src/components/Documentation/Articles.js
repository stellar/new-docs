import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

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

const ArticleLink = styled.a`
  color: #666;
  font-size: 0.875rem;
  text-decoration: none;
`;

const Articles = ({ isCollapsed, articles = {} }) => (
  <ArticleList isCollapsed={isCollapsed}>
    {Object.values(articles).map((article) => {
      const { id, title, url } = article;

      return (
        <li key={id}>
          <ArticleLink href={url}>{title}</ArticleLink>
        </li>
      );
    })}
  </ArticleList>
);

Articles.propTypes = {
  isCollapsed: PropTypes.bool,
  articles: PropTypes.object,
};

export default Articles;
