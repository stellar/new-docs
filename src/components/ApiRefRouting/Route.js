import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Context as ScrollRouterContext } from "components/ApiRefRouting/ScrollRouter";

const El = styled.div``;

export const SectionPathContext = React.createContext("");

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
    <SectionPathContext.Provider value={originalFilePath}>
      <El ref={ref}>{React.Children.only(children)}</El>
    </SectionPathContext.Provider>
  );
};

Route.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  originalFilePath: PropTypes.string.isRequired,
};
