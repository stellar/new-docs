import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Locale from "../Locale";
import Navigation from "../Navigation";
import Footer from "../Footer";

const LayoutBase = ({ metadata, pageContext, children }) => {
  return (
    <Locale
      language={pageContext.locale}
      catalog={pageContext.catalog}
      alternateUrls={pageContext.alternateUrls}
    >
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Navigation />
      {children}
      <Footer />
    </Locale>
  );
};

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  metadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    catalog: PropTypes.object.isRequired,
  }).isRequired,
};

export default LayoutBase;
