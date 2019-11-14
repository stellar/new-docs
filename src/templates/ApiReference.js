import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import components from "constants/componentMapping";

import { getLayoutMetadata } from "helpers/getLayoutMetadata";

import { Column, Container, gridHelpers } from "basics/Grid";

import { DocsBase } from "components/layout/DocsBase";
import StickyNavContent, {
  StickyNavProvider,
} from "components/StickyNavContent";
import SideNav, { SideNavProvider } from "components/SideNav";
import { REDESIGN_PALETTE } from "constants/styles";

const { getSizeGrid, COL_SIZES, COLUMNS } = gridHelpers;

const { h1: H1, h2: H2, h3: H3, h4: H4 } = components;
const contentId = "content";

const ContentEl = styled.article`
  position: relative;
  margin: 0 auto;
`;
const ContainerEl = styled(Container)`
  && {
    margin: 0;
    min-width: 80rem;
    max-width: 140rem;
  }
`;

const { count, size, margin } = COLUMNS[COL_SIZES.md];
const RowEl = styled.div`
  // Treat md as smallest size
  display: grid;
  grid-template-columns: repeat(${count}, ${size}rem);
  column-gap: calc((100% - ${count * size}rem) / ${count - 1});
  margin: 0 ${margin}rem;

  ${getSizeGrid(COL_SIZES.lg)}
  ${getSizeGrid(COL_SIZES.xl)}
`;

const SideNavEl = styled(Column)`
  position: relative;
`;
const SideNavBackgroundEl = styled.div`
  position: absolute;
  background-color: ${REDESIGN_PALETTE.grey[0]};
  left: -100rem;
  right: 0;
  top: -10rem;
  bottom: -10rem;
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
          >
            <ContainerEl id={contentId}>
              <RowEl>
                <SideNavEl xs={3} lg={3} xl={4}>
                  <SideNavBackgroundEl />
                  <SideNav isScrollableSideNav navEntries={navEntries} />
                </SideNavEl>
                <Column xs={5} xl={9}>
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
                </Column>
                <Column xs={4} xl={9}>
                  <div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                    <div>
                      this is some big ol block of contentthis is some big ol
                      block of contentthis is some big ol block of contentthis
                      is some big ol block of contentthis is some big ol block
                      of contentthis is some big ol block of contentthis is some
                      big ol block of content
                    </div>
                  </div>
                </Column>
              </RowEl>
            </ContainerEl>
          </DocsBase>
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
