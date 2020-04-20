import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { SideNavProgressContext } from "components/SideNav/Provider";

const El = styled.div``;

export const TrackedContent = ({ children, identifier }) => {
  const { trackElement, stopTrackingElement } = React.useContext(
    SideNavProgressContext,
  );
  const ref = React.useRef();
  React.useEffect(() => {
    const toTrack = { ref, id: identifier };
    trackElement(toTrack);
    return () => {
      stopTrackingElement(toTrack);
    };
  }, [children, identifier, trackElement, stopTrackingElement]);

  return <El ref={ref}>{children}</El>;
};

TrackedContent.propTypes = {
  children: PropTypes.node.isRequired,
  identifier: PropTypes.string.isRequired,
};
