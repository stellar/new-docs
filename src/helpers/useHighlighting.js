import React from "react";

import { waitFor } from "helpers/waitFor";

export const useHighlighting = (ref) => {
  React.useEffect(() => {
    waitFor(() => !!window.Prism).then(() => {
      requestAnimationFrame(() => {
        window.Prism.highlightAllUnder(ref.current);
      });
    });
  });
};
