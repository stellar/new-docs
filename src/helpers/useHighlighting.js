import React from "react";
import Prism from "prismjs";

export const useHighlighting = (ref) => {
  React.useEffect(() => {
    requestAnimationFrame(() => {
      Prism.highlightAllUnder(ref.current);
    });
  });
};
