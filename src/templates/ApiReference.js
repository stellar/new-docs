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

const ApiReference = ({ data, pageContext }) => {
  const { referenceDocs } = data;

  return (
    <MDXProvider components={components}>
      <ThreeColumn
        metadata={getLayoutMetadata(data)}
        pageContext={pageContext}
        navTheme={NAV_THEMES.default}
        leading={<SubPageHeading pageName="API Reference" />}
        center={
          <ContentEl>
            {referenceDocs.edges.map(({ node }) => (
              <section key={node.id}>
                <h1>{node.frontmatter.title}</h1>
                <MDXRenderer>{node.body}</MDXRenderer>
                <p>
                  Each of these sections comes from a different markdown file
                </p>
                <hr />
              </section>
            ))}
          </ContentEl>
        }
      />
    </MDXProvider>
  );
};

ApiReference.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default ApiReference;

export const pageQuery = graphql`
  query ApiReferenceQuery($ids: [String]) {
    ...LayoutMetadata
    referenceDocs: allMdx(filter: { id: { in: $ids } }) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          body
        }
      }
    }
  }
`;
