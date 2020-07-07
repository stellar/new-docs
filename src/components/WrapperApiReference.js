import React from "react";
import PropTypes from "prop-types";
import partition from "lodash/partition";

import { Article } from "basics/Text";
import { CustomColumn } from "components/ApiReference/SharedStyles";

const RIGHT_COLUMN_COMPONENTS_NAME = {
  CodeExample: "CodeExample",
  EndpointsTable: "EndpointsTable",
  ExampleResponse: "ExampleResponse",
  MethodTable: "MethodTable",
};
// API reference has 2 columns, with certain types of content always being in one
// or the other. This component sorts through its children to separate them.
export const WrapperApiReference = ({ children, ...props }) => {
  const [rightColumnContent, middleColumnContent] = React.useMemo(
    () =>
      partition(
        React.Children.toArray(children),
        (child) => RIGHT_COLUMN_COMPONENTS_NAME[child.props.mdxType],
      ),
    [children],
  );

  return (
    <React.Fragment>
      {/* Hack to make it look appear as if we had a column-gap
      4rem in between <CustomColumn/> on a large screen (min-width: 1440px)
      skip the 1st column to use it as column-gap, start at the 2nd column and
      span through then next 8 columns (ends at column 9) */}
      <CustomColumn xs={5} xl={9} xlColumn="2 / span 8">
        <Article {...props}>{middleColumnContent}</Article>
      </CustomColumn>
      {/* Hack to make it look appear as if we had a column-gap
      4rem in between <CustomColumn/> on a large screen (min-width: 1440px)
      skip the 10th column to use it as column-gap, start at the 11th column and
      span through the next 8 columns (ends at column 18) */}
      <CustomColumn xs={4} xl={9} xlColumn="11 / span 8">
        {rightColumnContent}
      </CustomColumn>
    </React.Fragment>
  );
};
WrapperApiReference.propTypes = {
  children: PropTypes.node.isRequired,
};
