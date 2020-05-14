import { createGlobalStyle } from "styled-components";
import Prism from "prismjs";

import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-python";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { PALETTE, FONT_WEIGHT, FONT_FAMILY } from "constants/styles";

Prism.languages.curl = Prism.languages.js;
Prism.languages.sh = Prism.languages.bash;

const LIGHT_PALETTE = {
  light: PALETTE.lightGrey,
  lightGrey: PALETTE.lightGrey,
  green: "#6EBD00",
  blue: "#657EFF",
  yellow: "#E69D00",
};
const DARK_PALETTE = {
  light: PALETTE.lightGrey,
  grey: PALETTE.lightGrey,
  green: "#ABCC7D",
  blue: "#A9B7FF",
  yellow: "#FFDD96",
};

const RESPONSE_THEME = {
  key: LIGHT_PALETTE.medium,
  punctuation: LIGHT_PALETTE.grey,
  boolean: LIGHT_PALETTE.yellow,
  string: LIGHT_PALETTE.green,
  number: LIGHT_PALETTE.blue,
};
const CODE_THEME = {
  punctuation: DARK_PALETTE.grey,
  property: DARK_PALETTE.grey,
  builtin: DARK_PALETTE.blue,
  string: DARK_PALETTE.green,
  function: DARK_PALETTE.yellow,
  boolean: DARK_PALETTE.yellow,
  object: DARK_PALETTE.yellow,
  comment: DARK_PALETTE.grey,
  variable: DARK_PALETTE.light,
  htmlTag: DARK_PALETTE.grey,
  cssVariable: DARK_PALETTE.yellow,
  cssSelector: DARK_PALETTE.green,
};

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
  margin: 0;
  font-family: ${FONT_FAMILY.monospace};
  font-size: 1em;
  text-align: left;
  white-space: pre-wrap;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 4;
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

    div[data-language="json"] & {
      display: none !important;
    }

    & > span:before {
      color: #8d8f99 !important;
    }
  }
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}

/* Example response */
.language-json {
  .token.property,
  .token.operator {
    color: ${RESPONSE_THEME.key};
  }
  .token.punctuation {
    color: ${RESPONSE_THEME.punctuation};
  }
  .token.boolean {
    color: ${RESPONSE_THEME.boolean};
  }
  .token.number {
    color: ${RESPONSE_THEME.number};
  }
  .token.string {
    color: ${RESPONSE_THEME.string};
  }
}

/* Example code */
pre[class*="language-"]:not(.language-json) {
  .token.punctuation,
  .token.operator {
    color: ${CODE_THEME.punctuation};
  }
  .token.property {
    color: ${CODE_THEME.property};
  }
  .token.builtin,
  .token.atrule,
  .token.attr-name,
  .token.keyword {
    color: ${CODE_THEME.builtin};
  }
  .token.string,
  .token.url,
  .token.attr-value {
    color: ${CODE_THEME.string};
  }
  .token.regex,
  .token.function {
    color: ${CODE_THEME.function};
  }
  .token.boolean {
    color: ${CODE_THEME.boolean};
  }
  .token.class-name {
    color: ${CODE_THEME.object};
  }
  .token.comment {
    color: ${CODE_THEME.comment};
  }
  .token.variable {
    color: ${CODE_THEME.variable};
  }
  .token.tag {
    color: ${CODE_THEME.htmlTag};
  }
  .language-css, .language-scss {
    .token.variable {
      color: ${CODE_THEME.cssVariable};
    }
  }
  .token.selector {
    color: ${CODE_THEME.cssSelector};
  }
}

/* Generic */
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
`;
