import React from "react";
import PropTypes from "prop-types";

export function HitItem({ item, components }) {
  return (
    <a href={item.url} className="aa-ItemLink">
      <div className="aa-ItemWrapper">
        <div className="aa-ItemContent">
          <div className="aa-ItemContentBody">
            <div className="aa-ItemContentTitle">
              <components.Highlight hit={item} attribute="title" />
            </div>
            <div className="aa-ItemContentDescription">
              {item.urlSegments.level1}{" "}
              {item.urlSegments?.level2 && `> ${item.urlSegments?.level2}`}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

HitItem.propTypes = {
  item: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
};
