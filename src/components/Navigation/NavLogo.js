import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PALETTE, DEFAULT_COLUMN_WIDTH } from "constants/styles";
import { DividerEl } from "components/Documentation/SharedStyles";

import Logo from "assets/icons/stellar-logo.svg";

export const El = styled.div`
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;
  padding: 0.5rem 0;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
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
const NavDividerEl = styled(DividerEl)`
  height: 3rem;
  background-color: ${({ theme }) => theme.border};
`;

export const NavLogo = ({ pageName = "" }) => (
  <El>
    <LogoEl />
    {pageName && (
      <>
        <NavDividerEl />
        <PageNameEl>{pageName}</PageNameEl>
      </>
    )}
  </El>
);

NavLogo.propTypes = {
  pageName: PropTypes.node,
};
