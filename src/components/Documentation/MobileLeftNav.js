import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { docType } from "constants/docType";
import { MEDIA_QUERIES, PALETTE } from "constants/styles";

import { CloseIcon, Menu } from "basics/Icons";

import { BasicButton } from "basics/Buttons";
import { Link } from "basics/Links";

import {
  BetaBadge,
  NavDivider,
  NavLogo,
} from "components/Navigation/SharedStyles";
import { LeftNav } from "./LeftNav";

const El = styled.div`
  position: fixed;
  z-index: 10;
  @media (${MEDIA_QUERIES.gtTablet}) {
    display: none;
  }
`;
const NavIconSectionEl = styled.div`
  display: flex;
  align-items: center;
`;
const NavBarEl = styled.div`
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
  transition: transform 0.2s;
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

export const MobileLeftNav = ({
  currentUrl,
  initialTopicsState,
  rootDir,
  docsContents,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <El>
      <OffscreenContainerEl isOpen={isOpen}>
        <NavBarEl>
          <NavSectionEl>
            <NavLogo pageName={docType.doc} />
            <NavIconSectionEl>
              <NavDivider />
              <MenuButtonEl
                divider="left"
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
                divider="right"
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
              .<BetaBadge>beta</BetaBadge>
            </BetaNoticeEl>
          </NavSectionEl>
        </NavBarEl>
        <MenuContainerEl>
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
