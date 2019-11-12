import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import components from "constants/componentMapping";

import { getLayoutMetadata } from "helpers/getLayoutMetadata";

import { DocsBase } from "components/layout/DocsBase";
import StickyNavContent, {
  StickyNavProvider,
} from "components/StickyNavContent";
import SideNav, { SideNavProvider } from "components/SideNav";

const { h1: H1, h2: H2, h3: H3, h4: H4 } = components;

const ContentEl = styled.article`
  position: relative;
  margin: 0 auto;
`;

const componentMap = () => ({
  ...components,
  // eslint-disable-next-line react/prop-types
  h1: ({ children }) => (
    <StickyNavContent title={children}>
      <H1 style={{ display: "none" }}>{children}</H1>
    </StickyNavContent>
  ),
  // eslint-disable-next-line react/prop-types
  h2: ({ children }) => (
    <StickyNavContent title={children}>
      <H2>{children}</H2>
    </StickyNavContent>
  ),
  // eslint-disable-next-line react/prop-types
  h3: ({ children }) => (
    <StickyNavContent title={children}>
      <H3>{children}</H3>
    </StickyNavContent>
  ),
  // eslint-disable-next-line react/prop-types
  h4: ({ children }) => (
    <StickyNavContent title={children}>
      <H4>{children}</H4>
    </StickyNavContent>
  ),
});

const ApiReference = ({ data, pageContext }) => {
  const { referenceDocs } = data;
  const navEntries =
    referenceDocs.edges &&
    referenceDocs.edges.reduce(
      (arr, edge) => arr.concat(edge.node.tableOfContents.items),
      [],
    );

  return (
    <MDXProvider components={componentMap()}>
      <StickyNavProvider navEntries={navEntries}>
        <SideNavProvider>
          <div style={{ marginTop: "10rem" }} />
          <DocsBase
            metadata={getLayoutMetadata(data)}
            pageContext={pageContext}
            left={<SideNav isScrollableSideNav navEntries={navEntries} />}
            center={
              <ContentEl>
                {referenceDocs.edges.map(({ node }) => (
                  <section key={node.id}>
                    <h1>{node.frontmatter.title}</h1>
                    <MDXRenderer>{node.body}</MDXRenderer>
                    <p>
                      Each of these sections comes from a different markdown
                      file
                    </p>
                    <hr />
                  </section>
                ))}
              </ContentEl>
            }
          />
        </SideNavProvider>
      </StickyNavProvider>
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
          tableOfContents
        }
      }
    }
  }
`;
