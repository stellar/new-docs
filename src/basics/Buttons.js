import styled from "styled-components";

export const BasicButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  color: ${({ theme }) => theme.text};
`;
export const Button = styled(BasicButton)``;
