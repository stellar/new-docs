import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXProvider } from "@mdx-js/react";

import { apiReferenceComponents } from "constants/docsComponentMapping";
import { docType } from "constants/docType";

import { sortReference } from "helpers/sortReference";
import { groupByCategory } from "helpers/documentation";
import { getDescriptionFromAst, normalizeMdx } from "helpers/mdx";
import { buildPathFromFile, normalizeRoute } from "helpers/routes";

import { Column } from "basics/Grid";
import { ChevronIcon } from "basics/Icons";

import { Footer } from "components/Footer";
import { LayoutBase } from "components/layout/LayoutBase";
import { Expansion } from "components/Expansion";

import { NavItem } from "components/ApiReference/NavItem";
import { ReferenceSection } from "components/ApiReference/ReferenceSection";
import {
  ApiReferenceRow,
  CustomColumn,
  ExpansionContainer,
  NavLink,
  NavTitle,
  NestedRow,
} from "components/ApiReference/SharedStyles";
import { SideNavProgressContext, SideNavBody } from "components/SideNav";
import {
  AbsoluteNavFooterEl,
  SideNavContainer,
  SideNavBackground,
  NavLogo,
  NavColumn,
} from "components/Navigation/SharedStyles";
import { BetaNotice } from "components/BetaNotice";

import DevelopersPreview from "assets/images/og_developers.jpg";

const SingleApiSideNavContainerEl = styled(SideNavContainer)`
  overflow: scroll;
  height: calc(100vh - 8.75rem);
`;

// This is a function, not a component
/* eslint-disable react/prop-types */
const renderItem = ({
  depth,
  id,
  isActive,
  title,
  forwardedRef,
  isFirstItem,
  /* eslint-disable react/prop-types */
}) => (
  <NavItem depth={depth} forwardedRef={forwardedRef} isActive={isActive}>
    <NavLink href={normalizeRoute(`/no-js/${id}`)}>
      {isFirstItem ? "Overview" : title}
    </NavLink>
  </NavItem>
);

const { a: StyledLink } = apiReferenceComponents;

// eslint-disable-next-line react/no-multi-comp
const SingleApiReference = React.memo(function ApiReference({
  data,
  pageContext,
  isClientRendered = false,
}) {
  const referenceDocs = sortReference(
    data.referenceDocs.edges.map(({ node }) => normalizeMdx(node)),
  );
  const docsBySubCategory = groupByCategory(referenceDocs);

  const {
    parent,
    frontmatter,
    body,
    mdxAST: mdxAst,
    title,
    githubLink,
  } = normalizeMdx(data.doc);
  const path = buildPathFromFile(parent.relativePath);
  const description = React.useMemo(() => {
    // If the page is loaded as `/api/…?javascript=false`, then we won't have the
    // MDX AST from which to pull a description, but we also don't need it -- the
    // description is only for metadata.
    if (isClientRendered) {
      return "";
    }
    return frontmatter.description || getDescriptionFromAst(mdxAst);
  }, [mdxAst, frontmatter.description, isClientRendered]);

  return (
    <MDXProvider components={apiReferenceComponents}>
      <LayoutBase
        previewImage={DevelopersPreview}
        description={description}
        pageContext={pageContext}
        path={path}
      >
        <ApiReferenceRow>
          <NavColumn xs={3} lg={3} xl={4}>
            <NavLogo pageName={docType.api} />
            <SideNavBackground />
            <SideNavProgressContext.Provider
              value={{ activeContent: { id: path } }}
            >
              <SingleApiSideNavContainerEl>
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
                      <SideNavBody items={nav[1]} renderItem={renderItem} />
                    </Expansion>
                  </ExpansionContainer>
                ))}
              </SingleApiSideNavContainerEl>
            </SideNavProgressContext.Provider>
            <AbsoluteNavFooterEl>
              <StyledLink href="https://developers.stellar.org/docs">
                Documentation
              </StyledLink>
            </AbsoluteNavFooterEl>
          </NavColumn>
          <Column xs={9} xl={18}>
            <NestedRow>
              <CustomColumn xs={9} xlColumn="2 / span 8">
                <BetaNotice />
              </CustomColumn>
            </NestedRow>
            <ReferenceSection
              relativePath={parent.relativePath}
              title={title}
              githubLink={githubLink}
              body={body}
              path={path}
            />
            <NestedRow>
              <CustomColumn xs={9} xlColumn="2 / span 18">
                <Footer />
              </CustomColumn>
            </NestedRow>
          </Column>
        </ApiReferenceRow>
      </LayoutBase>
    </MDXProvider>
  );
});

SingleApiReference.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default SingleApiReference;

export const pageQuery = graphql`
  query SingleApiReferenceQuery($ids: [String], $docId: String) {
    doc: mdx(id: { eq: $docId }) {
      ...ApiReferencePage
      mdxAST
    }
    referenceDocs: allMdx(filter: { id: { in: $ids } }) {
      edges {
        node {
          id
          frontmatter {
            title
            order
          }
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
