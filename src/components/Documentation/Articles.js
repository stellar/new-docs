import React from "react";
import styled from "styled-components";

const Articles = ({ isCollapsed, articles = [] }) => {
  const ArticleList = styled.ul`
    height: ${isCollapsed ? "auto" : "0"};
    overflow: hidden;

    li {
      list-style-type: none;
    }
  `;

  return (
    <ArticleList>
      {articles.map((article) => (
        <li>
          <a href={article.url}>{article.title}</a>
        </li>
      ))}
    </ArticleList>
  );
};

export default Articles;
