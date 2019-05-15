export const PALETTE = {
  white: "#ffffff",
  dark: "#000000",
  mediumGrey: "#979797",
  darkGrey: "#4a4a49",
  light: "#fbfaf7",
  yellow: "#ffa51e",
  orange: "#ff5500",
  green: "#00aa46",
  purple: "#7700ff",
  teal: "#21b0a4",
};

export const THEME = {
  body: PALETTE.light,
  text: PALETTE.dark,
  contrast: PALETTE.white,
  medium: PALETTE.medium,
};

// Screen sizes are minimums. Anything between that and the next size.
export const SCREEN_SIZES = {
  mobile: 400,
  tablet: 769,
  laptop: 1025,
  desktop: 1440,
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
