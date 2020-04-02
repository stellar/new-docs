/**
 * @desc convert JSX to String
 * @param {object} component - React Component that needs to be converted to String
 * @param {string} finalString - a string of JSX or an empty string
 * @return {string} - Returns a value of the JSX in String
 */
export const extractStringChildren = (component, finalString = "") => {
  /* eslint-disable no-param-reassign */
  if (typeof component === "string") {
    finalString += component;
  } else if (typeof component.props.children === "string") {
    finalString += component.props.children;
  } else if (component.props.children) {
    component.props.children.forEach((nestedCodeSnippet) => {
      finalString += extractStringChildren(nestedCodeSnippet);
    });
  } else {
    finalString += "";
  }
  /* eslint-disable no-param-reassign */
  return finalString;
};

export const loopAndExtractString = (arr) => {
  let str;
  // eslint-disable-next-line react/prop-types
  arr.forEach((child) => {
    if (child !== "string") {
      str = extractStringChildren(child, str);
    } else {
      str += child;
    }
  });

  return str;
};
