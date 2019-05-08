import styled from "styled-components";

import { H2 as BasicH2 } from "../../basics/Text";

export const H2 = styled(BasicH2)`
  font-weight: normal;
  color: ${({ theme }) => theme.medium};
`;

export const Block = styled.div`
  margin: 0 auto 2rem;
  width: 21rem;
`;

export const NavTab = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(27rem, 1fr));
  margin: 0 -1rem;
`;
