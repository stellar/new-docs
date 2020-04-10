import React from "react";
import { Location } from "@reach/router";
import pathLib from "path";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import {
  CSS_TRANSITION_SPEED,
  FONT_WEIGHT,
  PALETTE,
  DEFAULT_COLUMN_WIDTH,
} from "constants/styles";
import { components } from "constants/docsComponentMapping";
import { docType } from "constants/docType";
import { DOM_TARGETS } from "constants/domNodes";

import { sortReference } from "helpers/sortReference";
import { groupByCategory } from "helpers/documentation";
import { makeLinkedHeader } from "helpers/makeLinkedHeader";
import { getDescriptionFromAst, normalizeMdx } from "helpers/mdx";
import { buildPathFromFile } from "helpers/routes";

import { BasicButton } from "basics/Buttons";
import { H1, H2, H3, H4, H5, H6, HorizontalRule } from "basics/Text";
import { Column } from "basics/Grid";
import { ArrowIcon } from "basics/Icons";

import { Footer } from "components/Documentation/Footer";
import { LayoutBase } from "components/layout/LayoutBase";
import { Expansion } from "components/Expansion";

import { SideNav, SideNavBody } from "components/SideNav";
import {
  ApiReferenceRow,
  ApiReferenceWrapper,
  SideNavColumn,
  NestedRow,
} from "components/Documentation/SharedStyles";
import { SideNavBackground } from "components/Navigation/SharedStyles";

import DevelopersPreview from "assets/images/og_developers.jpg";

const GreenTableCell = styled.td`
  color: ${PALETTE.lightGreen};
`;
const OrangeTableCell = styled.td`
  color: ${PALETTE.lightOrage};
`;
const ExpansionContainerEl = styled.div`
  margin-top: 1rem;
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;

  &:last-child {
    padding-bottom: 2.25rem;
  }
`;
const NavTitleEl = styled(H5)`
  margin: 0;
  line-height: normal;
  font-weight: ${FONT_WEIGHT.bold};
  text-transform: uppercase;
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
    color: ${PALETTE.lightGrey};
  }
`;

const StyledLink = components.a;
// eslint-disable-next-line react/prop-types
const DocsLink = ({ href, ...props }) => (
  <Location>
    {({ location }) => {
      // eslint-disable-next-line react/prop-types
      let url = href.split(".mdx")[0].replace("index", "");
      if (url.startsWith(".")) {
        url = pathLib.resolve(location.pathname, url);
      }
      if (/no-js/.test(url)) {
        url = `${url.replace("no-js/", "")}?javascript=false`;
      }
      return <StyledLink href={url} {...props} />;
    }}
  </Location>
);
const NavLinkEl = styled(DocsLink)`
  color: inherit;
  font-weight: unset;
`;

// This is a function, not a component
// eslint-disable-next-line react/prop-types
const renderItem = ({ depth, id, isActive, title }) => (
  <NavItemEl depth={depth} isActive={isActive}>
    <NavLinkEl href={`/no-js/${id}`}>{title}</NavLinkEl>
  </NavItemEl>
);

const headerOptions = {
  treatIdAsHref: true,
  LinkComponent: DocsLink,
};
const ApiRefH1 = makeLinkedHeader(H1, headerOptions);
const ApiRefH2 = makeLinkedHeader(H2, headerOptions);
const ApiRefH3 = makeLinkedHeader(H3, headerOptions);
const ApiRefH4 = makeLinkedHeader(H4, headerOptions);
const ApiRefH5 = makeLinkedHeader(H5, headerOptions);
const ApiRefH6 = makeLinkedHeader(H6, headerOptions);

const componentMap = {
  ...components,
  a: DocsLink,
  wrapper: ApiReferenceWrapper,
  h1: styled(components.h1).attrs({ as: ApiRefH1 }),
  h2: styled(components.h2).attrs({ as: ApiRefH2 }),
  h3: styled(components.h3).attrs({ as: ApiRefH3 }),
  h4: styled(components.h4).attrs({ as: ApiRefH4 }),
  h5: styled(components.h5).attrs({ as: ApiRefH5 }),
  h6: styled(components.h6).attrs({ as: ApiRefH6 }),
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

// eslint-disable-next-line react/no-multi-comp
const SingleApiReference = React.memo(function ApiReference({
  data,
  pageContext,
}) {
  const referenceDocs = sortReference(
    data.referenceDocs.edges.map(({ node }) => normalizeMdx(node)),
  );
  const docsBySubCategory = groupByCategory(referenceDocs);

  const { parent, frontmatter, body, mdxAST: mdxAst } = data.doc;
  const path = buildPathFromFile(parent.relativePath);
  const description = React.useMemo(
    () => frontmatter.description || getDescriptionFromAst(mdxAst),
    [mdxAst, frontmatter.description],
  );

  return (
    <MDXProvider components={componentMap}>
      <LayoutBase
        previewImage={DevelopersPreview}
        description={description}
        pageContext={pageContext}
      >
        <ApiReferenceRow>
          <SideNavColumn xs={3} lg={3} xl={4}>
            <SideNavBackground />
            <SideNav docType={docType.api}>
              {Object.entries(docsBySubCategory).map((nav, i) => (
                <ExpansionContainerEl
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                >
                  <Expansion
                    title={<NavTitleEl>{nav[0]}</NavTitleEl>}
                    expandedModeTitle={<NavTitleEl>{nav[0]}</NavTitleEl>}
                    collapseIcon={<ArrowIcon direction="up" />}
                    expandIcon={<ArrowIcon direction="down" />}
                    isDefaultExpanded={true}
                  >
                    <SideNavBody items={nav[1]} renderItem={renderItem} />
                  </Expansion>
                </ExpansionContainerEl>
              ))}
            </SideNav>
          </SideNavColumn>
          <Column
            xs={9}
            xl={18}
            isIndependentScroll
            id={`${DOM_TARGETS.contentColumn}`}
          >
            <section>
              <ApiRefH1 id={path}>{frontmatter.title}</ApiRefH1>
              <NestedRow>
                <MDXRenderer>{body}</MDXRenderer>
              </NestedRow>
              <HorizontalRule />
            </section>
            <Footer />
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
