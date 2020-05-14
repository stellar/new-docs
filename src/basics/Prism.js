import { createGlobalStyle } from "styled-components";
import { waitFor } from "helpers/waitFor";

import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { PALETTE, FONT_WEIGHT, FONT_FAMILY } from "constants/styles";

if (document) {
  [
    "https://unpkg.com/prismjs@1.20.0/components/prism-core.min.js",
    "https://unpkg.com/prismjs@1.20.0/plugins/autoloader/prism-autoloader.min.js",
  ].forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.append(script);
  });
  waitFor(() => !!window.Prism).then(() => {
    window.Prism.plugins.autoloader.languages_path =
      "https://unpkg.com/prismjs@1.20.0/components/";
    window.Prism.manual = true;
  });
}

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
  color: ${PALETTE.white};
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


  &.line-numbers {
    display: block;
    padding-left: 2rem !important;

    div[data-language="json"] & {
      padding-left: 0 !important;
    }
  }

  .line-numbers-rows {
    display: block;
    padding-left: 0.5rem !important;
    left: -0.5rem !important;

    div[data-language="json"] & {
      display: none !important;
    }

    & > span:before {
      color: #8d8f99 !important;
    }
  }
}

@media print {
  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}

div[data-language="json"] {
  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${(props) => (props.isDoc ? PALETTE.white : "slategray")};
  }
}
/* Code blocks */
pre[class*="language-"] {
  margin: 0;
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
  color: "slategray";
}
.token.punctuation {
  color: ${PALETTE.lightGrey};
}
.namespace {
  opacity: 0.7;
}
.token.property,
.token.tag,
.token.constant,
.token.symbol,
.token.deleted {
  color: rgba(255,255,255,0.6);
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
  color: #abcc7d;
}
.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: ${PALETTE.black60};
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
`;
