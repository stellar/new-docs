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
  return longPath
    .split("/")
    .pop()
    .replace(".mdx", "");
};

const nextUp = (topicArr, topicIndex, childArr, childIndex) => {
  if (topicIndex + 1 === topicArr.length) {
    return null;
  }
  if (childIndex === childArr.length - 1) {
    return `/${relPath(topicArr[topicIndex + 1].fieldValue)}`;
  }

  return relPath(childArr[childIndex + 1].relativePath);
};

const buildTableOfContents = (data) => {
  return data.map((topic, topicIndex, topicArr) => {
    const topicPath = topic.fieldValue.replace("src/docs", "");
    const title = topic.nodes[0].fields.metadata.data.title;
    const articles = topic.nodes.map((node, childIndex, childArr) => ({
      title: node.childMdx.frontmatter.title,
      url: node.relativePath
        .replace(`${topic.fieldValue}/`, "")
        .replace(".mdx", ""),
      next: nextUp(topicArr, topicIndex, childArr, childIndex),
    }));

    return {
      topicPath,
      title,
      articles,
    };
  });
};

const Documentation = ({ data, pageContext }) => {
  const { mdx, allFile } = data;
  const pageOutline = mdx.headings.map(({ value }) => ({
    href: `#${slugify(value)}`,
    title: value,
  }));

  const tableOfContents = buildTableOfContents(allFile.group);
  const topics = {};
  tableOfContents.forEach((content) => {
    topics[content.topicPath] = false;
  });
  const [topicState, setTopicState] = useState(topics);
  const topicToggleHandler = (content) => {
    setTopicState({
      ...topicState,
      [content.topicPath]: !topicState[content.topicPath],
    });
  };
  const left = (
    <Topics>
      {tableOfContents.map((content) => {
        const isCollapsed = topicState[content.topicPath];

        return (
          <li>
            <button type="button" onClick={() => topicToggleHandler(content)}>
              {content.title}
            </button>
            <Articles isCollapsed={isCollapsed} articles={content.articles} />
          </li>
        );
      })}
    </Topics>
  );
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
        totalCount
        nodes {
          relativePath
          childMdx {
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
