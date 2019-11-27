import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { Link } from "basics/Links";

const ArticleList = styled.ul`
  height: ${({ isCollapsed }) => (isCollapsed ? "auto" : "0")};
  overflow: hidden;

  li {
    list-style-type: none;
  }
`;

const Articles = ({ isCollapsed, articles = [] }) => (
  <ArticleList isCollapsed={isCollapsed}>
    {Object.values(articles).map((article) => (
      <li>
        <Link href={article.url}>{article.title}</Link>
      </li>
    ))}
  </ArticleList>
);

Articles.propTypes = {
  isCollapsed: PropTypes.bool,
  articles: PropTypes.array,
};

export default Articles;
