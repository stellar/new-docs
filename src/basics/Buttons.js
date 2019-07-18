import styled from "styled-components";

export const BasicButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.4px;
`;
export const Button = styled(BasicButton)`
  border: none;
  background-color: ${({ theme }) => theme.cta.body};
  color: ${({ theme }) => theme.cta.text};
  padding: 0.75rem 1.375rem;
  border-radius: 2rem;
`;
