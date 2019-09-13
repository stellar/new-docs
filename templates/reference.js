import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

const ContentEl = styled.article`
  position: relative;
  margin: 0 auto;
`;

const componentMap = () => ({
  p: styled.p``,
  h1: styled.h1``,
  h2: styled.h2``,
  h3: styled.h3``,
  h4: styled.h4``,
  h5: styled.h5``,
  h6: styled.h6``,
  thematicBreak: styled.hr``,
  blockquote: styled.blockquote``,
  ul: styled.ul``,
  ol: styled.ol``,
  li: styled.li``,
  table: styled.table``,
  tr: styled.tr``,
  td: styled.td``,
  th: styled.th``,
  pre: styled.pre``,
  code: styled.code``,
  em: styled.em``,
  strong: styled.strong``,
  delete: styled.del``,
  hr: styled.hr``,
  a: styled.a``,
  img: styled.img``,
});

const Reference = ({ data }) => {
  const { mdx } = data;

  return (
    <ContentEl>
      <MDXProvider components={componentMap}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </ContentEl>
  );
};

Reference.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Reference;

export const pageQuery = graphql`
  query ReferenceQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
    }
  }
`;
