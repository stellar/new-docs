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
    font-display: swap;
    font-family: suisse;
    src:
      url("/fonts/suisseintl-regular-webfont.woff") format("woff"),
      url("/fonts/suisseintl-regular-webfont.woff2") format("woff2");
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
    src:
      url("/fonts/suisseintl-semibold-webfont.woff") format("woff"),
      url("/fonts/suisseintl-semibold-webfont.woff2") format("woff2");
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
`;

export default GlobalStyles;
