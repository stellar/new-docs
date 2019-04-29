import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";

// @font-face {
//   font-display: swap;
//   font-family: suisse;
//   src:
//     url("/fonts/suisseintl-book-webfont.woff") format("woff"),
//     url("/fonts/suisseintl-book-webfont.woff2") format("woff2");
//   font-weight: book???;
//   font-style: book???;
// }
// }

const GlobalStyles = createGlobalStyle`
  body,
  html,
  input,
  textarea,
  button {
    color: ${({ theme }) => theme.text};
  }
  body {
    background: ${({ theme }) => theme.background};
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }
  ${styledNormalize}
  body,
  html,
  input,
  textarea,
  button {
    font-size: 16px;
    font-weight: 400;
    font-family: 'suisse', 'Georgia', serif;
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
    url("/fonts/suisseintl-light-webfont.woff") format("woff"),
    url("/fonts/suisseintl-light-webfont.woff2") format("woff2");
  font-weight: light;
  font-style: regular;
}

@font-face {
  font-display: swap;
  font-family: suisse;
  src:
    url("/fonts/suisseintl-regular-webfont.woff") format("woff"),
    url("/fonts/suisseintl-regular-webfont.woff2") format("woff2");
  font-weight: regular;
  font-style: regular;
}

@font-face {
  font-display: swap;
  font-family: suisse;
  src:
    url("/fonts/suisseintl-semibold-webfont.woff") format("woff"),
    url("/fonts/suisseintl-semibold-webfont.woff2") format("woff2");
  font-weight: semibold;
  font-style: regular;
}

@font-face {
  font-display: swap;
  font-family: suisse-mono;
  src:
    url("/fonts/suisseintlmono-regular-webfont.woff") format("woff"),
    url("/fonts/suisseintlmono-regular-webfont.woff2") format("woff2");
  font-weight: regular;
  font-style: regular;
}
`;

export default GlobalStyles;
