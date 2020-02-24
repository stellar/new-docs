import React from "react";
import { Location } from "@reach/router";
import pathLib from "path";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import {
  NAV_THEMES,
  CSS_TRANSITION_SPEED,
  FONT_WEIGHT,
  PALETTE,
} from "constants/styles";
import components from "constants/docsComponentMapping";

import { sortReference, normalizeMdx } from "helpers/sortReference";
import { groupByCategory } from "helpers/documentation";

import { BasicButton } from "basics/Buttons";
import { HorizontalRule, LinkedH1 } from "basics/Text";
import { Column } from "basics/Grid";
import { ArrowIcon } from "basics/Icons";

import { Footer } from "components/Documentation/Footer";
import { DocsBase } from "components/layout/DocsBase";
import { Expansion } from "components/Expansion";
import { NavFrame } from "components/Navigation/SharedStyles";
import { NavLogo } from "components/Navigation/NavLogo";
import { SideNav, SideNavBody } from "components/SideNav";
import {
  Container,
  ApiReferenceRow,
  ApiReferenceWrapper,
  SideNavColumn,
  SideNavBackground,
  NestedRow,
} from "components/Documentation/SharedStyles";

import { buildPathFromFile } from "../../buildHelpers/routes";

const GreenTableCell = styled.td`
  color: ${PALETTE.lightGreen};
`;
const OrangeTableCell = styled.td`
  color: ${PALETTE.lightOrage};
`;
const ExpansionContainerEl = styled.div`
  margin-top: 1rem;
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

// eslint-disable-next-line react/no-multi-comp
const ApiReference = React.memo(function ApiReference({ data, pageContext }) {
  const referenceDocs = sortReference(
    data.referenceDocs.edges.map(({ node }) => normalizeMdx(node)),
  );
  const docsBySubCategory = groupByCategory(referenceDocs);

  const { parent, frontmatter, body } = data.doc;
  const path = buildPathFromFile(parent.relativePath);

  return (
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
          <ApiReferenceRow style={{ marginTop: "5rem" }}>
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
            <Column xs={9} xl={18}>
              <section>
                <LinkedH1 id={path}>{frontmatter.title}</LinkedH1>
                <NestedRow>
                  <MDXRenderer>{body}</MDXRenderer>
                </NestedRow>
                <HorizontalRule />
              </section>
              <Footer />
            </Column>
            <Column xs={4} xl={9} />
          </ApiReferenceRow>
        </Container>
      </DocsBase>
    </MDXProvider>
  );
});

ApiReference.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default ApiReference;

export const pageQuery = graphql`
  query SingleApiReferenceQuery($ids: [String], $docId: String) {
    doc: mdx(id: { eq: $docId }) {
      ...ApiReferencePage
    }
    referenceDocs: allMdx(filter: { id: { in: $ids } }) {
      edges {
        node {
          ...ApiReferencePage
        }
      }
    }
  }
`;
