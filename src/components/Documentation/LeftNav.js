import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { docType } from "constants/docType";
import { DEFAULT_COLUMN_WIDTH, PALETTE } from "constants/styles";

import { buildRelPath } from "helpers/documentation";

import { Link } from "basics/Links";
import { ListItem } from "basics/Text";

import Articles from "components/Documentation/Articles";
import {
  NavAbsoluteEl,
  AbsoluteNavFooterEl,
  SideNavContainer,
  NavLogo,
} from "components/Navigation/SharedStyles";

const TopicsEl = styled.ul`
  list-style-type: none;
  padding: 0;
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;
  padding-bottom: 1rem;
  margin-right: 1rem;
`;
const RootItemEl = styled(ListItem)`
  padding: 0.5rem 0;
`;
const LinkEl = styled(Link)`
  color: ${PALETTE.purpleBlue};
`;
const RootLinkEl = styled(Link)`
  color: ${PALETTE.black80};
  line-height: 1.75rem;
  text-decoration: none;
`;

export const LeftNav = ({
  currentUrl,
  initialTopicsState,
  rootDir,
  docsContents,
}) => {
  const rootRelativePath = buildRelPath(rootDir, rootDir);
  return (
    <>
      <SideNavContainer>
        <NavLogo pageName={docType.doc} />
        <NavAbsoluteEl>
          <TopicsEl>
            {Object.values(docsContents).map((content) => {
              const { articles, id, topicPath, title } = content;
              if (topicPath === rootRelativePath) {
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
                  activeItem={currentUrl}
                />
              );
            })}
          </TopicsEl>
        </NavAbsoluteEl>
        <AbsoluteNavFooterEl>
          <LinkEl href="/api">API Reference</LinkEl>
        </AbsoluteNavFooterEl>
      </SideNavContainer>
    </>
  );
};
LeftNav.propTypes = {
  currentUrl: PropTypes.string.isRequired,
  initialTopicsState: PropTypes.object,
  rootDir: PropTypes.string.isRequired,
  docsContents: PropTypes.object.isRequired,
};
