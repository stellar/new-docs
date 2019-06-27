import styled, { css } from "styled-components";

import { MEDIA_QUERIES, PALETTE } from "constants/styles";

import { Image } from "basics/Images";
import { H2 as BasicH2 } from "basics/Text";

export const H2 = styled(BasicH2)`
  font-weight: normal;
  color: ${({ theme }) => theme.medium};
`;

export const NavImage = styled(Image)`
  width: 100%;
  margin-top: 1.5rem;
  @media (${MEDIA_QUERIES.ltLaptop}) {
    display: none;
  }
`;

export const Block = styled.div`
  margin: 0 auto 2rem;
  @media (${MEDIA_QUERIES.gtLaptop}) {
    width: 23rem;
  }
`;

export const NavTab = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(27rem, 1fr));
  margin: 0 -1rem;
  white-space: initial;
  @media (${MEDIA_QUERIES.ltLaptop}) {
    margin: 0;
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
    font-size: 3.75rem;
    padding: 0.5rem 0;
  }
`;
