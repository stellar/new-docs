import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PALETTE } from "constants/styles";

import Logo from "assets/icons/stellar-logo.svg";

export const El = styled.div`
  padding: 0.75rem 0;
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
const DividerEl = styled.span`
  display: inline-block;
  width: 0.0625rem;
  height: 3rem;
  margin: -1.5rem 0.5rem;
  background-color: ${({ theme }) => theme.border};
`;

export const NavLogo = ({ pageName = "" }) => (
  <El>
    <LogoEl />
    {pageName && (
      <>
        <DividerEl />
        <PageNameEl>{pageName}</PageNameEl>
      </>
    )}
  </El>
);

NavLogo.propTypes = {
  pageName: PropTypes.node,
};
