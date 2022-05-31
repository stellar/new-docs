import React from "react";
import PropTypes from "prop-types";

export function SuggestionItem({ item, components }) {
  return (
    <button className="aa-QuerySuggestion">
      <components.ReverseHighlight hit={item} attribute="query" cl />
    </button>
  );
}

SuggestionItem.propTypes = {
  item: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
};
