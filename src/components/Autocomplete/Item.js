import React from "react";
import PropTypes from "prop-types";

export function Item({ hit, components }) {
  return (
    <a href={hit.url} className="aa-ItemLink">
      <div className="aa-ItemWrapper">
        <div className="aa-ItemContent">
          <div className="aa-ItemContentBody">
            <div className="aa-ItemContentTitle">
              <components.Highlight hit={hit} attribute="title" />
            </div>
            <div className="aa-ItemContentDescription">
              {hit.urlSegments.level1}{" "}
              {hit.urlSegments?.level2 && `> ${hit.urlSegments?.level2}`}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

Item.propTypes = {
  hit: PropTypes.node.isRequired,
  components: PropTypes.node.isRequired,
};
