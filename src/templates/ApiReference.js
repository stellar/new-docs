import React from "react";
import pathLib from "path";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled, { css, ThemeProvider } from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

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
import { sortReference, normalizeMdx } from "helpers/sortReference";

import { BasicButton } from "basics/Buttons";
import { Code } from "basics/NewDocText";
import { Column, Container, gridHelpers } from "basics/Grid";

import { DocsBase } from "components/layout/DocsBase";
import { NavFrame } from "components/Navigation/SharedStyles";
import { NavLogo } from "components/Navigation/NavLogo";
import { SideNav, SideNavBody, TrackedContent } from "components/SideNav";
import { ScrollRouter } from "components/ApiRefRouting/ScrollRouter";
import { Route } from "components/ApiRefRouting/Route";

import { buildPathFromFile, normalizeRoute } from "../../buildHelpers/routes";

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

const StyledLink = components.a;
// eslint-disable-next-line react/prop-types
const DocsLink = ({ href, ...props }) => {
  // TODO: This is definitely super broken. Links to non-reference docs will need
  // to have relative path preserved, but links within the API reference will
  // need to be squashed relative to `/docs/api`. Not clear what the best
  // solution is at time of commit.
  // eslint-disable-next-line react/prop-types
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

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children, ...props }) => {
  const rightColumnContent = React.useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => RIGHT_COLUMN_COMPONENTS_NAME[child.props.mdxType],
      ),
    [children],
  );
  const MiddleColumnContent = React.useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => !RIGHT_COLUMN_COMPONENTS_NAME[child.props.mdxType],
      ),
    [children],
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
};

const componentMap = {
  ...components,
  a: DocsLink,
  wrapper: Wrapper,
  // eslint-disable-next-line react/prop-types
  h1: ({ children }) => (
    <TrackedContent>
      <H1 style={{ display: "none" }}>{children}</H1>
    </TrackedContent>
  ),
  // eslint-disable-next-line react/prop-types
  h2: ({ children }) => (
    <TrackedContent>
      <H2>{children}</H2>
    </TrackedContent>
  ),
  // eslint-disable-next-line react/prop-types
  h3: ({ children }) => (
    <TrackedContent>
      <H3>{children}</H3>
    </TrackedContent>
  ),
  // eslint-disable-next-line react/prop-types
  h4: ({ children }) => (
    <TrackedContent>
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
};

// eslint-disable-next-line react/no-multi-comp
const ApiReference = React.memo(function ApiReference({ data, pageContext }) {
  const referenceDocs = sortReference(
    data.referenceDocs.edges.map(({ node }) => normalizeMdx(node)),
  );

  const navEntries = React.useMemo(
    () =>
      referenceDocs.reduce(
        (arr, doc) =>
          !isEmpty(doc.tableOfContents)
            ? arr.concat(doc.tableOfContents.items)
            : arr,
        [],
      ),
    [referenceDocs],
  );

  return (
    <ScrollRouter>
      <MDXProvider components={componentMap}>
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
                {referenceDocs.map((doc) => (
                  <Route
                    path={normalizeRoute(
                      `developers/${buildPathFromFile(
                        doc.parent.relativePath,
                      )}`,
                    )}
                    key={doc.id}
                  >
                    <section>
                      <h1>{doc.title}</h1>
                      <MDXRenderer>{doc.body}</MDXRenderer>
                      <hr />
                    </section>
                  </Route>
                ))}
              </Column>
              <Column xs={4} xl={9} />
            </RowEl>
          </ContainerEl>
        </DocsBase>
      </MDXProvider>
    </ScrollRouter>
  );
});

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
            order
          }
          body
          tableOfContents
          parent {
            ... on File {
              relativePath
              relativeDirectory
              fields {
                metadata {
                  data {
                    order
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
