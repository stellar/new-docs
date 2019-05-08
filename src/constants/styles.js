export const PALETTE = {
  dark: "#000000",
  medium: "#979797",
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
  mobile: `screen and (min-width: ${SCREEN_SIZES.mobile}) and (max-width: ${
    SCREEN_SIZES.tablet
  })`,
  tablet: `screen and (min-width: ${SCREEN_SIZES.tablet}) and (max-width: ${
    SCREEN_SIZES.laptop
  })`,
  laptop: `screen and (min-width: ${SCREEN_SIZES.laptop}) and (max-width: ${
    SCREEN_SIZES.desktop
  })`,
  desktop: `creen and (min-width: ${SCREEN_SIZES.desktop})`,
};

export const Z_INDEXES = {
  body: 0,
  nav: 10,
  modal: 20,
  tooltip: 30,
};
