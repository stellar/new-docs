import React from "react";
import PropTypes from "prop-types";

import { consolidateToSection } from "helpers/documentation";
import { loopAndExtractString } from "helpers/extractStringChildren";
import { slugify } from "helpers/slugify";

import { Section } from "basics/Text";
import { TrackedContent } from "components/SideNav";

export const WrapperDocumentation = ({ children }) => {
  const DocSections = React.Children.toArray(children).reduce(
    consolidateToSection(),
    [],
  );

  return DocSections.map((docSection, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Section key={index}>
      {docSection.length > 0 ? (
        <TrackedContent
          identifier={slugify(
            loopAndExtractString(docSection[0].props.children),
          )}
        >
          {docSection}
        </TrackedContent>
      ) : (
        docSection
      )}
    </Section>
  ));
};
WrapperDocumentation.propTypes = {
  children: PropTypes.node.isRequired,
};
