import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled, { css } from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { Trans } from "@lingui/macro";
import path from "path";
import { Location } from "@reach/router";

import { Column, Container, Row } from "basics/Grid";
import {
  DEFAULT_COLUMN_WIDTH,
  FONT_WEIGHT,
  THEME,
  REDESIGN_PALETTE,
} from "constants/styles";
import components from "constants/docsComponentMapping";
import Articles from "components/Documentation/Articles";
import Chevron from "assets/icons/chevron.svg";
import Clock from "assets/icons/clock.svg";
import { DocsBase } from "components/layout/DocsBase";
import { slugify } from "helpers/slugify";
import { Link } from "basics/Links";
import { buildPathFromFile } from "utils";

const contentId = "content";

const El = styled.div`
  width: 100%;
  height: calc(100vh - 121px);
  top: 121px;
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;
  position: sticky;
  z-index: 3;
`;

const SideNavEl = styled(Column)`
  background-color: ${REDESIGN_PALETTE.grey[0]};
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

const Topics = styled.ul`
  list-style-type: none;
  padding: 0;

  button {
    background: none;
    border: 0;
    cursor: pointer;
  }
`;

const TopicExpander = styled.button`
  &:focus {
    outline: 0;
  }
  padding: 0;
  svg {
    margin-left: 0.5em;
    transform: rotate(${(props) => (props.isCollapsed ? "90deg" : "0deg")});
    transition: transform 0.25s ease-out;
  }
`;

const containerStyles = css`
  margin: 0;
  min-width: 80rem;
  max-width: 140rem;
`;
const ContainerEl = styled(Container)`
  && {
    ${containerStyles}
  }
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

const RootEl = styled.a`
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

const StyledLink = components.a;
const componentMapping = {
  ...components,
  // eslint-disable-next-line react/prop-types
  a: React.forwardRef(function DocsLink({ href, ...props }, ref) {
    return (
      <Location>
        {({ location }) => {
          let url = href.split(".mdx")[0].replace("index", "");
          if (url.startsWith(".")) {
            url = path.resolve(location.pathname, url);
          }
          return <StyledLink ref={ref} href={url} {...props} />;
        }}
      </Location>
    );
  }),
};

const nextUp = (topicArr, topicIndex, childArr, childIndex) => {
  // End of list
  if (topicIndex + 1 === topicArr.length) {
    return { title: "", url: "" };
  }

  // Go to next topic
  if (childIndex === childArr.length - 1) {
    const nextTopic = topicArr[topicIndex + 1];
    return {
      title: nextTopic.nodes[0].fields.metadata.data.title,
      url: `${buildPathFromFile(nextTopic.nodes[0])}`,
    };
  }

  // Go to next article in topic
  const nextChild = childArr[childIndex + 1];
  return {
    title: nextChild.childMdx.frontmatter.title,
    url: buildPathFromFile(nextChild),
  };
};

const buildDocsContents = (data) => {
  const contents = {};
  const sortedDocs = [...data].sort(
    (a, b) =>
      a.nodes[0].fields.metadata.data.order -
      b.nodes[0].fields.metadata.data.order,
  );

  sortedDocs.forEach((topic, topicIndex, topicArr) => {
    const { fieldValue: topicPath } = topic;
    const topicId = topic.nodes[0].id;
    const topicTitle = topic.nodes[0].fields.metadata.data.title;
    const articles = {};

    topic.nodes.forEach((node, childIndex, childArr) => {
      const { childMdx, modifiedTime, relativePath } = node;
      const {
        body,
        headings,
        frontmatter: { title: articleTitle },
        id: articleId,
      } = childMdx;
      articles[relativePath] = {
        id: articleId,
        body,
        headings,
        modifiedTime,
        title: articleTitle,
        url: buildPathFromFile(node),
        nextUp: nextUp(topicArr, topicIndex, childArr, childIndex),
      };
    });
    contents[topicPath] = {
      id: topicId,
      topicPath,
      title: topicTitle,
      articles,
    };
  });

  return contents;
};

const Documentation = ({ data, pageContext, location }) => {
  const { allFile } = data;
  const { relativeDirectory, relativePath, rootDir } = pageContext;

  const docsContents =
    (location.state && location.state.compiledDocsContents) ||
    buildDocsContents(allFile.group);

  const initialTopicsState = {};
  Object.values(docsContents).forEach((content) => {
    initialTopicsState[content.topicPath] =
      content.topicPath === relativeDirectory;
  });
  const [topicState, setTopicState] = useState(initialTopicsState);
  const topicToggleHandler = (content) => {
    const topicPath = content.topicPath;
    setTopicState({
      ...topicState,
      [topicPath]: !topicState[topicPath],
    });
  };
  const article = docsContents[relativeDirectory].articles[relativePath];
  const { body, modifiedTime, nextUp: articleNextUp } = article;

  const pageOutline = article.headings.map(({ value }) => ({
    href: `#${slugify(value)}`,
    title: value,
  }));
  const left = (
    <Topics>
      {Object.values(docsContents).map((content) => {
        const { articles, id, topicPath, title } = content;
        const isCollapsed = topicState[topicPath];
        if (topicPath === rootDir) {
          return Object.values(articles).map((rootArticle) => (
            <li key={id}>
              <RootEl href="/docs/">{rootArticle.title}</RootEl>
            </li>
          ));
        }

        return (
          <li key={id}>
            <TopicExpander
              isCollapsed={isCollapsed}
              type="button"
              onClick={() => topicToggleHandler(content)}
            >
              {title}
              <Chevron />
            </TopicExpander>
            <Articles isCollapsed={isCollapsed} articles={articles} />
          </li>
        );
      })}
    </Topics>
  );
  const center = (
    <ContentEl>
      <MDXRenderer>{body}</MDXRenderer>
      <ModifiedEl>
        <Clock />
        Last updated {modifiedTime}
      </ModifiedEl>
      <NextUpEl>
        Next Up:{" "}
        <Link
          href={articleNextUp.url}
          state={{ compiledDocsContents: docsContents }}
        >
          {articleNextUp.title}
        </Link>
      </NextUpEl>
    </ContentEl>
  );
  const right = (
    <RightNavEl>
      <OutlineTitleEl>
        <Trans>Page Outline</Trans>
      </OutlineTitleEl>
      {pageOutline.map(({ href, title }) => (
        // TODO: have these be activated when clicked.
        <ToCLinkEl key={href} href={href}>
          {title}
        </ToCLinkEl>
      ))}
    </RightNavEl>
  );

  return (
    <MDXProvider components={componentMapping}>
      <div style={{ marginTop: "10rem" }} />
      <DocsBase pageContext={pageContext}>
        <ContainerEl id={contentId}>
          <Row>
            <SideNavEl md={3} lg={3}>
              <SideNavBackgroundEl />
              <El>{left}</El>
            </SideNavEl>
            {/*
                  We want the right hand side to appear above content on mobile
                */}
            <Column md={{ hide: true }}>{right}</Column>
            <Column md={7}>{center}</Column>
            <Column md={2}>{right}</Column>
          </Row>
        </ContainerEl>
      </DocsBase>
    </MDXProvider>
  );
};

Documentation.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default Documentation;

export const pageQuery = graphql`
  query DocumentationQuery {
    allFile(
      filter: {
        sourceInstanceName: { eq: "docs" }
        extension: { eq: "mdx" }
        relativePath: { regex: "/src/docs/" }
      }
      sort: { fields: [childMdx___frontmatter___order] }
    ) {
      group(field: relativeDirectory) {
        fieldValue
        nodes {
          id
          modifiedTime(formatString: "MMM. DD, YYYY")
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
