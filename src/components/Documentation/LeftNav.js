import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PALETTE } from "constants/styles";

import { buildRelPath } from "helpers/documentation";

import { Link } from "basics/Links";
import { ListItem } from "basics/Text";

import Articles from "components/Documentation/Articles";
import {
  NavAbsoluteEl,
  AbsoluteNavFooterEl,
  SideNavContainer,
} from "components/Navigation/SharedStyles";

const TopicsEl = styled.ul`
  list-style-type: none;
  padding: 0;
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
        <NavAbsoluteEl>
          <TopicsEl>
            {Object.values(docsContents).map((content) => {
              const { articles, id, topicPath, title } = content;
              if (topicPath === rootRelativePath) {
                return Object.values(articles).map((rootArticle) => (
                  <RootItemEl key={id}>
                    <RootLinkEl href="https://developers.stellar.org/docs">
                      {rootArticle.title}
                    </RootLinkEl>
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
