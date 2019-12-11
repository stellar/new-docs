import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { SideNavProgressContext } from "components/SideNav/Provider";

const El = styled.div``;

export const TrackedContent = ({ children }) => {
  const { trackElement, stopTrackingElement } = React.useContext(
    SideNavProgressContext,
  );
  const ref = React.useRef();
  const childRef = React.useRef();
  React.useEffect(() => {
    // This is an unfortunate collision between our scrollspy and linkable
    // headers. The scollspy wants the ID to be on the tracked element (i.e. the
    // output from this component) and the linkable header assumes the ID is on
    // the header itself. To reconcile these, we expect this component to wrap a
    // linkable header, and grab the resulting node here.
    // eslint-disable-next-line react/no-find-dom-node
    childRef.current = ref.current.children[0];
    if (process.env.NODE_ENV === "development" && !childRef.current.id) {
      // eslint-disable-next-line
      console.error(
        "[TrackedContent]: Expected to wrap a single element with an ID, but no ID was found",
      );
    }
    trackElement(childRef);
    return () => {
      stopTrackingElement(childRef);
    };
  }, [children, trackElement, stopTrackingElement]);

  return <El ref={ref}>{React.Children.only(children)}</El>;
};

TrackedContent.propTypes = {
  children: PropTypes.node.isRequired,
};
