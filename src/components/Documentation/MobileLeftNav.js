import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import tinycolor from "tinycolor2";

import { docType } from "constants/docType";
import { MEDIA_QUERIES, PALETTE, CSS_TRANSITION_SPEED } from "constants/styles";

import { CloseIcon, Menu } from "basics/Icons";

import { BasicButton } from "basics/Buttons";
import { Link } from "basics/Links";

import { NavDivider, NavLogo } from "components/Navigation/SharedStyles";
import { LeftNav } from "./LeftNav";

const El = styled.div`
  position: fixed;
  pointer-events: ${(props) => (props.isOpen ? "all" : "none")};
  z-index: 10;
  background-color: ${(props) =>
    props.isOpen
      ? tinycolor(PALETTE.dark)
          .setAlpha(0.7)
          .toRgbString()
      : "transparent"};
  transition: background-color ${CSS_TRANSITION_SPEED.default};

  @media (${MEDIA_QUERIES.gtTablet}) {
    display: none;
  }
`;
const NavIconSectionEl = styled.div`
  display: flex;
  align-items: center;
`;
const NavBarEl = styled.div`
  pointer-events: all;
  display: flex;
  width: 200vw;
  align-items: center;
  background-color: ${PALETTE.white};
  border-bottom: 1px solid ${PALETTE.white60};
`;
const NavSectionEl = styled.div`
  flex-basis: 100vw;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CloseIconEl = styled(CloseIcon)`
  width: 1rem;
  height: 1rem;
`;
const MenuButtonEl = styled(BasicButton)`
  padding: 1rem;
  margin: 0 -1rem;
`;
const OffscreenContainerEl = styled.div`
  width: 100vw;
  transform: translate(${(props) => (props.isOpen ? "0" : "-100%")});
  transition: transform ${CSS_TRANSITION_SPEED.default};
`;
const MenuContainerEl = styled.div`
  background-color: ${PALETTE.white80};
  width: 100%;
  max-width: 19rem;
  border-right: 1px solid ${PALETTE.white60};
  padding-left: 1rem;
`;

const BetaNoticeEl = styled.div`
  font-size: 0.875rem;
  margin: 0;
  color: ${PALETTE.black60};
`;
const LinkEl = styled(Link)`
  color: ${PALETTE.purpleBlue};
`;

// We want clicks on the background to close the menu, but other clickable
// elements shouldn't bubble up to that far.
const stopBubbling = (e) => {
  e.stopPropagation();
};

export const MobileLeftNav = ({
  currentUrl,
  initialTopicsState,
  rootDir,
  docsContents,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <El
      isOpen={isOpen}
      onClick={() => {
        if (isOpen) {
          setIsOpen(false);
        }
      }}
    >
      <OffscreenContainerEl isOpen={isOpen}>
        <NavBarEl onClick={stopBubbling}>
          <NavSectionEl>
            <NavLogo pageName={docType.doc} />
            <NavIconSectionEl>
              <NavDivider />
              <MenuButtonEl
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <CloseIconEl />
              </MenuButtonEl>
            </NavIconSectionEl>
          </NavSectionEl>
          <NavSectionEl>
            <NavIconSectionEl>
              <MenuButtonEl
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <Menu />
              </MenuButtonEl>
              <NavDivider />
            </NavIconSectionEl>
            <BetaNoticeEl>
              Submit bugs{" "}
              <LinkEl href="https://github.com/stellar/new-docs/issues">
                here
              </LinkEl>
              .
            </BetaNoticeEl>
          </NavSectionEl>
        </NavBarEl>
        <MenuContainerEl onClick={stopBubbling}>
          <LeftNav
            docsContents={docsContents}
            currentUrl={currentUrl}
            initialTopicsState={initialTopicsState}
            rootDir={rootDir}
          />
        </MenuContainerEl>
      </OffscreenContainerEl>
    </El>
  );
};
MobileLeftNav.propTypes = {
  currentUrl: PropTypes.string.isRequired,
  initialTopicsState: PropTypes.object,
  rootDir: PropTypes.string.isRequired,
  docsContents: PropTypes.object.isRequired,
};
