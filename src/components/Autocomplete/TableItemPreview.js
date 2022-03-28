import React from "react";
import PropTypes from "prop-types";

export function TableItemPreview({ preview, components }) {
  return (
    <table className="aa-TablePreview">
      <thead>
        <tr>
          {preview.tableAttributes.headers.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {preview.tableAttributes.headers.map((header, index) => {
            if (index === preview.tableAttributes?.column)
              return (
                <td>
                  <components.Highlight hit={preview} attribute="content" />
                </td>
              );
            return <td>...</td>;
          })}
        </tr>
      </tbody>
    </table>
  );
}

TableItemPreview.propTypes = {
  preview: PropTypes.node.isRequired,
  components: PropTypes.node.isRequired,
};
