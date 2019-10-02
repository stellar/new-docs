import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import components from "constants/componentMapping";
import { NAV_THEMES } from "constants/styles";

import { getLayoutMetadata } from "helpers/getLayoutMetadata";

import ThreeColumn from "components/layout/ThreeColumn";
import SubPageHeading from "components/SubPageHeading";

const ContentEl = styled.article`
  position: relative;
  margin: 0 auto;
`;

const Documentation = ({ data, pageContext }) => {
  const { mdx } = data;

  return (
    <MDXProvider components={components}>
      <ThreeColumn
        metadata={getLayoutMetadata(data)}
        pageContext={pageContext}
        navTheme={NAV_THEMES.default}
        leading={<SubPageHeading pageName="Documentation" />}
        center={
          <ContentEl>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </ContentEl>
        }
      />
    </MDXProvider>
  );
};

Documentation.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default Documentation;

export const pageQuery = graphql`
  query DocumentationQuery($id: String) {
    ...LayoutMetadata
    mdx(id: { eq: $id }) {
      ...SubpageMetadata
      id
      fileAbsolutePath
      body
    }
  }
`;
