import tinycolor from "tinycolor2";

export const PALETTE = {
  white: "#ffffff",
  dark: "#000000",
  lightBlack: "#1e1e1e",
  lightestGrey: "#cccccc",
  notQuiteLightestGray: "#d8d8d8",
  lighterGrey: "#f4f4f3",
  lightGrey: "#999999",
  mediumGrey: "#979797",
  darkGrey: "#4a4a49",
  light: "#fbfaf7",
  lighterYellow: "#fae7cb",
  lightYellow: "#ffed00",
  yellow: "#ffa51e",
  orange: "#ff5500",
  green: "#00aa46",
  lightPurple: "#975581",
  purple: "#7d00ff",
  teal: "#21b0a4",
  coolBlue: "#39abd4",
  darkCoolBlue: "#0c0d71",
  lightestCoolPurple: "#b3a6ed",
  lighterCoolPurple: "#af80f8",
  lightCoolPurple: "#7b35f7",
  coolPurple: "#501e83",
  coolPink: "#97557f",
};

export const THEME = {
  body: PALETTE.light,
  bodyAlt: PALETTE.lighterGrey,
  text: PALETTE.dark,
  contrast: PALETTE.white,
  medium: PALETTE.mediumGrey,
  lightGrey: PALETTE.lightGrey,
  darkGrey: PALETTE.darkGrey,
  border: PALETTE.lightestGrey,
};

// Screen sizes are minimums. Anything between that and the next size.
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
};

export const Z_INDEXES = {
  watermarkBase: -10,
  watermark: -5,
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

export const NAV_HEIGHT = 80;

export const DEFAULT_COLUMN_WIDTH = {
  leftColumn: 15,
  rightColumn: 18,
  gridArea: {
    gtDesktop: 3.5,
    ltDesktop: 2.5,
  },
};

export const NAV_THEMES = {
  default: {
    background: THEME.body,
    border: THEME.border,
    link: tinycolor(THEME.text)
      .setAlpha(0.7)
      .toRgbString(),
    cta: {
      body: PALETTE.yellow,
      text: PALETTE.light,
    },
    logo: PALETTE.dark,
  },
  dark: {
    background: PALETTE.dark,
    border: PALETTE.darkGrey,
    link: tinycolor(PALETTE.light)
      .setAlpha(0.8)
      .toRgbString(),
    cta: {
      body: PALETTE.purple,
      text: PALETTE.light,
    },
    logo: PALETTE.light,
  },
};

export const SUBPAGE_THEMES = {
  default: {
    background: PALETTE.light,
    fgColor: PALETTE.dark,
    categoryColor: PALETTE.purple,
  },
  yellow: {
    background: PALETTE.yellow,
    fgColor: PALETTE.light,
    categoryColor: PALETTE.lightYellow,
  },
  dark: {
    background: PALETTE.dark,
    fgColor: PALETTE.light,
    categoryColor: PALETTE.purple,
  },
  lumens: {
    background: "", // Brought in on lumen page as an optimization
    fgColor: PALETTE.light,
    categoryColor: PALETTE.lightPurple,
  },
  bland: {
    background: PALETTE.light,
    fgColor: PALETTE.dark,
    categoryColor: PALETTE.notQuiteLightestGray,
    isTextFilled: true,
  },
};
