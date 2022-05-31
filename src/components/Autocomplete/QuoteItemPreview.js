import React from "react";
import PropTypes from "prop-types";

export function QuoteItemPreview({ preview, components }) {
  return (
    <blockquote className="aa-QuotePreview">
      <components.Highlight hit={preview} attribute="content" />
    </blockquote>
  );
}

QuoteItemPreview.propTypes = {
  preview: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
};
