import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import {
  DEFAULT_COLUMN_WIDTH,
  FONT_WEIGHT,
  MEDIA_QUERIES,
  PALETTE,
  REDESIGN_PALETTE,
} from "constants/styles";

import Logo from "assets/icons/stellar-logo.svg";

import { Image } from "basics/Images";
import { H2 as BasicH2 } from "basics/Text";

import { DividerEl } from "components/Documentation/SharedStyles";

export const H2 = styled(BasicH2)`
  font-weight: ${FONT_WEIGHT.normal};
  color: ${({ theme }) => theme.medium};
`;
export const NavAbsoluteEl = styled.div`
  overflow-y: scroll;
  flex-grow: 1;

  // Suppress scrollbar on nav
  @media (${MEDIA_QUERIES.canHover}) {
    overflow: hidden;
    &:hover {
      overflow-y: scroll;
    }
  }
  // <SideNav/> does not have mobile friendly design (API REF)
  @media (${MEDIA_QUERIES.ltLaptop}) {
    overflow-y: scroll;
  }
`;

export const El = styled.div`
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;
  padding: 0.5rem 0;
  line-height: 1.5rem;
  display: flex;
  align-items: center;

  position: relative;
  &::after {
    content: "";
    z-index: 2;
    position: absolute;
    bottom: -2.5rem;
    left: 0;
    width: 100%;
    height: 2.5rem;
    background: rgb(250, 250, 250);
    background: linear-gradient(
      180deg,
      rgba(250, 250, 250, 1) 0%,
      rgba(250, 250, 250, 0.75) 25%,
      rgba(250, 250, 250, 0.5) 50%,
      rgba(250, 250, 250, 0.25) 75%,
      rgba(250, 250, 250, 0) 100%
    );
  }
`;

const LogoEl = styled(Logo).attrs({ width: 100, height: 24 })`
  ${({ theme = { logo: PALETTE.dark } }) => `
  stroke: ${theme.logo};
  fill: ${theme.logo};
`};
`;
const PageNameEl = styled.span`
  font-size: 1.125rem;
  margin-bottom: -0.25rem;
`;
export const NavDivider = styled(DividerEl)`
  background-color: ${PALETTE.white60};
`;
export const BetaBadge = styled.div`
  display: inline-block;
  background-color: ${PALETTE.purpleBlue};
  border-radius: 0.125rem;
  padding: 0.25rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  line-height: 1;
  color: ${PALETTE.white};
  margin-bottom: -0.25rem;
  margin-left: 0.5rem;
`;

export const NavLogo = ({ pageName }) => (
  <El>
    <LogoEl />
    <NavDivider />
    <PageNameEl>{pageName}</PageNameEl>
    <BetaBadge>beta</BetaBadge>
  </El>
);

NavLogo.propTypes = {
  pageName: PropTypes.node.isRequired,
};

export const SideNavBackground = styled.div`
  position: absolute;
  background-color: ${REDESIGN_PALETTE.grey[0]};
  left: -100rem;
  right: 0;
  top: -10rem;
  bottom: 0rem;
  z-index: -10;
`;
export const NavImage = styled(Image)`
  width: 100%;
  margin-top: 1.5rem;

  @media (${MEDIA_QUERIES.ltLaptop}) {
    display: none !important;
  }
`;
export const AbsoluteNavFooterEl = styled.div`
  list-style: none;
  border-top: 1px solid ${PALETTE.white60};
  padding: 0.75rem 0 2rem;

  // Bottom scroll gradient
  position: relative;
  &::after {
    content: "";
    z-index: 2;
    position: absolute;
    top: -3.125rem;
    left: 0;
    width: 100%;
    height: 3.125rem;
    background: rgb(250, 250, 250);
    background: linear-gradient(
      0deg,
      rgba(250, 250, 250, 1) 0%,
      rgba(250, 250, 250, 0.75) 25%,
      rgba(250, 250, 250, 0.5) 50%,
      rgba(250, 250, 250, 0.25) 75%,
      rgba(250, 250, 250, 0) 100%
    );
  }
`;
export const Block = styled.div`
  max-width: 23rem;
  margin: 0 auto;

  @media (${MEDIA_QUERIES.ltLaptop}) {
    max-width: inherit;
    margin: 0 auto 1.5rem;
    padding: 0 1.125rem 2.5rem;
  }
`;
export const NavTab = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr));
  margin: 0 -1rem;
  white-space: initial;
  @media (${MEDIA_QUERIES.ltLaptop}) {
    margin: 0;
    grid-template-columns: 1fr;
  }
`;
export const NavItem = styled.div`
  padding: 2rem 0;
  margin: 0 1.5rem;
  color: ${({ theme }) => theme.link};

  ${({ isActive }) =>
    isActive
      ? css`
          @media (${MEDIA_QUERIES.gtLaptop}) {
            border-bottom: 3px solid ${({ theme }) => theme.link};
            padding-bottom: calc(2rem - 3px);
          }
          @media (${MEDIA_QUERIES.ltLaptop}) {
            background: ${PALETTE.white};
          }
        `
      : ""};

  @media (${MEDIA_QUERIES.ltLaptop}) {
    letter-spacing: 0.01em;
    font-weight: ${FONT_WEIGHT.bold};
    font-size: 3.1rem;
    padding: 0.4rem 0;
    margin: 0 0.5rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
  }
`;

export const SideNavContainer = styled.div`
  height: calc(100vh - 3.75rem);
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
