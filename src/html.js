import React from "react";
import PropTypes from "prop-types";
import { PORTAL_TARGETS } from "constants/domNodes";
import { IS_PRODUCTION } from "constants/env";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {IS_PRODUCTION && (
          <script async src="https://www.google-analytics.com/analytics.js" />
        )}
        {props.headComponents}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
        />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
if (document.location.pathname.startsWith('/api')) {
  var el = document.getElementById(document.location.pathname)
  if (el) {
    el.scrollIntoView();
  }
}
`,
          }}
        />
        {props.postBodyComponents}

        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
        ></script>

        {Object.values(PORTAL_TARGETS).map((name) => (
          <div key={name} id={name} />
        ))}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
