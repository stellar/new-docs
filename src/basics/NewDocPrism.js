import { createGlobalStyle } from "styled-components";

import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { PALETTE, FONT_WEIGHT, FONT_FAMILY } from "constants/styles";

// All markdown content has syntax highlighting markup created, but not all
// pages load the css required to actually style the lines appropriately.
// This component has to be rendered to add color to syntax.
export const PrismStyles = createGlobalStyle`
/* PrismJS 1.16.0
https://prismjs.com/download.html#themes=prism&languages=clike+javascript */
/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

code[class*="language-"],
pre[class*="language-"] {
  color: ${(props) => (props.isCodeSnippet ? PALETTE.white : PALETTE.darkGrey)};
  font-family: ${FONT_FAMILY.monospace};
  font-size: 1em;
  text-align: left;
  white-space: pre-wrap;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection {
  text-shadow: none;
}

pre[class*="language-"]::selection,
pre[class*="language-"] ::selection,
code[class*="language-"]::selection,
code[class*="language-"] ::selection {
  text-shadow: none;
}

@media print {
  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}

/* Code blocks */
pre[class*="language-"] {
  margin: 0.5em 0;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: ${(props) => (props.isCodeSnippet ? "#8fa4af" : "slategray")};
}

.token.punctuation {
  color: #999;
}

.namespace {
  opacity: 0.7;
}

.token.property,
.token.tag,
.token.constant,
.token.symbol,
.token.deleted {
  color: ${PALETTE.black60};
}

.token.boolean {
    color: #e5c687;
}

.token.number {
    color: #8792cc;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: ${(props) => (props.isCodeSnippet ? "#d5ff99" : "#abcc7d")};
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #7ffffe;
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #a9b7ff;
}

.token.function,
.token.class-name {
  color: #ffdd96;
}

.token.regex,
.token.important,
.token.variable {
  color: #e90;
}

.token.important,
.token.bold {
  font-weight: ${FONT_WEIGHT.bold};
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

/**
 * If you only want to use line numbering
 */

.gatsby-highlight {  
  border-radius: 0.3em;
}

.line-numbers-rows {
  display: ${(props) => (props.isCodeSnippet ? "block" : "none")};
  background: ${PALETTE.black90};
}
.line-numbers {
  padding: ${(props) => (props.isCodeSnippet ? "block" : "none")};
}

`;
