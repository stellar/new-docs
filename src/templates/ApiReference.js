import React from "react";
import pathLib from "path";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
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

import { smoothScrollTo } from "helpers/dom";
import { sortReference, normalizeMdx } from "helpers/sortReference";
import { groupBy } from "helpers/groupBy";

import { BasicButton } from "basics/Buttons";
import { Code, HorizontalRule } from "basics/NewDocText";
import { Column, Container, gridHelpers } from "basics/Grid";
import { LinkedH1 } from "basics/Text";

import { Footer } from "components/Documentation/Footer";
import { DocsBase } from "components/layout/DocsBase";
import { NavFrame } from "components/Navigation/SharedStyles";
import { NavLogo } from "components/Navigation/NavLogo";
import { SideNav, SideNavBody, TrackedContent } from "components/SideNav";
import {
  ScrollRouter,
  Context as ScrollRouterContext,
} from "components/ApiRefRouting/ScrollRouter";
import { Route, SectionPathContext } from "components/ApiRefRouting/Route";
import { Expansion } from "components/Expansion";

import PlusIcon from "assets/icons/icon-plus.svg";
import MinusIcon from "assets/icons/icon-minus.svg";
import { buildPathFromFile, normalizeRoute } from "../../buildHelpers/routes";

const { getSizeGrid, COL_SIZES, COLUMNS } = gridHelpers;

const { h1: H1, h2: H2, h3: H3, h4: H4 } = components;
const contentId = "content";

const ContentEl = styled.article`
  margin: 0 auto;
`;
const ContainerEl = styled(Container)`
  && {
    margin: 0;
    min-width: 80rem;
    max-width: 140rem;
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
const TrackedEl = styled.div``;
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
const ExpansionContainerEl = styled.div`
  margin-top: 1rem;
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
  bottom: 0rem;
`;
const NavItemEl = styled(BasicButton)`
  display: block;
  text-align: left;
  white-space: nowrap;
  font-size: ${(props) => (props.depth === 0 ? "1rem" : "0.875rem")};
  color: ${(props) => (props.depth === 0 ? PALETTE.black80 : PALETTE.black60)};
  padding: 0.375rem 0;
  padding-left: ${(props) => props.depth - 1}rem;
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
  const originalPath = React.useContext(SectionPathContext);
  const { onLinkClick } = React.useContext(ScrollRouterContext);
  let url = href;

  // Resolve relative links
  if (url.startsWith(".")) {
    url = normalizeRoute(
      `/developers${buildPathFromFile(
        pathLib.resolve(pathLib.dirname(originalPath), url),
      )}`,
    );
  }
  return (
    <StyledLink
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onLinkClick(url);
      }}
      href={url}
      {...props}
    />
  );
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
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
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

const ReferenceSection = React.memo(({ id, body, relativePath, title }) => {
  const path = normalizeRoute(`developers/${buildPathFromFile(relativePath)}`);

  return (
    <Route originalFilePath={relativePath} path={path}>
      <section>
        <TrackedContent>
          <TrackedEl id={id}>
            <LinkedH1 id={path}>{title}</LinkedH1>
          </TrackedEl>
        </TrackedContent>
        <MDXRenderer>{body}</MDXRenderer>
        <HorizontalRule />
      </section>
    </Route>
  );
});

ReferenceSection.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  relativePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

// eslint-disable-next-line react/no-multi-comp
const ApiReference = React.memo(function ApiReference({ data, pageContext }) {
  const referenceDocs = sortReference(
    data.referenceDocs.edges.map(({ node }) => normalizeMdx(node)),
  );

  const groupByParentCategory = groupBy(referenceDocs, "directory");

  const createNestedItems = (totalCategories, currentCategoryItems) => ({
    id: currentCategoryItems[0].id,
    title: currentCategoryItems[0].folder.title,
    directory: currentCategoryItems[0].directory,
    previousParent: totalCategories[totalCategories.length - 2],
    currentDirectory: currentCategoryItems[0].currentDirectory,
    items: currentCategoryItems,
  });

  const groupBySubCategory = Object.keys(groupByParentCategory).reduce(
    (acc, category) => {
      const splitCategories = category.split("/");
      const numberOfCategories = splitCategories.length;

      if (!acc[splitCategories[0]]) {
        acc[splitCategories[0]] = groupBy(referenceDocs, "directory")[category];
      }

      if (numberOfCategories > 1) {
        const currentCategoryItems = groupByParentCategory[category];

        const nestedItemsObj = createNestedItems(
          splitCategories,
          currentCategoryItems,
        );

        if (splitCategories[0] !== nestedItemsObj.previousParent) {
          const newItems = acc[splitCategories[0]].find(
            (el) => el.currentDirectory === nestedItemsObj.previousParent,
          );
          newItems.items.push(nestedItemsObj);
        } else {
          acc[splitCategories[0]].push(nestedItemsObj);
        }
      }
      return acc;
    },
    {},
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
            <RowEl>
              <SideNavEl xs={3} lg={3} xl={4}>
                <SideNavBackgroundEl />
                <SideNav>
                  {Object.entries(groupBySubCategory).map((nav, i) => (
                    <ExpansionContainerEl
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                    >
                      <Expansion
                        title={nav[0]}
                        expandedModeTitle={nav[0]}
                        hasBorder
                        collapseIcon={<MinusIcon />}
                        expandIcon={<PlusIcon />}
                        isDefaultExpanded={true}
                      >
                        <SideNavBody items={nav[1]} renderItem={renderItem} />
                      </Expansion>
                    </ExpansionContainerEl>
                  ))}
                </SideNav>
              </SideNavEl>
              <Column xs={9} xl={18}>
                {referenceDocs.map(({ body, id, parent, title }) => (
                  <ReferenceSection
                    relativePath={parent.relativePath}
                    key={id}
                    id={id}
                    title={title}
                    body={body}
                  />
                ))}
                <Footer />
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
          parent {
            ... on File {
              relativePath
              relativeDirectory
              fields {
                metadata {
                  data {
                    order
                    title
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
