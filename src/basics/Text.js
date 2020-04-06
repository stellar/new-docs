import React from "react";
import styled, { css } from "styled-components";

import {
  PALETTE,
  MEDIA_QUERIES,
  FONT_FAMILY,
  FONT_WEIGHT,
} from "constants/styles";
import { makeLinkedHeader } from "helpers/makeLinkedHeader";
import { useMatchMedia } from "helpers/useMatchMedia";

const textStyles = css`
  line-height: 1.75;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
`;

export const Text = styled.p`
  ${textStyles}
`;
export const MonoText = styled(Text).attrs({ as: "span" })`
  font-family: ${FONT_FAMILY.monospace};
`;
export const Colored = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "default")};
`;
export const Code = styled.code`
  color: ${PALETTE.purple};
  font-family: ${FONT_FAMILY.monospace};
  border-radius: 3px;
  border: solid 0.5px ${PALETTE.white60};
  background-color: ${PALETTE.white80};
  padding: 0 0.25rem;
`;
const headingBase = ({ theme }) => `
  color: ${theme.text};
  font-weight: ${FONT_WEIGHT.normal};
  padding: 0;
  margin: 0;

  ${Code} {
    font-size: 1rem;
    vertical-align: middle;
  }
`;
export const H1 = styled.h1`
  ${headingBase};
  display: inline-block;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  margin-top: 5.25rem;
  line-height: 1.25;
  letter-spacing: normal;
`;
export const H2 = styled.h2`
  ${headingBase};
  display: inline-block;
  font-size: 1.5rem;
  padding-top: 2rem;
  line-height: 1.5;
  letter-spacing: normal;
`;
export const H3 = styled.h3`
  ${headingBase};
  font-size: 1.125rem;
  padding-top: 0.5rem;
  line-height: 1.5;
`;
export const H4 = styled.h4`
  ${headingBase};
`;
export const H5 = styled.h5`
  ${headingBase};
`;
export const H6 = styled.h6`
  ${headingBase};
`;

export const LinkedH2 = makeLinkedHeader(H2);

export const Quote = styled.blockquote`
  margin: 1rem 0;
  padding: 0.5rem 1.25rem;
  border-left: 0.125rem solid ${PALETTE.purpleBlue};

  p {
    color: #000;
    font-size: 1.125rem;
    line-height: 2;
    margin-top: 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const listBase = css`
  ${textStyles};
  padding: 0;
  padding-left: 1.375rem;
  color: ${PALETTE.black60};
  font-size: 1rem;
`;
export const List = styled.ul`
  ${listBase}
  position: relative;
  list-style-type: none;

  & > li {
    &::before {
      content: "";
      position: absolute;
      left: -1.4rem;
      top: 0.75rem;
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background-color: ${PALETTE.black60};
    }

    &:first-child > ul > li {
      &::before {
        width: 0.25rem;
        height: 0.25rem;
        border: 1px solid ${PALETTE.black60};
        background-color: transparent;
      }
    }

    &:nth-child(2) > ul > li {
      &::before {
        width: 0.375rem;
        height: 0.375rem;
        border-radius: initial;
        background-color: ${PALETTE.black60};
      }
    }
  }
`;
export const OrderedList = styled.ol`
  counter-reset: ordered-list-counter;
  ${listBase}
`;

const bulletPosition = css`
  position: absolute;
  left: -2rem;
`;
export const ListItem = styled.li`
  position: relative;

  @media (${MEDIA_QUERIES.ltTablet}) {
    font-size: 1rem;
  }

  & input[type="checkbox"] {
    ${bulletPosition}
    margin-top: .25rem;
    margin-left: -0.125rem;
  }
`;
export const Small = styled.small`
  font-size: 75%;
`;
export const Table = styled.table`
  display: block;
  position: relative;
  word-break: normal;
  width: 100%;
  padding: 0 1px;
  margin: 0;
  border-collapse: collapse;
`;
export const TableHead = styled.thead``;
export const TableHeadCell = styled.th`
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: ${FONT_WEIGHT.bold};
  text-align: left;
  border-bottom: none;
  color: ${({ theme }) => theme.text};
  padding: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
  min-width: 8.5rem;
  line-height: 1.5;
  vertical-align: middle;
`;
export const TableBody = styled.tbody`
  font-size: 0.875rem;
`;
export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${PALETTE.white80};
  }
`;
export const TableCell = styled.td`
  color: ${PALETTE.black60};
  padding: 0.75rem;
  vertical-align: top;
  border: solid 1px ${PALETTE.white60};
`;
export const Preformatted = styled.pre`
  &&& {
    font-family: ${PALETTE.monospace};
    position: relative;
    background: transparent;
    font-size: 0.8rem;
    line-height: 1.7;
    color: ${PALETTE.darkGrey};
  }

  &&& ${Code} {
    display: inline-block;
    border: none;
    background-color: transparent;
    line-height: inherit;
    white-space: pre-wrap;
    max-width: 90rem;
    width: 1000rem;
    word-break: break-all;
  }
  && .line-numbers-rows {
    font-family: ${PALETTE.normal};
    text-align: right;
    line-height: 1.8;
    color: #8d8f99;
    opacity: 0.72;
    bottom: 0;
    border: none;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    margin: 0;
    text-shadow: none;

    // This is gross but gotta override
    & > span::before {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.contrast};
    }
  }
`;
export const Italic = styled.em``;
export const Bold = styled.strong`
  font-weight: ${FONT_WEIGHT.bold};
`;
export const Muted = styled(Text).attrs(() => ({ as: "span" }))`
  color: ${({ theme }) => theme.medium};
`;
export const Strike = styled(Text).attrs(() => ({ as: "del" }))`
  text-decoration: line-through;
`;
export const HorizontalRule = styled.hr`
  margin: 2rem 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${PALETTE.white60};
`;

export const Sup = styled(({ children, ...props }) => {
  const isMobile = useMatchMedia(`(${MEDIA_QUERIES.ltLaptop})`);
  return isMobile ? null : <sup {...props}>{children}</sup>;
})`
  font-size: 0.687rem;
  color: ${PALETTE.yellow};
  font-weight: ${FONT_WEIGHT.bold};
  padding-left: 0.125rem;
`;
