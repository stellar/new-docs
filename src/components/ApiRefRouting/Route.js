import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { TrackedElementsContext } from "components/ApiRefRouting/ScrollRouter";

const El = styled.div``;

export const Route = ({ children, path }) => {
  const { trackElement, stopTrackingElement } = React.useContext(
    TrackedElementsContext,
  );
  const ref = React.useRef();
  const childRef = React.useRef();
  React.useEffect(() => {
    childRef.current = ref.current.children[0];
    trackElement(childRef, path);
    return () => {
      stopTrackingElement(childRef);
    };
  }, [children, trackElement, stopTrackingElement, path]);

  return <El ref={ref}>{React.Children.only(children)}</El>;
};

Route.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};
