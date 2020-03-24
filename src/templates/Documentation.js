import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import path from "path";
import { Location } from "@reach/router";

import {
  FONT_WEIGHT,
  THEME,
  REDESIGN_PALETTE,
  DEFAULT_COLUMN_WIDTH,
  PALETTE,
} from "constants/styles";
import { components } from "constants/docsComponentMapping";
import { docType } from "constants/docType";

import { slugify } from "helpers/slugify";
import { smoothScrollTo } from "helpers/dom";
import {
  buildRelPath,
  findInitialOpenTopics,
  findArticle,
  buildDocsContents,
} from "helpers/documentation";
import { getDescriptionFromAst } from "helpers/mdx";
import { normalizeRoute } from "helpers/routes";

import { BasicButton } from "basics/Buttons";
import { EditIcon } from "basics/Icons";
import { Column } from "basics/Grid";
import { Link } from "basics/Links";
import { PrismStyles } from "basics/Prism";
import { ListItem } from "basics/Text";

import Articles from "components/Documentation/Articles";
import { LayoutBase } from "components/layout/LayoutBase";
import { SideNav, SideNavBody, TrackedContent } from "components/SideNav";
import {
  Content,
  SideNavColumn,
  OneSizeRow,
  Container,
} from "components/Documentation/SharedStyles";
import { Footer } from "components/Documentation/Footer";
import {
  NavAbsoluteEl,
  AbsoluteNavFooterEl,
  StickyEl,
  SideNavBackground,
} from "components/Navigation/SharedStyles";

import Clock from "assets/icons/clock.svg";
import DevelopersPreview from "assets/images/og_developers.jpg";

const contentId = "content";
const { h1: H1, h2: H2, a: StyledLink } = components;

const Topics = styled.ul`
  list-style-type: none;
  padding: 0;
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;
  padding-bottom: 1rem;
  margin-right: 1rem;
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
  font-size: 0.875rem;
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
  padding: 0.75rem 0;
`;

const RootItemEl = styled(ListItem)`
  padding: 0.5rem 0;
`;
const RootLinkEl = styled(StyledLink)`
  color: ${PALETTE.black80};
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
  const { articleBody, allFile } = data;
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

  const { body, headings, mdxAST: mdxAst } = articleBody.childMdx;
  const {
    title: header,
    description: contentDescription,
    modifiedTime,
    githubLink,
    nextUp: articleNextUp,
  } = findArticle(pagePath, docsContents)[name];

  const description = React.useMemo(
    () => contentDescription || getDescriptionFromAst(mdxAst),
    [mdxAst, contentDescription],
  );

  const pageOutline = headings.map(({ value }) => ({
    href: `#${slugify(value)}`,
    title: value,
  }));

  const left = (
    <Topics>
      {Object.values(docsContents).map((content) => {
        const { articles, id, topicPath, title } = content;
        if (topicPath === buildRelPath(rootDir, rootDir)) {
          return Object.values(articles).map((rootArticle) => (
            <RootItemEl key={id}>
              <RootLinkEl href="/docs">{rootArticle.title}</RootLinkEl>
            </RootItemEl>
          ));
        }
        return (
          <Articles
            articles={articles}
            key={id}
            id={id}
            initialTopicsState={initialTopicsState}
            title={title}
            topicPath={topicPath}
            activeItem={name}
          />
        );
      })}
    </Topics>
  );
  const center = (
    <Content>
      <H1>{header}</H1>
      {githubLink && (
        <Link href={githubLink} newTab>
          <EditIcon color={PALETTE.purpleBlue} />
        </Link>
      )}
      <MDXRenderer>{body}</MDXRenderer>
      <ModifiedEl>
        <Clock />
        Last updated {modifiedTime}
      </ModifiedEl>
      {articleNextUp && (
        <NextUpEl>
          Next Up:{" "}
          <StyledLink
            href={articleNextUp.url}
            state={{ compiledDocsContents: docsContents }}
          >
            {articleNextUp.title}
          </StyledLink>
        </NextUpEl>
      )}
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
      <LayoutBase
        title={
          normalizeRoute(location.pathname) === "/docs/"
            ? "Stellar Documentation"
            : `${header} – Stellar Documentation`
        }
        description={description}
        previewImage={DevelopersPreview}
        pageContext={pageContext}
      >
        <PrismStyles isDoc />
        <Container id={contentId}>
          <OneSizeRow>
            <SideNavColumn xs={3}>
              <SideNavBackground />
              <SideNav docType={docType.doc}>
                <NavAbsoluteEl>{left}</NavAbsoluteEl>
                <AbsoluteNavFooterEl>
                  <StyledLink href="/api">API Reference</StyledLink>
                </AbsoluteNavFooterEl>
              </SideNav>
            </SideNavColumn>
            <Column xs={9} md={7}>
              {center}
              <Footer />
            </Column>
            {headings.length > 0 && (
              <Column xs={{ hide: true }} md={2}>
                {right}
              </Column>
            )}
          </OneSizeRow>
        </Container>
      </LayoutBase>
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
  query DocumentationQuery($mdxId: String) {
    articleBody: file(childMdx: { id: { eq: $mdxId } }) {
      childMdx {
        body
        mdxAST
        headings(depth: h2) {
          value
        }
      }
    }
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
            id
            frontmatter {
              title
              description
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
