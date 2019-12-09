import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled, { css, ThemeProvider } from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import pathLib from "path";

import {
  REDESIGN_PALETTE,
  NAV_THEMES,
  CSS_TRANSITION_SPEED,
  MEDIA_QUERIES,
  FONT_WEIGHT,
  PALETTE,
} from "constants/styles";
import components from "constants/docsComponentMapping";

import { isEmpty } from "utils";
import { smoothScrollTo } from "helpers/dom";
import { slugify } from "helpers/slugify";

import { BasicButton } from "basics/Buttons";
import { Code } from "basics/NewDocText";
import { Column, Container, gridHelpers } from "basics/Grid";

import { DocsBase } from "components/layout/DocsBase";
import { NavFrame } from "components/Navigation/SharedStyles";
import { NavLogo } from "components/Navigation/NavLogo";
import { SideNav, SideNavBody, TrackedContent } from "components/SideNav";

const { getSizeGrid, COL_SIZES, COLUMNS } = gridHelpers;

const { h1: H1, h2: H2, h3: H3, h4: H4 } = components;
const contentId = "content";

const ContentEl = styled.article`
  margin: 0 auto;
`;
const containerStyles = css`
  margin: 0;
  min-width: 80rem;
  max-width: 140rem;
`;
const ContainerEl = styled(Container)`
  && {
    ${containerStyles}
  }
`;
const GreenTableCell = styled.td`
  color: ${PALETTE.lightGreen};
`;
const OrangeTableCell = styled.td`
  color: ${PALETTE.lightOrage};
`;

const InlineCode = styled(Code)`
  font-size: 0.875rem;
  font-weight: ${FONT_WEIGHT.bold};
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

const NestedRowEl = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 4rem);
  column-gap: calc((100% - ${9 * 4}rem) / ${9 - 1});

  @media (${MEDIA_QUERIES.gtXlDesktop}) {
    grid-template-columns: repeat(18, 4rem);
    column-gap: calc((100% - ${18 * 4}rem) / ${18 - 1});
  }
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

const StyledLink = components.a;

// eslint-disable-next-line react/prop-types
const DocsLink = ({ href, ...props }) => {
  // TODO: This is definitely super broken. Links to non-reference docs will need
  // to have relative path preserved, but links within the API reference will
  // need to be squashed relative to `/docs/api`. Not clear what the best
  // solution is at time of commit.
  let url = href.split(".mdx")[0].replace("index", "");

  if (url.startsWith(".")) {
    // Force all directories to be flat
    url = pathLib.resolve("/docs/api", url.replace("..", "."));
  }
  return <StyledLink href={url} {...props} />;
};

const RIGHT_COLUMN_COMPONENTS_NAME = {
  CodeExample: "CodeExample",
  EndpointsTable: "EndpointsTable",
  ExampleResponse: "ExampleResponse",
  NavTable: "NavTable",
};

const componentMap = () => ({
  ...components,
  a: DocsLink,
  // eslint-disable-next-line react/prop-types
  wrapper: ({ children, ...props }) => {
    const rightColumnContent = React.Children.toArray(children).filter(
      (child) => RIGHT_COLUMN_COMPONENTS_NAME[child.props.mdxType],
    );
    const MiddleColumnContent = React.Children.toArray(children).filter(
      (child) => !RIGHT_COLUMN_COMPONENTS_NAME[child.props.mdxType],
    );

    return (
      <NestedRowEl>
        <Column xs={5} xl={9}>
          <ContentEl {...props}>{MiddleColumnContent}</ContentEl>
        </Column>
        <Column xs={4} xl={9}>
          {rightColumnContent}
        </Column>
      </NestedRowEl>
    );
  },
  // eslint-disable-next-line react/prop-types
  h1: ({ children }) => (
    <TrackedContent id={slugify(children)}>
      <H1 style={{ display: "none" }}>{children}</H1>
    </TrackedContent>
  ),
  // eslint-disable-next-line react/prop-types
  h2: ({ children }) => (
    <TrackedContent id={slugify(children)}>
      <H2>{children}</H2>
    </TrackedContent>
  ),
  // eslint-disable-next-line react/prop-types
  h3: ({ children }) => (
    <TrackedContent id={slugify(children)}>
      <H3>{children}</H3>
    </TrackedContent>
  ),
  // eslint-disable-next-line react/prop-types
  h4: ({ children }) => (
    <TrackedContent id={slugify(children)}>
      <H4>{children}</H4>
    </TrackedContent>
  ),
  // eslint-disable-next-line react/prop-types
  td: ({ children }) => {
    if (children === "GET") {
      return <GreenTableCell>{children}</GreenTableCell>;
    }
    if (children === "POST") {
      return <OrangeTableCell>{children}</OrangeTableCell>;
    }
    return <td>{children}</td>;
  },
  // eslint-disable-next-line react/prop-types
  inlineCode: ({ children }) => <InlineCode>{children}</InlineCode>,
});

const ReferenceSection = React.memo(({ frontmatter, body }) => (
  <section>
    <h1>{frontmatter.title}</h1>
    <MDXRenderer>{body}</MDXRenderer>
    <hr />
  </section>
));
ReferenceSection.propTypes = {
  body: PropTypes.string.isRequired,
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
};

const NavItemEl = styled(BasicButton)`
  text-align: left;
  white-space: nowrap;
  font-size: 1rem;
  color: #333;
  padding: 0.375rem 0;
  padding-left: ${(props) => props.depth}rem;
  line-height: 1.25;
  transition: opacity ${CSS_TRANSITION_SPEED.default} ease-out;
  font-weight: ${({ isActive }) =>
    isActive ? FONT_WEIGHT.bold : FONT_WEIGHT.normal};

  &:hover {
    color: #999;
  }
`;

// This is a function, not a component
// eslint-disable-next-line react/prop-types
const renderItem = ({ depth, id, isActive, title }) => (
  <NavItemEl
    depth={depth}
    isActive={isActive}
    onClick={(e) => {
      e.preventDefault();
      smoothScrollTo(document.getElementById(id));
    }}
  >
    {title}
  </NavItemEl>
);

const ApiReference = ({ data, pageContext }) => {
  const { referenceDocs } = data;
  const navEntries =
    referenceDocs.edges &&
    referenceDocs.edges.reduce(
      (arr, edge) =>
        !isEmpty(edge.node.tableOfContents)
          ? arr.concat(edge.node.tableOfContents.items)
          : arr,
      [],
    );

  return (
    <MDXProvider components={componentMap()}>
      <DocsBase
        pageContext={pageContext}
        navigation={
          <ThemeProvider theme={NAV_THEMES.docs}>
            <NavFrame>
              <ContainerEl>
                <RowEl>
                  <Column xs={3} xl={4}>
                    <NavLogo pageName="Documentation" />
                  </Column>
                </RowEl>
              </ContainerEl>
            </NavFrame>
          </ThemeProvider>
        }
      >
        <ContainerEl id={contentId}>
          <div style={{ paddingTop: "10rem" }} />
          <RowEl>
            <SideNavEl xs={3} lg={3} xl={4}>
              <SideNavBackgroundEl />
              <SideNav>
                <SideNavBody items={navEntries} renderItem={renderItem} />
              </SideNav>
            </SideNavEl>
            <Column xs={9} xl={18}>
              {referenceDocs.edges.map(({ node }) => (
                <ReferenceSection
                  key={node.id}
                  frontmatter={node.frontmatter}
                  body={node.body}
                />
              ))}
            </Column>
            <Column xs={4} xl={9} />
          </RowEl>
        </ContainerEl>
      </DocsBase>
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
