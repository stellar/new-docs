import styled from "styled-components";
import { FONT_FAMILY } from "constants/styles";

export const Mermaid = styled.div`
  svg {
    text {
      font-family: ${FONT_FAMILY.base};
    }
    .actor {
      stroke: #000000;
      stroke-width: 2px;
      fill: #ffffff;
    }
    text.actor {
      fill: #000;
      stroke: none;
    }
    #arrowhead {
      fill: #4a4a49;
    }
    .actor-line {
      stroke: #999999;
      opacity: 0.5;
      stroke-width: 2px;
      stroke-dasharray: 5;
      stroke-linecap: round;
    }
    .messageLine0 {
      stroke: #4a4a49;
      stroke-width: 2;
      marker-end: url(#arrowhead) !important;
    }
    #mermaidChart0 > g:nth-child(6) {
      stroke: red;
      display: none;
    }
    .messageLine1 {
      stroke: rebeccapurple;
    }
    .messageText {
      font-size: 0.875rem;
    }
    .note {
      fill: #fae7cb;
      stroke: #d0af7e;
    }
    rect.note {
      fill: #f9e3c4;
      stroke: #c7a06a;
    }
  }
`;
