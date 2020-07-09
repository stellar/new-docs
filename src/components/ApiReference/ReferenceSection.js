import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { apiReferenceComponents } from "constants/docsComponentMapping";
import { PALETTE } from "constants/styles";

import { HorizontalRule } from "basics/Text";
import { EditIcon } from "basics/Icons";
import { Link } from "basics/Links";

import { Route } from "components/ApiReference/Route";
import { CustomColumn, NestedRow } from "components/ApiReference/SharedStyles";
import { TrackedContent } from "components/SideNav";
import { useLocation } from "@reach/router";
import { Context as ScrollRouterContext } from "./ScrollRouter";

const { h1: H1, h2: H2 } = apiReferenceComponents;

const MainEl = styled.main`
  display: block;
`;
const ArticleEl = styled.article`
  display: block;
  &:first-child {
    margin-top: 5rem;
  }
`;

const Article = ({ children, path }) => {
  // The scroll router overrules Reach Router once the page loads, but we need
  // Reach router's location to get initial path
  const { pathname } = useLocation();
  const [isActive, setIsActive] = React.useState(pathname);
  const { subscribe } = React.useContext(ScrollRouterContext);

  React.useEffect(
    () =>
      subscribe((newPath) => {
        setIsActive(path === newPath);
      }),
    [subscribe, path],
  );

  return (
    <MainEl name={path} hidden={!isActive}>
      <ArticleEl>{children}</ArticleEl>
    </MainEl>
  );
};
Article.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export const ReferenceSection = React.memo(
  ({ body, relativePath, title, githubLink, path }) => {
    const splitRelativePath = relativePath.split("/");

    /* Check to see if a section is a nested item */
    const isNestedSection =
      relativePath.split("/").length > 3 &&
      splitRelativePath[splitRelativePath.length - 1] !== "index.mdx";

    const SectionHeader = isNestedSection ? (
      <H2 id={path}>{title}</H2>
    ) : (
      <H1 id={path}>{title}</H1>
    );

    return (
      <Article path={path}>
        <Route originalFilePath={relativePath} path={path}>
          <TrackedContent identifier={path}>
            <NestedRow>
              {/* Hack to make it look appear as if we had a column-gap 4rem in
              between <CustomColumn/> on a large screen (min-width: 1440px). Skip
              the 1st column to use it as column-gap, start at the 2nd column and
              span through then next 8 columns (ends at column 9) */}
              <CustomColumn xs={9} xlColumn="2 / span 8">
                {SectionHeader}
                {githubLink && (
                  <Link href={githubLink} newTab>
                    <EditIcon color={PALETTE.purpleBlue} />
                  </Link>
                )}
              </CustomColumn>
            </NestedRow>
            <NestedRow>
              <MDXRenderer>{body}</MDXRenderer>
            </NestedRow>
            <HorizontalRule />
          </TrackedContent>
        </Route>
      </Article>
    );
  },
);
ReferenceSection.propTypes = {
  body: PropTypes.node.isRequired,
  relativePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  githubLink: PropTypes.string,
};
