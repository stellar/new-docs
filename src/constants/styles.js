import { css } from "styled-components";

export const Outline = css`
  box-shadow: 0 3px 5px rgba(0, 0, 255, 0.3);
`;

export const FONT_WEIGHT = {
  light: "300",
  normal: "400",
  medium: "500",
};

export const FONT_FAMILY = {
  base: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif',
  monospace: '"IBM Plex Mono", Consolas, Menlo, monospace',
};

export const PALETTE = {
  white: "#ffffff",
  white60: "#f2f2f2",
  white80: "#fafafa",
  black: "#000000",
  black30: "#999999",
  black60: "#666666",
  black80: "#333333",
  black90: "#292d3d",
  purple: "#490be3",
};

export const SCREEN_SIZES = {
  mobile: 420,
  tablet: 769,
  laptop: 1025,
  desktop: 1281,
};

export const MEDIA_QUERIES = {
  ltMobile: `max-width: ${SCREEN_SIZES.mobile}px`,
  gtMobile: `min-width: ${SCREEN_SIZES.mobile}px`,
  ltTablet: `max-width: ${SCREEN_SIZES.tablet}px`,
  gtTablet: `min-width: ${SCREEN_SIZES.tablet}px`,
  ltLaptop: `max-width: ${SCREEN_SIZES.laptop}px`,
  gtLaptop: `min-width: ${SCREEN_SIZES.laptop}px`,
  ltDesktop: `max-width: ${SCREEN_SIZES.desktop}px`,
  gtDesktop: `min-width: ${SCREEN_SIZES.desktop}px`,

  canHover: `hover: hover`,
  noHover: `hover: none`,
};
