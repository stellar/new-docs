/**
 * @desc getCookie function that retrives cookie values
 * @param {string} name - name of the cookie
 * @return {string} - Returns a value of the cookie user requested
 */
export const getCookie = (name) => {
  /* eslint-disable */
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
