import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { Trans } from "@lingui/macro";

import { Column, Container, Row } from "basics/Grid";
import { FONT_WEIGHT, THEME, REDESIGN_PALETTE } from "constants/styles";

import components from "constants/componentMapping";
import { DocsBase } from "components/layout/DocsBase";
import { slugify } from "helpers/slugify";
import { Link } from "basics/Links";

const contentId = "content";

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

const ContentEl = styled.article`
  position: relative;
  margin: 0 auto;
`;
const RightNavEl = styled.div`
  font-size: 0.875rem;
  line-height: 1rem;
`;
const ToCLinkEl = styled(Link)`
  display: block;
  margin-bottom: 0.75rem;
  line-height: 1.5rem;
  font-weight: ${FONT_WEIGHT.normal};
  color: ${(props) => (props.isActive ? THEME.text : THEME.lightGrey)};
`;
const OutlineTitleEl = styled.div`
  text-transform: uppercase;
  font-weight: ${FONT_WEIGHT.bold};
  margin-bottom: 1rem;
`;

const Documentation = ({ data, pageContext }) => {
  const { mdx } = data;
  const tableOfContents = mdx.headings.map(({ value }) => ({
    href: `#${slugify(value)}`,
    title: value,
  }));

  const left = <div>full docs table of contents eventually</div>;
  const center = (
    <ContentEl>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </ContentEl>
  );
  const right = (
    <RightNavEl>
      <OutlineTitleEl>
        <Trans>Page Outline</Trans>
      </OutlineTitleEl>
      {tableOfContents.map(({ href, title }) => (
        // TODO: have these be activated when clicked.
        <ToCLinkEl key={href} href={href}>
          {title}
        </ToCLinkEl>
      ))}
    </RightNavEl>
  );

  return (
    <MDXProvider components={components}>
      <div style={{ marginTop: "10rem" }} />
      <DocsBase pageContext={pageContext}>
        <Container id={contentId}>
          <Row>
            <SideNavEl md={3} lg={3}>
              {left}
              <SideNavBackgroundEl />
            </SideNavEl>
            {/*
                  We want the right hand side to appear above content on mobile
                */}
            <Column md={{ hide: true }}>{right}</Column>
            <Column md={7}>{center}</Column>
            <Column md={2}>{right}</Column>
          </Row>
        </Container>
      </DocsBase>
    </MDXProvider>
  );
};

Documentation.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default Documentation;

export const pageQuery = graphql`
  query DocumentationQuery($id: String) {
    mdx(id: { eq: $id }) {
      ...SubpageMetadata
      id
      fileAbsolutePath
      body
      headings(depth: h2) {
        value
      }
    }
  }
`;
