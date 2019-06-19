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
  padding: 0;

  li {
    padding-left: 1.2rem;
    &:before {
      color: ${PALETTE.yellow};
      font-size: 1.5rem;
      line-height: 1.7rem;
      content: "\\002022";
      position: absolute;
      left: 0;
    }
  }
`;
export const OrderedList = styled.ol`
  padding: 0;
  li {
    padding-left: 1.4rem;
    counter-increment: my-awesome-counter;
    &:before {
      font-weight: bold;
      color: ${PALETTE.yellow};
      content: counter(my-awesome-counter);
      position: absolute;
      left: 0;
    }
  }
`;
export const Small = styled.small`
  font-size: 75%;
`;
export const ListItem = styled.li`
  color: ${({ theme }) => theme.darkGrey};
  font-size: 1.1rem;
  line-height: 1.7;
  position: relative;
  padding-bottom: 1rem;
  list-style: none;
`;
export const Table = styled.table`
  width: 100%;
  margin-top: 1.5rem;
  border-collapse: collapse;
`;
export const TableHead = styled.thead``;
export const TableHeadCell = styled.th`
  font-size: 0.9rem;
  line-height: 2.5rem;
  text-align: left;
  border-bottom: 1px solid ${PALETTE.lightestGrey};
  color: ${({ theme }) => theme.text};
  padding: 0 1.25rem;
`;
export const TableBody = styled.tbody``;
export const TableRow = styled.tr``;
export const TableCell = styled.td`
  font-size: 1rem;
  background-color: ${({ theme }) => theme.contrast};
  color: ${({ theme }) => theme.darkGrey};
  padding: 1.1rem 1.25rem;
  border-bottom: 1px solid ${PALETTE.lightestGrey};
`;
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
  margin: 2rem 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;
