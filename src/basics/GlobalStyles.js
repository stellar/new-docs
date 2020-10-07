import React from "react";
import { createGlobalStyle, css } from "styled-components";
import styledNormalize from "styled-normalize";

import { FONTS } from "constants/fonts";
import { FONT_FAMILY, MEDIA_QUERIES } from "constants/styles";
import { expansionStyles } from "components/Expansion";

const linkedHeadingStyles = css`
  position: relative;
  scroll-margin-top: 5rem;
  padding-left: 1.25rem;
  margin-left: -1.25rem;

  @media (${MEDIA_QUERIES.canHover}) {
    &:hover svg {
      visibility: visible;
    }
  }

  & svg {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    visibility: hidden;
  }
`;

const Styles = createGlobalStyle`
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
  [hidden] {
    display: block !important;
  }
  ${expansionStyles}
  .linkedHeading {
    ${linkedHeadingStyles}
  }
`;

const fontStyles = FONTS.map(
  (font) => `
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
).join("");

export const GlobalStyles = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
    <Styles />
  </>
);
