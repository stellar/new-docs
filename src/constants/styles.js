import tinycolor from "tinycolor2";

export const PALETTE = {
  white: "#ffffff",
  white60: "#f2f2f2",
  white80: "#fafafa",
  black: "#000000",
  black60: "#666666",
  black80: "#333333",
  black90: "#292d3d",
  light: "#fbfaf7",
  lightestGrey: "#cccccc",
  lightGrey: "#999999",
  mediumGrey: "#979797",
  darkGrey: "#4a4a49",
  dark: "#000000",
  orange: "#ff5500",
  yellow: "#ffa51e",
  green: "#00aa46",
  purple: "#490be3",
  purpleBlue: "#3e1bdb",
  lightGreen: "#abcc7d",
  lightOrage: "#e5c687",
};

export const REDESIGN_PALETTE = {
  grey: {
    // "-4": "",
    // "-3": "",
    // "-2": "",
    // "-1": "",
    "0": "#fafafa",
    "1": "#f2f2f2",
    // "2": "",
    // "3": "",
    // "4": "",
  },
};

export const THEME = {
  body: PALETTE.white,
  text: PALETTE.dark,
  contrast: PALETTE.white,
  medium: PALETTE.mediumGrey,
  lightGrey: PALETTE.lightGrey,
  darkGrey: PALETTE.darkGrey,
  link: tinycolor(PALETTE.dark)
    .setAlpha(0.7)
    .toRgbString(),
  cta: {
    body: PALETTE.yellow,
    text: PALETTE.light,
  },
  logo: PALETTE.dark,
};

export const FONT_FAMILY = {
  base: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif',
  monospace: '"IBM Plex Mono", Consolas, Menlo, monospace',
};

// Screen sizes are minimums. Anything between that and the next size.
export const SCREEN_SIZES = {
  xs_mobile: 320,
  mobile: 420,
  tablet: 769,
  laptop: 1025,
  desktop: 1281,
  xl_desktop: 1441,
};

export const MEDIA_QUERIES = {
  ltXSMobile: `max-width: ${SCREEN_SIZES.xs_mobile}px`,
  gtXSMobile: `min-width: ${SCREEN_SIZES.xs_mobile}px`,
  ltMobile: `max-width: ${SCREEN_SIZES.mobile}px`,
  gtMobile: `min-width: ${SCREEN_SIZES.mobile}px`,
  ltTablet: `max-width: ${SCREEN_SIZES.tablet}px`,
  gtTablet: `min-width: ${SCREEN_SIZES.tablet}px`,
  ltLaptop: `max-width: ${SCREEN_SIZES.laptop}px`,
  gtLaptop: `min-width: ${SCREEN_SIZES.laptop}px`,
  ltDesktop: `max-width: ${SCREEN_SIZES.desktop}px`,
  gtDesktop: `min-width: ${SCREEN_SIZES.desktop}px`,
  ltXlDesktop: `max-width: ${SCREEN_SIZES.xl_desktop}px`,
  gtXlDesktop: `min-width: ${SCREEN_SIZES.xl_desktop}px`,

  canHover: `hover: hover`,
  noHover: `hover: none`,
};

export const Z_INDEXES = {
  body: 0,
  nav: 10,
  modal: 20,
  tooltip: 30,
};

export const FONT_WEIGHT = {
  light: "300",
  normal: "400",
  bold: "500",
};

export const CSS_TRANSITION_SPEED = {
  default: "250ms",
  slow: "500ms",
};

export const CSS_TRANSITION_DELAY = {
  default: "50ms",
};

export const DEFAULT_COLUMN_WIDTH = {
  leftColumn: 15,
  rightColumn: 18,
  gridArea: {
    gtDesktop: 3.5,
    ltDesktop: 2.5,
  },
};
