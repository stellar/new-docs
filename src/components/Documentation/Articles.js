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

const Articles = ({ isCollapsed, articles = {} }) => (
  <ArticleList isCollapsed={isCollapsed}>
    {Object.values(articles).map((article) => {
      const { id, title, url } = article;

      return (
        <li key={id}>
          <Link href={url}>{title}</Link>
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
