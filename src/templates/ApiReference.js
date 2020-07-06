import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Helmet from "react-helmet";

import { PALETTE } from "constants/styles";
import { apiReferenceComponents } from "constants/docsComponentMapping";
import { docType } from "constants/docType";

import { sortReference } from "helpers/sortReference";
import { groupByCategory } from "helpers/documentation";
import { normalizeMdx } from "helpers/mdx";
import { buildPathFromFile } from "helpers/routes";

import { Column } from "basics/Grid";
import { HorizontalRule } from "basics/Text";
import { ChevronIcon, EditIcon } from "basics/Icons";
import { Link } from "basics/Links";
import { PrismStyles } from "basics/Prism";

import { NavItem } from "components/ApiReference/NavItem";
import {
  NavLink,
  NavTitle,
  ExpansionContainer,
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
} from "components/Navigation/SharedStyles";
import { SideNavBody, TrackedContent } from "components/SideNav";
import { ScrollRouter } from "components/ApiRefRouting/ScrollRouter";
import { Route } from "components/ApiRefRouting/Route";
import {
  ApiReferenceRow,
  NestedRow,
  SideNavColumn,
  CustomColumn,
} from "components/Documentation/SharedStyles";
import { Expansion } from "components/Expansion";

import DevelopersPreview from "assets/images/og_developers.jpg";

const SectionEl = styled.section`
  &:first-child {
    margin-top: 5rem;
  }
`;

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

const { h1: H1, h2: H2, a: StyledLink } = apiReferenceComponents;

const ReferenceSection = React.memo(
  ({ body, relativePath, title, githubLink }) => {
    const path = buildPathFromFile(relativePath);
    const splitRelativePath = relativePath.split("/");

    /* Check to see if a section is a nested item */
    const isNestedSection =
      relativePath.split("/").length > 3 &&
      splitRelativePath[splitRelativePath.length - 1] !== "index.mdx";

    const SectionHeader = isNestedSection ? (
      <H2 id={path}>{title}</H2>
    ) : (
      <H1 id={path}>{title}</H1>
    );

    return (
      <SectionEl>
        <Route originalFilePath={relativePath} path={path}>
          <TrackedContent identifier={path}>
            <NestedRow>
              {/* Hack to make it look appear as if we had a column-gap
              4rem in between <CustomColumn/> on a large screen (min-width: 1440px)
              skip the 1st column to use it as column-gap, start at the 2nd column and
              span through then next 8 columns (ends at column 9)
              */}
              <CustomColumn xs={9} xlColumn="2 / span 8">
                {SectionHeader}
                {githubLink && (
                  <Link href={githubLink} newTab>
                    <EditIcon color={PALETTE.purpleBlue} />
                  </Link>
                )}
              </CustomColumn>
            </NestedRow>
            <NestedRow>
              <MDXRenderer>{body}</MDXRenderer>
            </NestedRow>
            <HorizontalRule />
          </TrackedContent>
        </Route>
      </SectionEl>
    );
  },
);

ReferenceSection.propTypes = {
  body: PropTypes.node.isRequired,
  relativePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  githubLink: PropTypes.string,
};

// eslint-disable-next-line react/no-multi-comp
const ApiReference = React.memo(function ApiReference({ data, pageContext }) {
  const referenceDocs = sortReference(
    data.referenceDocs.edges.map(({ node }) => normalizeMdx(node)),
  );
  const sideNavRef = React.useRef();
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
        >
          <PrismStyles />
          <ApiReferenceRow>
            <SideNavColumn xs={3} lg={3} xl={4}>
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
            </SideNavColumn>
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
