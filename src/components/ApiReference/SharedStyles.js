import styled from "styled-components";
import { PALETTE, DEFAULT_COLUMN_WIDTH, FONT_WEIGHT } from "constants/styles";
import { Link } from "basics/Links";
import { H5 } from "basics/Text";

export const NavLink = styled(Link)`
  color: inherit;
  font-weight: unset;
  display: block;

  &:hover {
    color: ${PALETTE.lightGrey};
  }
`;
export const ExpansionContainer = styled.div`
  margin-top: 1rem;
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;

  &:last-child {
    padding-bottom: 2.25rem;
  }
`;
export const NavTitle = styled(H5)`
  margin: 0;
  line-height: normal;
  font-weight: ${FONT_WEIGHT.bold};
  text-transform: uppercase;
`;
