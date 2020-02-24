import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import path from "path";
import { Location } from "@reach/router";

import {
  DEFAULT_COLUMN_WIDTH,
  FONT_WEIGHT,
  THEME,
  REDESIGN_PALETTE,
} from "constants/styles";
import components from "constants/docsComponentMapping";

import { slugify } from "helpers/slugify";
import { smoothScrollTo } from "helpers/dom";
import {
  buildRelPath,
  findInitialOpenTopics,
  findArticle,
  buildDocsContents,
} from "helpers/documentation";

import { BasicButton } from "basics/Buttons";
import { Column, Container, Row } from "basics/Grid";

import Articles from "components/Documentation/Articles";
import { DocsBase } from "components/layout/DocsBase";
import { SideNav, SideNavBody, TrackedContent } from "components/SideNav";
import {
  Content,
  SideNavColumn,
  SideNavBackground,
} from "components/Documentation/SharedStyles";
import { NavFooterLi } from "components/Navigation/SharedStyles";

import Clock from "assets/icons/clock.svg";
import { Footer } from "components/Documentation/Footer";

const contentId = "content";
const { h2: H2, a: StyledLink } = components;

const StickyEl = styled.div`
  width: 100%;
  height: calc(100vh - 121px);
  top: 121px;
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;
  position: sticky;
  z-index: 3;
`;

const Topics = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    padding: 0.55rem 0;
  }
`;

const RightNavEl = styled(StickyEl)`
  font-size: 0.875rem;
  line-height: 1rem;
  margin: 1em 0;

  li:before {
    display: none;
  }
`;
const NavItemEl = styled(BasicButton)`
  display: block;
  line-height: 1.5rem;
  font-weight: ${FONT_WEIGHT.normal};
  color: ${(props) => (props.isActive ? THEME.text : THEME.lightGrey)};
  padding: 0.5rem 0;
  text-align: left;

  &:focus {
    outline: 0;
  }
`;
const OutlineTitleEl = styled.div`
  text-transform: uppercase;
  font-weight: ${FONT_WEIGHT.bold};
  padding: 13px 0;
`;

const RootEl = styled(StyledLink)`
  color: #333;
  line-height: 1.75rem;
  text-decoration: none;
`;

const NextUpEl = styled.div`
  background-color: ${REDESIGN_PALETTE.grey[0]};
  padding: 1em;
`;

const ModifiedEl = styled.div`
  color: ${THEME.lightGrey};

  svg {
    margin-right: 0.5em;
  }
`;

const PageOutlineItem = ({ id, isActive, title }) => (
  <NavItemEl
    isActive={isActive}
    onClick={(e) => {
      e.preventDefault();
      smoothScrollTo(document.getElementById(id));
    }}
  >
    {title}
  </NavItemEl>
);

const componentMapping = {
  ...components,
  // eslint-disable-next-line react/prop-types
  a: React.forwardRef(function DocsLink({ href, ...props }, ref) {
    return (
      <Location>
        {({ location }) => {
          // eslint-disable-next-line react/prop-types
          let url = href.split(".mdx")[0].replace("index", "");
          if (url.startsWith(".")) {
            url = path.resolve(location.pathname, url);
          }
          return <StyledLink ref={ref} href={url} {...props} />;
        }}
      </Location>
    );
  }),
  // eslint-disable-next-line react/prop-types
  h2: ({ children }) => (
    <TrackedContent>
      <H2>{children}</H2>
    </TrackedContent>
  ),
};

const Documentation = ({ data, pageContext, location }) => {
  const { allFile } = data;
  const { relativeDirectory, name, rootDir } = pageContext;

  const docsContents =
    (location.state && location.state.compiledDocsContents) ||
    buildDocsContents(allFile.group, rootDir);

  const pagePath = buildRelPath(relativeDirectory, rootDir);

  const initialTopicsState = findInitialOpenTopics(
    allFile.group,
    pagePath,
    rootDir,
  );
  const article = findArticle(pagePath, docsContents)[name];
  const { body, modifiedTime, nextUp: articleNextUp } = article;

  const pageOutline = article.headings.map(({ value }) => ({
    href: `#${slugify(value)}`,
    title: value,
  }));
  const left = (
    <Topics>
      {Object.values(docsContents).map((content) => {
        const { articles, id, topicPath, title } = content;
        if (topicPath === buildRelPath(rootDir, rootDir)) {
          return Object.values(articles).map((rootArticle) => (
            <li key={id}>
              <RootEl href="/docs">{rootArticle.title}</RootEl>
            </li>
          ));
        }
        return (
          <Articles
            articles={articles}
            key={id}
            initialTopicsState={initialTopicsState}
            title={title}
            topicPath={topicPath}
          />
        );
      })}
      <NavFooterLi>
        <StyledLink href="/api">API Reference</StyledLink>
      </NavFooterLi>
    </Topics>
  );
  const center = (
    <Content>
      <MDXRenderer>{body}</MDXRenderer>
      <ModifiedEl>
        <Clock />
        Last updated {modifiedTime}
      </ModifiedEl>
      <NextUpEl>
        Next Up:{" "}
        <StyledLink
          href={articleNextUp.url}
          state={{ compiledDocsContents: docsContents }}
        >
          {articleNextUp.title}
        </StyledLink>
      </NextUpEl>
    </Content>
  );
  const right = (
    <RightNavEl>
      <OutlineTitleEl>Page Outline</OutlineTitleEl>
      <SideNav>
        <SideNavBody items={pageOutline} renderItem={PageOutlineItem} />
      </SideNav>
    </RightNavEl>
  );

  return (
    <MDXProvider components={componentMapping}>
      <DocsBase pageContext={pageContext}>
        <Container id={contentId}>
          <Row>
            <SideNavColumn md={3} lg={3}>
              <SideNavBackground />
              <StickyEl>{left}</StickyEl>
            </SideNavColumn>
            {/*
              We want the right hand side to appear above content on mobile
            */}
            <Column md={{ hide: true }}>{right}</Column>
            <Column md={7}>
              {center}
              <Footer />
            </Column>
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
  location: PropTypes.object,
};

PageOutlineItem.propTypes = {
  isActive: PropTypes.bool,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Documentation;

export const pageQuery = graphql`
  query DocumentationQuery {
    allFile(
      filter: {
        sourceInstanceName: { eq: "docs" }
        extension: { eq: "mdx" }
        relativePath: { regex: "/docs/" }
      }
      sort: { fields: [childMdx___frontmatter___order] }
    ) {
      group(field: relativeDirectory) {
        fieldValue
        nodes {
          id
          modifiedTime(formatString: "MMM. DD, YYYY")
          name
          relativePath
          childMdx {
            body
            headings(depth: h2) {
              value
            }
            id
            frontmatter {
              title
              order
            }
          }
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
`;
