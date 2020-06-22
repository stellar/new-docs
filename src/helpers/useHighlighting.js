import React from "react";
import Prism from "prismjs";

export const useHighlighting = (ref) => {
  React.useEffect(() => {
    setTimeout(() => {
      Prism.highlightAllUnder(ref.current);
    }, 0);
  });
};
