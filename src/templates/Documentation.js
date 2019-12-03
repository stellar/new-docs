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
import { DocsBase } from "components/layout/DocsBase";
import { slugify } from "helpers/slugify";
import { Link } from "basics/Links";

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

const relPath = (longPath) => {
  const shortPath = longPath.replace("src/", "").replace(".mdx", "");

  const shortPathArr = shortPath.split("/");

  if (shortPathArr.splice(-1)[0] === "index") {
    return shortPathArr.join("/");
  }

  return shortPath;
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
      url: `${relPath(nextTopic.nodes[0].relativePath)}`,
    };
  }

  // Go to next article in topic
  const nextChild = childArr[childIndex + 1];
  return {
    title: nextChild.childMdx.frontmatter.title,
    url: relPath(nextChild.relativePath),
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
    const topicPath = topic.fieldValue;
    const title = topic.nodes[0].fields.metadata.data.title;
    const articles = {};

    topic.nodes.forEach((node, childIndex, childArr) => {
      const childMdx = node.childMdx;
      articles[node.relativePath] = {
        body: childMdx.body,
        headings: childMdx.headings,
        title: childMdx.frontmatter.title,
        url: relPath(node.relativePath),
        nextUp: nextUp(topicArr, topicIndex, childArr, childIndex),
      };
    });
    contents[topic.fieldValue] = {
      topicPath,
      title,
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

  const pageOutline = article.headings.map(({ value }) => ({
    href: `#${slugify(value)}`,
    title: value,
  }));
  const left = (
    <Topics>
      {Object.values(docsContents).map((content) => {
        const isCollapsed = topicState[content.topicPath];
        if (content.topicPath === rootDir) {
          return (
            <li>
              <Link href="/docs/">Introduction</Link>
            </li>
          );
        }

        return (
          <li>
            <TopicExpander
              type="button"
              onClick={() => topicToggleHandler(content)}
            >
              {content.title}
            </TopicExpander>
            <Articles isCollapsed={isCollapsed} articles={content.articles} />
          </li>
        );
      })}
    </Topics>
  );
  const center = (
    <ContentEl>
      <MDXRenderer>{article.body}</MDXRenderer>
      <span>
        Up Next:{" "}
        <Link
          href={article.nextUp.url}
          state={{ compiledDocsContents: docsContents }}
        >
          {article.nextUp.title}
        </Link>
      </span>
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
          relativePath
          childMdx {
            body
            id
            headings(depth: h2) {
              value
            }
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
