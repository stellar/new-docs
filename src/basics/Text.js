import styled, { css } from "styled-components";
import { PALETTE, MEDIA_QUERIES } from "constants/styles";

const textStyles = css`
  line-height: 1.5;
  color: ${({ theme }) => theme.text};
`;

export const Text = styled.p`
  ${textStyles}
`;

const headingBase = ({ theme }) => `
  color: ${theme.text};
`;
export const H1 = styled.h1`
  ${headingBase};
  font-size: 2.5rem;
  margin: 1.25em 0 0.67em;
  letter-spacing: -1.2px;
`;
export const H2 = styled.h2`
  ${headingBase};
  margin: 3.125rem 0 1.56rem;
  letter-spacing: -1.2px;
`;
export const H3 = styled.h3`
  ${headingBase};
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

export const Quote = styled.blockquote`
  position: relative;
  margin: 2.3rem 0;
  width: 100%;

  p {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.29;
    color: ${PALETTE.dark};
    margin-left: 2.4rem;
  }

  ::before {
    content: "“";
    font-size: 4rem;
    font-weight: 500;
    position: absolute;
    left: -0.2rem;
    top: -1rem;
    width: auto;
  }

  @media (${MEDIA_QUERIES.gtLaptop}) {
    width: 80%;
  }
`;
export const List = styled.ul`
  ${textStyles}
`;
export const OrderedList = styled.ol`
  ${textStyles}
`;
export const Small = styled.small`
  font-size: 75%;
`;
export const ListItem = styled.li``;
export const Table = styled.table``;
export const TableHead = styled.thead``;
export const TableHeadCell = styled.th``;
export const TableBody = styled.tbody``;
export const TableRow = styled.tr``;
export const TableCell = styled.td``;
export const Preformatted = styled.pre``;
export const Code = styled.code``;
export const Italic = styled.em``;
export const Bold = styled.strong``;
export const Muted = styled(Text).attrs(() => ({ as: "span" }))`
  color: ${({ theme }) => theme.medium};
`;
export const Strike = styled(Text)`
  text-decoration: line-through;
`;
export const HorizontalRule = styled.hr`
  margin: 3rem 0;
  border-color: ${PALETTE.light};
  background-color: ${PALETTE.light};
`;
