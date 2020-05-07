import { createGlobalStyle, css } from "styled-components";
import styledNormalize from "styled-normalize";

import { FONTS } from "constants/fonts";
import { FONT_FAMILY } from "constants/styles";

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
    font-family: ${FONT_FAMILY.base};
    line-height: 1;
  }
  /* http://tachyons.io/docs/layout/box-sizing/ */
  body * {
    box-sizing: border-box;
  }
  twitter-widget {
    margin: auto;
  }
  ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
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
