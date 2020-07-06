import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import { FONT_WEIGHT, THEME, PALETTE } from "constants/styles";
import { documentationComponents } from "constants/docsComponentMapping";
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
import { Column, Container, Row } from "basics/Grid";
import { OriginalFileContext, BasicLink } from "basics/Links";
import { PrismStyles } from "basics/Prism";
import { H1, Text } from "basics/Text";

import { BetaNotice } from "components/BetaNotice";
import { Content, SideNavColumn } from "components/Documentation/SharedStyles";
import { LeftNav } from "components/Documentation/LeftNav";
import { Footer } from "components/Documentation/Footer";
import { LayoutBase } from "components/layout/LayoutBase";
import { MobileLeftNav } from "components/Documentation/MobileLeftNav";
import { SideNavBody, Provider as SideNavProvider } from "components/SideNav";
import { SideNavProgressContext } from "components/SideNav/Provider";
import { SideNavBackground, NavLogo } from "components/Navigation/SharedStyles";

import Clock from "assets/icons/clock.svg";
import DevelopersPreview from "assets/images/og_developers.jpg";

const contentId = "content";

const RightNavEl = styled.div`
  font-size: 0.875rem;
  line-height: 1rem;
  padding-top: 4.25rem;
  overflow-y: hidden;
  position: sticky;
  top: 0;
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

const PageOutlineItem = ({ id, isActive, title }) => {
  const { setActiveNode, setIsNavClicked } = React.useContext(
    SideNavProgressContext,
  );

  return (
    <NavItemEl
      isActive={isActive}
      onClick={(e) => {
        e.preventDefault();
        setIsNavClicked(true);
        setActiveNode(document.getElementById(id));
        smoothScrollTo(document.getElementById(id), { duration: 0.55 }, () => {
          setIsNavClicked(false);
        });
      }}
    >
      {title}
    </NavItemEl>
  );
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

  const { relativePath: originalFilePath } = articleBody;
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
    <OriginalFileContext.Provider value={originalFilePath}>
      <BetaNotice />
      <Content>
        <H1>{header}</H1>
        {githubLink && (
          <BasicLink href={githubLink} newTab>
            <EditIcon color={PALETTE.purpleBlue} />
          </BasicLink>
        )}
        <MDXRenderer>{body}</MDXRenderer>
        <ModifiedEl>
          <Clock />
          <Text>Last updated {modifiedTime}</Text>
        </ModifiedEl>
        {articleNextUp && (
          <NextUpEl>
            Next Up:{" "}
            <BasicLink
              href={articleNextUp.url}
              state={{ compiledDocsContents: docsContents }}
            >
              {articleNextUp.title}
            </BasicLink>
          </NextUpEl>
        )}
      </Content>
      <Footer />
    </OriginalFileContext.Provider>
  );
  const right = (
    <RightNavEl>
      <OutlineTitleEl>Page Outline</OutlineTitleEl>
      <SideNavBody items={pageOutline} renderItem={PageOutlineItem} />
    </RightNavEl>
  );

  return (
    <MDXProvider components={documentationComponents}>
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
              <Column sm={5} md={7}>
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
      relativePath
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
