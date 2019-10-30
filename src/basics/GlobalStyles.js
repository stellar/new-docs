import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  body,
  html,
  input,
  textarea,
  button {
    color: ${({ theme }) => theme.text};
  }
  body {
    background: ${({ theme }) => theme.body};
    min-height: 100vh;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ${styledNormalize}
  body,
  html,
  input,
  textarea,
  button {
    font-size: 16px;
    font-weight: 400;
    font-family: 'suisse', sans-serif;
    line-height: 1;
  }
  /* http://tachyons.io/docs/layout/box-sizing/ */
  body * {
    box-sizing: border-box;
  }
  twitter-widget {
    margin: auto;
  }

  @font-face {
    font-display: block;
    font-family: suisse;
    src:
      url("/fonts/suisseintl-regular-webfont.woff") format("woff"),
      url("/fonts/suisseintl-regular-webfont.woff2") format("woff2");
    font-weight: 400;
  }
  @font-face {
    font-display: swap;
    font-family: suisse;
    font-style: italic;
    src:
      url("/fonts/suisseintl-regularitalic-webfont.woff") format("woff"),
      url("/fonts/suisseintl-regularitalic-webfont.woff2") format("woff2");
    font-weight: 400;
  }

  @font-face {
    font-display: swap;
    font-family: suisse;
    src:
      url("/fonts/suisseintl-light-webfont.woff") format("woff"),
      url("/fonts/suisseintl-light-webfont.woff2") format("woff2");
    font-weight: 300;
  }
  @font-face {
    font-display: swap;
    font-family: suisse;
    font-style: italic;
    src:
      url("/fonts/suisseintl-lightitalic-webfont.woff") format("woff"),
      url("/fonts/suisseintl-lightitalic-webfont.woff2") format("woff2");
    font-weight: 300;
  }

  @font-face {
    font-display: block;
    font-family: suisse;
    src:
      url("/fonts/suisseintl-semibold-webfont.woff") format("woff"),
      url("/fonts/suisseintl-semibold-webfont.woff2") format("woff2");
    font-weight: 500;
  }
  @font-face {
    font-display: swap;
    font-family: suisse;
    font-style: italic;
    src:
      url("/fonts/suisseintl-semibolditalic-webfont.woff") format("woff"),
      url("/fonts/suisseintl-semibolditalic-webfont.woff2") format("woff2");
    font-weight: 500;
  }

  @font-face {
    font-display: swap;
    font-family: suisse-mono;
    src:
      url("/fonts/suisseintlmono-regular-webfont.woff") format("woff"),
      url("/fonts/suisseintlmono-regular-webfont.woff2") format("woff2");
    font-weight: 400;
  }

  /* IBM PLEX font-face */
  @font-face {
    font-display: block;
    font-family: "IBM Plex Sans";
    font-style: normal;
    font-weight: 400;
    src: 
      url("/fonts/IBMPlexSans-Regular-Latin1.woff") format("woff"),
      url("/fonts/IBMPlexSans-Regular-Latin1.woff2") format("woff2");
    unicode-range: U+0000, U+000D, U+0020-007E, U+00A0-00A3, U+00A4-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2013-2014, U+2018-201A, U+201C-201E, U+2020-2022, U+2026, U+2030, U+2039-203A, U+2044, U+2074, U+20AC, U+2122, U+2212, U+FB01-FB02;
  }

  @font-face {
    font-display: block;
    font-family: "IBM Plex Sans";
    font-style: normal;
    font-weight: 400;
    src: 
      url("/fonts/IBMPlexSans-Regular-Latin2.woff") format("woff"),
      url("/fonts/IBMPlexSans-Regular-Latin2.woff2") format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF, U+FB01-FB02;
  }

  @font-face {
    font-display: block;
    font-family: "IBM Plex Sans";
    font-style: normal;
    font-weight: 400;
    src: 
      url("/fonts/IBMPlexSans-Regular-Latin3.woff") format("woff"),
      url("/fonts/IBMPlexSans-Regular-Latin3.woff2") format("woff2");
    unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
  }

  @font-face {
    font-display: block;
    font-family: "IBM Plex Sans";
    font-style: normal;
    font-weight: 500;
    src: 
      url("/fonts/IBMPlexSans-Medium-Latin1.woff") format("woff"),
      url("/fonts/IBMPlexSans-Medium-Latin1.woff2") format("woff2");
    unicode-range: U+0000, U+000D, U+0020-007E, U+00A0-00A3, U+00A4-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2013-2014, U+2018-201A, U+201C-201E, U+2020-2022, U+2026, U+2030, U+2039-203A, U+2044, U+2074, U+20AC, U+2122, U+2212, U+FB01-FB02;
  }

  @font-face {
    font-display: block;
    font-family: "IBM Plex Sans";
    font-style: normal;
    font-weight: 500;
    src: 
      url("/fonts/IBMPlexSans-Medium-Latin2.woff") format("woff"),
      url("/fonts/IBMPlexSans-Medium-Latin2.woff2") format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF, U+FB01-FB02;
  }

  @font-face {
    font-display: block;
    font-family: "IBM Plex Sans";
    font-style: normal;
    font-weight: 500;
    src: 
      url("/fonts/IBMPlexSans-Medium-Latin3.woff") format("woff"),
      url("/fonts/IBMPlexSans-Medium-Latin3.woff2") format("woff2");
    unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
  }

  @font-face {
    font-display: swap;
    font-family: "IBM Plex Sans";
    font-style: italic;
    font-weight: 400;
    src: 
      url("/fonts/IBMPlexSans-Italic-Latin1.woff") format("woff"),
      url("/fonts/IBMPlexSans-Italic-Latin1.woff2") format("woff2");
    unicode-range: U+0000, U+000D, U+0020-007E, U+00A0-00A3, U+00A4-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2013-2014, U+2018-201A, U+201C-201E, U+2020-2022, U+2026, U+2030, U+2039-203A, U+2044, U+2074, U+20AC, U+2122, U+2212, U+FB01-FB02;
  }

  @font-face {
    font-display: swap;
    font-family: "IBM Plex Sans";
    font-style: italic;
    font-weight: 400;
    src: 
      url("/fonts/IBMPlexSans-Italic-Latin2.woff") format("woff"),
      url("/fonts/IBMPlexSans-Italic-Latin2.woff2") format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF, U+FB01-FB02;
  }

  @font-face {
    font-display: swap;
    font-family: "IBM Plex Sans";
    font-style: italic;
    font-weight: 400;
    src: 
      url("/fonts/IBMPlexSans-Italic-Latin3.woff") format("woff"),
      url("/fonts/IBMPlexSans-Italic-Latin3.woff2") format("woff2");
    unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
  }

  @font-face {
    font-display: swap;
    font-family: "IBM Plex Sans";
    font-style: italic;
    font-weight: 500;
    src: 
      url("/fonts/IBMPlexSans-MediumItalic-Latin1.woff") format("woff"),
      url("/fonts/IBMPlexSans-MediumItalic-Latin1.woff2") format("woff2");
    unicode-range: U+0000, U+000D, U+0020-007E, U+00A0-00A3, U+00A4-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2013-2014, U+2018-201A, U+201C-201E, U+2020-2022, U+2026, U+2030, U+2039-203A, U+2044, U+2074, U+20AC, U+2122, U+2212, U+FB01-FB02;
  }

  @font-face {
    font-display: swap;
    font-family: "IBM Plex Sans";
    font-style: italic;
    font-weight: 500;
    src: 
      url("/fonts/IBMPlexSans-MediumItalic-Latin2.woff") format("woff"),
      url("/fonts/IBMPlexSans-MediumItalic-Latin2.woff2") format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF, U+FB01-FB02;
  }

  @font-face {
    font-display: swap;
    font-family: "IBM Plex Sans";
    font-style: italic;
    font-weight: 500;
    src: 
      url("/fonts/IBMPlexSans-MediumItalic-Latin3.woff") format("woff"),
      url("/fonts/IBMPlexSans-MediumItalic-Latin3.woff2") format("woff2");
    unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
  }

  @font-face {
    font-display: block;
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    src: 
      url("/fonts/IBMPlexMono-Regular-Latin1.woff") format("woff"),
      url("/fonts/IBMPlexMono-Regular-Latin1.woff2") format("woff2");
    unicode-range: U+0000, U+000D, U+0020-007E, U+00A0-00A3, U+00A4-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2013-2014, U+2018-201A, U+201C-201E, U+2020-2022, U+2026, U+2030, U+2039-203A, U+2044, U+2074, U+20AC, U+2122, U+2212, U+FB01-FB02;
  }

  @font-face {
    font-display: block;
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    src:
      url("/fonts/IBMPlexMono-Regular-Latin2.woff") format("woff"),
      url("/fonts/IBMPlexMono-Regular-Latin2.woff2") format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF, U+FB01-FB02;
  }

  @font-face {
    font-display: block;
    font-family: 'IBM Plex Mono';
    font-style: normal;
    font-weight: 400;
    src:
      url("/fonts/IBMPlexMono-Regular-Latin3.woff") format("woff"),
      url("/fonts/IBMPlexMono-Regular-Latin3.woff2") format("woff2");
    unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
  }
`;

export default GlobalStyles;
