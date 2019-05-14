import React from "react";
import PropTypes from "prop-types";
import { Trans } from "@lingui/macro";
import styled from "styled-components";
import { PALETTE } from "constants/styles";

const ResponseStatusEl = styled.span`
  position: absolute;
  color: ${(props) => (props.isError ? PALETTE.orange : PALETTE.green)};
  padding-top: 0.625rem;
  font-size: 0.75rem;
`;

const MessageBlock = (props) => {
  const { response, email } = props;
  const ERROR_MESSAGE =
    response.message.split(" ")[0] === "0"
      ? "Please type a valid email address"
      : response.message;

  return response.status === "error" ? (
    <ResponseStatusEl isError>
      <Trans>{ERROR_MESSAGE}</Trans>
    </ResponseStatusEl>
  ) : (
    <ResponseStatusEl>
      <Trans>Confirmation email has been sent to {email}</Trans>
    </ResponseStatusEl>
  );
};

export default MessageBlock;

MessageBlock.propTypes = {
  response: PropTypes.shape({
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
  email: PropTypes.string,
};
