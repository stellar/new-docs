import { createGlobalStyle, css } from "styled-components";
import styledNormalize from "styled-normalize";

import { FONTS } from "constants/fonts";

export const GlobalStyles = createGlobalStyle`
  body,
  html,
  input,
  textarea,
  button {
    color: ${({ theme }) => theme.text};
  }
  body {
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
${FONTS.map(
  (font) => css`
    @font-face {
      font-display: ${font.fontDisplay || "swap"};
      font-family: "${font.fontFamily}";
      ${font.fontStyle && `font-style: ${font.fontStyle};`}
      src: ${font.src
        .map((src) => `url("${src.url}") format("${src.format}")`)
        .join(", ")};
      ${font.fontWeight && `font-weight: ${font.fontWeight};`}
      ${font.unicodeRange && `unicode-range: ${font.unicodeRange};`}
    }
  `,
)}
  }
`;
