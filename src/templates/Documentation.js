import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import path from "path";
import { Location } from "@reach/router";

import { FONT_WEIGHT, THEME, PALETTE } from "constants/styles";
import { components } from "constants/docsComponentMapping";
import { docType } from "constants/docType";
import { DOM_TARGETS } from "constants/domNodes";

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
import { loopAndExtractString } from "helpers/extractStringChildren";

import { BetaNotice } from "components/BetaNotice";
import { BasicButton } from "basics/Buttons";
import { EditIcon, CheckmarkIcon } from "basics/Icons";
import { Column, Container, Row } from "basics/Grid";
import { Link } from "basics/Links";
import { PrismStyles } from "basics/Prism";
import { Text } from "basics/Text";

import { LayoutBase } from "components/layout/LayoutBase";
import {
  SideNavBody,
  Provider as SideNavProvider,
  TrackedContent,
} from "components/SideNav";
import { Content, SideNavColumn } from "components/Documentation/SharedStyles";
import { LeftNav } from "components/Documentation/LeftNav";
import { Footer } from "components/Documentation/Footer";
import { SideNavBackground, NavLogo } from "components/Navigation/SharedStyles";

import Clock from "assets/icons/clock.svg";
import DevelopersPreview from "assets/images/og_developers.jpg";
import { MobileLeftNav } from "components/Documentation/MobileLeftNav";

const contentId = "content";
const { h1: H1, h2: H2, a: StyledLink, td: TD } = components;

const RightNavEl = styled.div`
  font-size: 0.875rem;
  line-height: 1rem;
  padding-top: 4.25rem;
  overflow-y: hidden;
  margin: 0;

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

const NextUpEl = styled.div`
  font-weight: ${FONT_WEIGHT.bold};
  font-size: 0.875rem;
  text-transform: uppercase;
  border-radius: 2px;
  background-color: rgba(62, 27, 219, 0.04);
  padding: 1em;
`;

const ModifiedEl = styled.div`
  color: ${THEME.lightGrey};
  font-size: 0.875rem;
  padding: 1rem 0;

  svg {
    margin-right: 0.5em;
    vertical-align: middle;
  }

  ${Text} {
    display: inline-block;
    vertical-align: middle;
    color: ${PALETTE.lightGrey};
    margin: 0;
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
  h2: ({ children }) => {
    /* For cases when <H2/> has an element besides strings.
    For example, "Implementing the /info Endpoint" from
    '/docs/enabling-deposit-and-withdrawal/setting-up-test-server/
    has a <Code/> to highlight "/info" */
    if (typeof children !== "string") {
      // eslint-disable-next-line react/prop-types
      const id = slugify(loopAndExtractString(children));
      return (
        <TrackedContent identifier={id}>
          <H2 id={id}>{children}</H2>
        </TrackedContent>
      );
    }
    const id = slugify(children);
    return (
      <TrackedContent identifier={id}>
        <H2 id={id}>{children}</H2>
      </TrackedContent>
    );
  },
  // eslint-disable-next-line react/prop-types
  td: ({ children }) => {
    if (children === ":heavy_check_mark:") {
      return (
        <TD>
          <CheckmarkIcon />
        </TD>
      );
    }
    return <TD>{children}</TD>;
  },
};

const Documentation = ({ data, pageContext, location }) => {
  const { articleBody, allFile } = data;
  const { relativeDirectory, name, rootDir } = pageContext;

  const docsContents =
    location.state?.compiledDocsContents ||
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
    modifiedTime,
    githubLink,
    nextUp: articleNextUp,
    url,
  } = findArticle(pagePath, docsContents)[name];

  const description = React.useMemo(() => getDescriptionFromAst(mdxAst), [
    mdxAst,
  ]);

  const pageOutline = headings.map(({ value }) => ({
    href: `#${slugify(value)}`,
    title: value,
  }));

  const left = (
    <LeftNav
      docsContents={docsContents}
      currentUrl={url}
      initialTopicsState={initialTopicsState}
      rootDir={rootDir}
    />
  );
  const center = (
    <>
      <BetaNotice />
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
          <Text>Last updated {modifiedTime}</Text>
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
      <Footer />
    </>
  );
  const right = (
    <RightNavEl>
      <OutlineTitleEl>Page Outline</OutlineTitleEl>
      <SideNavBody items={pageOutline} renderItem={PageOutlineItem} />
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
        <MobileLeftNav
          docsContents={docsContents}
          currentUrl={url}
          initialTopicsState={initialTopicsState}
          rootDir={rootDir}
        />
        <SideNavProvider>
          <Container id={contentId}>
            <Row>
              <SideNavColumn xs={{ hide: true }} sm={3} lg={3}>
                <NavLogo pageName={docType.doc} />
                <SideNavBackground />
                {left}
              </SideNavColumn>
              <Column
                sm={5}
                md={7}
                isIndependentScroll
                id={`${DOM_TARGETS.contentColumn}`}
              >
                {center}
              </Column>
              {pageOutline.length > 0 && (
                <Column xs={{ hide: true }} md={2}>
                  {right}
                </Column>
              )}
            </Row>
          </Container>
        </SideNavProvider>
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
              order
            }
          }
          fields {
            metadata {
              data {
                order
                title
                sortMethod
              }
            }
          }
        }
      }
    }
  }
`;
