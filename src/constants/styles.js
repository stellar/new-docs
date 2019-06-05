export const PALETTE = {
  white: "#ffffff",
  dark: "#000000",
  lighterGrey: "#f4f4f3",
  lightGrey: "#999999",
  mediumGrey: "#979797",
  darkGrey: "#4a4a49",
  light: "#fbfaf7",
  lightYellow: "#fae7cb",
  yellow: "#ffa51e",
  orange: "#ff5500",
  green: "#00aa46",
  purple: "#7d00ff",
  teal: "#21b0a4",
  coolBlue: "#39abd4",
};

export const THEME = {
  body: PALETTE.light,
  bodyAlt: PALETTE.lighterGrey,
  text: PALETTE.dark,
  contrast: PALETTE.white,
  medium: PALETTE.mediumGrey,
  lightGrey: PALETTE.lightGrey,
  darkGrey: PALETTE.darkGrey,
};

// Screen sizes are minimums. Anything between that and the next size.
export const SCREEN_SIZES = {
  mobile: 420,
  tablet: 769,
  laptop: 1025,
  desktop: 1281,
};

export const MEDIA_QUERIES = {
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

export const CSS_TRANSITION_SPEED = {
  default: "250ms",
};

export const CSS_TRANSITION_DELAY = {
  default: "50ms",
};
