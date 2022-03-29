import React from "react";
import PropTypes from "prop-types";

export function ContentPreview({ preview, components }) {
  return <components.Highlight hit={preview} attribute="content" />;
}

ContentPreview.propTypes = {
  preview: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
};
