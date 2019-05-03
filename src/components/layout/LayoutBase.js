import React from "react";
import PropTypes from "prop-types";

import Locale from "../Locale";
import Navigation from "../Navigation";
import Footer from "../Footer";

const LayoutBase = ({ pageContext, children }) => {
  return (
    <Locale language={pageContext.locale} catalog={pageContext.catalog}>
      <Navigation />
      {children}
      <Footer />
    </Locale>
  );
};

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
    catalog: PropTypes.object.isRequired,
  }).isRequired,
};

export default LayoutBase;
