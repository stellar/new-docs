import React from "react";
import PropTypes from "prop-types";

import { MethodTable } from "components/MethodTable";
import { useHighlighting } from "helpers/useHighlighting";

export const ExampleResponse = ({ children, title = "Example" }) => {
  const responseRef = React.useRef();
  useHighlighting(responseRef);

  return (
    <MethodTable ref={responseRef} title={title}>
      {children}
    </MethodTable>
  );
};

ExampleResponse.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
};
