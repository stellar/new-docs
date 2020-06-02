import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PALETTE, FONT_WEIGHT } from "constants/styles";

import { AlertIcon } from "basics/Icons";

const AlertEl = styled.div`
  font-weight: ${FONT_WEIGHT.normal};
  display: flex;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid rgba(62, 27, 219, 0.2);
  background-color: rgba(62, 27, 219, 0.04);
  color: ${PALETTE.black80};
  padding: 1rem 0.75rem;
  line-height: 1.75;

  p {
    margin: 0;
  }
`;

const CustomAlertIcon = styled(AlertIcon)`
  margin-right: 0.5rem;
  margin-top: 0.2rem;
`;

export const Alert = ({ children }) => {
  if (typeof children === "string") {
    // eslint-disable-next-line no-console
    throw new Error(
      "Children is parsed as a raw string. Make sure that there is an empty line within the React component wrapper in MDX. An empty line is needed to be parsed as markdown.",
    );
  }

  return (
    <AlertEl>
      <CustomAlertIcon color={PALETTE.purpleBlue} />
      {children}
    </AlertEl>
  );
};

Alert.propTypes = {
  children: PropTypes.element.isRequired,
};
