import React from "react";
import pathLib from "path";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Helmet from "react-helmet";

import {
  NAV_THEMES,
  CSS_TRANSITION_SPEED,
  FONT_WEIGHT,
  PALETTE,
} from "constants/styles";
import components from "constants/docsComponentMapping";

import { smoothScrollTo } from "helpers/dom";
import { sortReference, normalizeMdx } from "helpers/sortReference";
import { groupByCategory } from "helpers/documentation";

import { BasicButton } from "basics/Buttons";
import { HorizontalRule } from "basics/NewDocText";
import { Column } from "basics/Grid";
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
import {
  ApiReferenceRow,
  ApiReferenceWrapper,
  Container,
  NestedRow,
  SideNavColumn,
  SideNavBackground,
} from "components/Documentation/SharedStyles";
import { Expansion } from "components/Expansion";

import PlusIcon from "assets/icons/icon-plus.svg";
import MinusIcon from "assets/icons/icon-minus.svg";
import { buildPathFromFile, normalizeRoute } from "../../buildHelpers/routes";

const GreenTableCell = styled.td`
  color: ${PALETTE.lightGreen};
`;
const OrangeTableCell = styled.td`
  color: ${PALETTE.lightOrage};
`;

const TrackedEl = styled.div``;

const ExpansionContainerEl = styled.div`
  margin-top: 1rem;
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

const componentMap = {
  ...components,
  a: DocsLink,
  wrapper: ApiReferenceWrapper,
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

        <NestedRow>
          <MDXRenderer>{body}</MDXRenderer>
        </NestedRow>
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
  const docsBySubCategory = groupByCategory(referenceDocs);
  return (
    <ScrollRouter>
      <Helmet>
        {/* SEO optimization. For js-less visitors (i.e. some crawlers), redirect
        to the same URL but with only the relevant content. */}
        <noscript>
          {`<meta http-equiv="refresh" content="0;url=?javascript=false" />`}
        </noscript>
      </Helmet>
      <MDXProvider components={componentMap}>
        <DocsBase
          pageContext={pageContext}
          navigation={
            <ThemeProvider theme={NAV_THEMES.docs}>
              <NavFrame>
                <Container>
                  <ApiReferenceRow>
                    <Column xs={3} xl={4}>
                      <NavLogo pageName="Documentation" />
                    </Column>
                  </ApiReferenceRow>
                </Container>
              </NavFrame>
            </ThemeProvider>
          }
        >
          <Container>
            <ApiReferenceRow>
              <SideNavColumn xs={3} lg={3} xl={4}>
                <SideNavBackground />
                <SideNav>
                  {Object.entries(docsBySubCategory).map((nav, i) => (
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
              </SideNavColumn>
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
            </ApiReferenceRow>
          </Container>
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
          ...ApiReferencePage
        }
      }
    }
  }
`;
