import styled, { css } from "styled-components";

import {
  MEDIA_QUERIES,
  REDESIGN_PALETTE,
  PALETTE,
  FONT_WEIGHT,
} from "constants/styles";

import { Image } from "basics/Images";
import { H2 as BasicH2 } from "basics/Text";

export const H2 = styled(BasicH2)`
  font-weight: ${FONT_WEIGHT.normal};
  color: ${({ theme }) => theme.medium};
`;

const BACKDROP_COLOR = "rgba(250, 250, 250, 1)";
const BACKDROP_FADE = "rgba(250, 250, 250, 0)";
const SHADOW_COLOR = "rgba(0, 0, 0, 0.05)";
const SHADOW_FADE = "rgba(0, 0, 0, 0)";
const SHADOW_SIZE = "1.5rem";

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

  // Edge gradients for scrolling. This is a little more robust than fixed
  // positioning, which gets weird when the element is offscreen (on mobile or
  // narrow laptops). See http://lea.verou.me/2012/04/background-attachment-local/

  // Shadow covers
  background: linear-gradient(${BACKDROP_COLOR} 30%, ${BACKDROP_FADE}),
    linear-gradient(${BACKDROP_FADE}, ${BACKDROP_COLOR} 70%) 0 100%,
    // Shadows
      linear-gradient(${SHADOW_COLOR}, ${SHADOW_FADE} 100%),
    linear-gradient(${SHADOW_FADE}, ${SHADOW_COLOR}) 0 100%;
  background-repeat: no-repeat;
  background-size: 100% 3rem, 100% 3rem, 100% ${SHADOW_SIZE},
    100% ${SHADOW_SIZE};
  // Opera doesn't support this in the shorthand
  background-attachment: local, local, scroll, scroll;
`;
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
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
