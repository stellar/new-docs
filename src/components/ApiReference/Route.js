import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { OriginalFileContext } from "basics/Links";
import { Context as ScrollRouterContext } from "components/ApiReference/ScrollRouter";

const El = styled.div``;

export const Route = ({ children, originalFilePath, path }) => {
  const { trackElement, stopTrackingElement } = React.useContext(
    ScrollRouterContext,
  );
  const ref = React.useRef();
  React.useEffect(() => {
    trackElement(ref, path);
    return () => {
      stopTrackingElement(ref);
    };
  }, [trackElement, stopTrackingElement, path]);

  return (
    <OriginalFileContext.Provider value={originalFilePath}>
      <El ref={ref}>{React.Children.only(children)}</El>
    </OriginalFileContext.Provider>
  );
};

Route.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  originalFilePath: PropTypes.string.isRequired,
};
