import styled, { css } from "styled-components";

import {
  MEDIA_QUERIES,
  PALETTE,
  FONT_WEIGHT,
  Z_INDEXES,
} from "constants/styles";

import { Image } from "basics/Images";
import { H2 as BasicH2 } from "basics/Text";

export const H2 = styled(BasicH2)`
  font-weight: ${FONT_WEIGHT.normal};
  color: ${({ theme }) => theme.medium};
`;
export const NavAbsoluteEl = styled.div`
  position: absolute;
  overflow: hidden;
  height: calc(100% - 125px);
  width: 100%;
  top: 64px;
  bottom: 61px;

  &:hover {
    overflow-y: scroll;
  }
`;
export const NavImage = styled(Image)`
  width: 100%;
  margin-top: 1.5rem;

  @media (${MEDIA_QUERIES.ltLaptop}) {
    display: none !important;
  }
`;
export const NavFooterLi = styled.li`
  list-style: none;
  border-top: 1px solid ${PALETTE.white60};
  padding: 0.75rem 0 2rem;
  width: 100%;
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

export const StickyEl = styled.div`
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 3;
`;
