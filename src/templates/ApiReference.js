import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import Helmet from "react-helmet";
import { useLocation, Redirect } from "@reach/router";

import { apiReferenceComponents } from "constants/docsComponentMapping";
import { docType } from "constants/docType";

import { sortReference } from "helpers/sortReference";
import { groupByCategory } from "helpers/documentation";
import { normalizeMdx } from "helpers/mdx";
import { buildPathFromFile, normalizeRoute } from "helpers/routes";

import { Column } from "basics/Grid";
import { ChevronIcon } from "basics/Icons";
import { PrismStyles } from "basics/Prism";

import { NavItem } from "components/ApiReference/NavItem";
import { ReferenceSection } from "components/ApiReference/ReferenceSection";
import { ScrollRouter } from "components/ApiReference/ScrollRouter";
import {
  ApiReferenceRow,
  CustomColumn,
  ExpansionContainer,
  NavLink,
  NavTitle,
  NestedRow,
} from "components/ApiReference/SharedStyles";
import { BetaNotice } from "components/BetaNotice";
import { Footer } from "components/Footer";
import { LayoutBase } from "components/layout/LayoutBase";
import {
  AbsoluteNavFooterEl,
  NavAbsoluteEl,
  SideNavContainer,
  NavLogo,
  SideNavBackground,
  NavColumn,
} from "components/Navigation/SharedStyles";
import { SideNavBody } from "components/SideNav";
import { Expansion } from "components/Expansion";

import DevelopersPreview from "assets/images/og_developers.jpg";
import SingleApiReference from "./SingleApiReference";

// This is a function, not a component
const renderItem = ({
  /* eslint-disable react/prop-types */
  depth,
  id,
  isActive,
  title,
  forwardedRef,
  isFirstItem,
  /* eslint-disable react/prop-types */
}) => {
  /* There are cases when folder's index.mdx shares the same title as
    its metadata.json's title. We are preventing redundancy by replacing
    its sub navigation's title to "Overview" if its title is the same
    as its metadata.json's */
  const navTitle = isFirstItem ? "Overview" : title;
  return (
    <NavItem depth={depth} forwardedRef={forwardedRef} isActive={isActive}>
      <NavLink href={id}>{navTitle}</NavLink>
    </NavItem>
  );
};

const { a: StyledLink } = apiReferenceComponents;

// eslint-disable-next-line react/no-multi-comp
const ApiReference = React.memo(function ApiReference({ data, pageContext }) {
  const sideNavRef = React.useRef();
  const location = useLocation();

  // For SEO reasons, we attempt to direct all search crawlers to a
  // `?javascript=false` form of the page. This will fetch the / no-js/api/* form
  // of the static HTML, but at least some of them will still execute JS once the
  // page loads. The JS populates the rest of the content, which isn't what we
  // want to happen. This is our latest attempt at forcing SEO to properly
  // associate the content for an /api/* URL with _exclusively_ that URL.
  if (location.search?.includes("javascript=false")) {
    const { node: doc } =
      data.referenceDocs.edges.find(
        ({ node }) =>
          buildPathFromFile(node.parent.relativePath) ===
          normalizeRoute(location.pathname),
      ) || {};
    if (!doc) {
      return <Redirect to="/api/introduction" />;
    }
    return (
      <SingleApiReference
        data={{ ...data, doc }}
        pageContext={pageContext}
        isClientRendered={true}
      />
    );
  }

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
      <MDXProvider components={apiReferenceComponents}>
        <LayoutBase
          previewImage={DevelopersPreview}
          title="Stellar API Reference"
          description="The complete API reference for the Stellar network. Includes descriptions of Horizon endpoints, network concepts, and example code for some languages."
          pageContext={pageContext}
          viewport="width=1366, initial-scale=.1"
          path="/api/"
          omitSeoHeadersPredicate={(header) => !header.rel === "canonical"}
        >
          <PrismStyles />
          <ApiReferenceRow>
            <NavColumn forwardedAs="nav" xs={3} lg={3} xl={4}>
              <NavLogo pageName={docType.api} />
              <SideNavBackground />
              <SideNavContainer>
                <NavAbsoluteEl ref={sideNavRef}>
                  {Object.entries(docsBySubCategory).map((nav, i) => (
                    <ExpansionContainer
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                    >
                      <Expansion
                        title={<NavTitle>{nav[0]}</NavTitle>}
                        expandedModeTitle={<NavTitle>{nav[0]}</NavTitle>}
                        collapseIcon={<ChevronIcon direction="up" />}
                        expandIcon={<ChevronIcon direction="down" />}
                        isDefaultExpanded={true}
                      >
                        <SideNavBody
                          items={nav[1]}
                          renderItem={renderItem}
                          forwardedRef={sideNavRef}
                        />
                      </Expansion>
                    </ExpansionContainer>
                  ))}
                </NavAbsoluteEl>
                <AbsoluteNavFooterEl>
                  <StyledLink href="/docs">Documentation</StyledLink>
                </AbsoluteNavFooterEl>
              </SideNavContainer>
            </NavColumn>
            <Column xs={9} xl={18}>
              <NestedRow>
                <CustomColumn xs={9} xlColumn="2 / span 18">
                  <BetaNotice />
                </CustomColumn>
              </NestedRow>
              {referenceDocs.map(({ body, id, parent, title, githubLink }) => (
                <ReferenceSection
                  relativePath={parent.relativePath}
                  key={id}
                  title={title}
                  githubLink={githubLink}
                  body={body}
                  path={buildPathFromFile(parent.relativePath)}
                />
              ))}
              <NestedRow>
                <CustomColumn xs={9} xlColumn="2 / span 10">
                  <Footer />
                </CustomColumn>
              </NestedRow>
            </Column>
          </ApiReferenceRow>
        </LayoutBase>
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
