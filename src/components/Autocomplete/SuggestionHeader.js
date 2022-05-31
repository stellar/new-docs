import React from "react";
import PropTypes from "prop-types";

export function SuggestionHeader({ items, Fragment }) {
  if (items.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <div>
        <span className="aa-SourceHeaderTitle">
          Not finding what you‘re looking for? Try one of these queries instead:
        </span>
      </div>
    </Fragment>
  );
}

SuggestionHeader.propTypes = {
  items: PropTypes.array.isRequired,
  Fragment: PropTypes.node.isRequired,
};
