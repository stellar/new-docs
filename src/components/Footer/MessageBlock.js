import React from "react";
import PropTypes from "prop-types";
import { Trans } from "@lingui/macro";
import styled from "styled-components";

import { PALETTE } from "constants/styles";
import { Link } from "basics/Links";

const ResponseStatusEl = styled.span`
  position: absolute;
  color: ${(props) => (props.isError ? PALETTE.orange : PALETTE.green)};
  padding-top: 0.625rem;
  font-size: 0.75rem;
`;
const LinkEl = styled(Link)`
  padding-left: 0.2rem;
  text-decoration: underline;
`;

const RegexErrorMessage = ({ errorMessage }) => {
  const linkAttrRegex = /\s*(['"])(https?:\/\/.+?)\1/g;
  const MESSAGE_URL = errorMessage.match(linkAttrRegex);

  if (MESSAGE_URL) {
    const firstMessage = errorMessage.split("<a href")[0];
    const CONVERT_URL_TO_VALID = errorMessage
      .match(/\s*(['"])(https?:\/\/.+?)\1/g)[0]
      .replace(/"/g, "");

    return (
      <>
        <Trans>{firstMessage} </Trans>
        <LinkEl newTab href={CONVERT_URL_TO_VALID}>
          <Trans>Click here to update your profile.</Trans>
        </LinkEl>
      </>
    );
  }
  return <Trans>errorMessage</Trans>;
};

RegexErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

const MessageBlock = (props) => {
  const { response, email } = props;
  const ERROR_MESSAGE =
    response.message.split(" ")[0] === "0" ? (
      "Please type a valid email address"
    ) : (
      <RegexErrorMessage errorMessage={response.message} />
    );

  return response.status === "error" ? (
    <ResponseStatusEl isError>{ERROR_MESSAGE}</ResponseStatusEl>
  ) : (
    <ResponseStatusEl>
      <Trans>
        Confirmation email has been sent to <strong>{email}</strong>
      </Trans>
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
