import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PALETTE } from "constants/styles";
import { REGEX } from "constants/regex";
import { Link } from "basics/Links";

const ResponseStatusEl = styled.span`
  position: relative;
  color: ${(props) => (props.isError ? PALETTE.orange : PALETTE.green)};
  padding-top: 0.625rem;
  font-size: 0.75rem;
`;
const LinkEl = styled(Link)`
  padding-left: 0.2rem;
  text-decoration: underline;
`;

const RegexErrorMessage = ({ errorMessage }) => {
  const MESSAGE_URL = errorMessage.match(REGEX.extractHttpsUrl);

  if (MESSAGE_URL) {
    const firstMessage = errorMessage.split("<a href")[0];
    const CONVERT_URL_TO_VALID = errorMessage
      .match(REGEX.extractHttpsUrl)[0]
      .replace(/"/g, "");

    return (
      <>
        {firstMessage}{" "}
        <LinkEl newTab href={CONVERT_URL_TO_VALID}>
          Click here to update your profile.
        </LinkEl>
      </>
    );
  }
  return { errorMessage };
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
      Confirmation email has been sent to <strong>{email}</strong>
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
