import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled, { css } from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Helmet from "react-helmet";

import {
  CSS_TRANSITION_SPEED,
  FONT_WEIGHT,
  DEFAULT_COLUMN_WIDTH,
  PALETTE,
  MEDIA_QUERIES,
} from "constants/styles";
import { components } from "constants/docsComponentMapping";
import { docType } from "constants/docType";
import { DOM_TARGETS } from "constants/domNodes";
import { LINK_DESTINATIONS } from "constants/routes";

import { sortReference } from "helpers/sortReference";
import { groupByCategory } from "helpers/documentation";
import { makeLinkedHeader } from "helpers/makeLinkedHeader";
import { normalizeMdx } from "helpers/mdx";
import {
  buildPathFromFile,
  resolveRelativeUrl,
  getLinkTarget,
} from "helpers/routes";
import { useMatchMedia } from "helpers/useMatchMedia";

import { Column } from "basics/Grid";
import { H1, H2, H3, H4, H5, H6, HorizontalRule } from "basics/Text";
import { ArrowIcon, EditIcon } from "basics/Icons";
import { Link } from "basics/Links";
import { PrismStyles } from "basics/Prism";

import { BetaNotice } from "components/BetaNotice";
import { Footer } from "components/Documentation/Footer";
import { LayoutBase } from "components/layout/LayoutBase";
import {
  AbsoluteNavFooterEl,
  NavAbsoluteEl,
  SideNavContainer,
  NavLogo,
  SideNavBackground,
} from "components/Navigation/SharedStyles";
import { SideNavBody, TrackedContent } from "components/SideNav";
import {
  ScrollRouter,
  Context as ScrollRouterContext,
} from "components/ApiRefRouting/ScrollRouter";
import { Route, SectionPathContext } from "components/ApiRefRouting/Route";
import {
  ApiReferenceRow,
  ApiReferenceWrapper,
  NestedRow,
  SideNavColumn,
  CustomColumn,
} from "components/Documentation/SharedStyles";
import { Expansion } from "components/Expansion";

import DevelopersPreview from "assets/images/og_developers.jpg";

const NAV_BAR_HEIGHT = 89;
const FIXED_NAV_DISTANCE = 140 + NAV_BAR_HEIGHT;

const GreenTableCell = styled.td`
  color: ${PALETTE.lightGreen};
`;
const OrangeTableCell = styled.td`
  color: ${PALETTE.lightOrage};
`;
const SectionEl = styled.section`
  &:first-child {
    margin-top: 5rem;
  }
`;
const ExpansionContainerEl = styled.div`
  margin-top: 1rem;
  max-width: ${DEFAULT_COLUMN_WIDTH.leftColumn}rem;

  &:last-child {
    padding-bottom: 2.25rem;
  }
`;
const NavTitleEl = styled(H5)`
  margin: 0;
  line-height: normal;
  font-weight: ${FONT_WEIGHT.bold};
  text-transform: uppercase;
`;
const activeStyles = `
  color: ${PALETTE.purpleBlue};
  font-weight: ${FONT_WEIGHT.bold};
`;

const ApiRefH1 = styled(H1)`
  margin-top: 0.25rem;
  margin-bottom: 0;
`;
const ApiRefH2 = styled(H2)`
  padding-top: 0;
  margin-top: 0.25rem;
  margin-bottom: 0;
`;
const NavItemEl = styled.div`
  display: block;
  text-align: left;
  white-space: nowrap;
  font-size: ${(props) => (props.depth > 0 ? "0.875rem" : "1rem")};
  color: ${(props) => (props.depth === 0 ? PALETTE.black80 : PALETTE.black60)};
  padding: 0.25rem 0;
  padding-left: ${(props) => (props.depth > 1 ? `${props.depth - 1}rem` : 0)};
  transition: opacity ${CSS_TRANSITION_SPEED.default} ease-out;
  font-weight: ${FONT_WEIGHT.normal};

  ${(props) =>
    props.isActive
      ? css`
          ${activeStyles}
        `
      : ""}
`;

const StyledLink = components.a;

const DocsLink = ({ href, ...props }) => {
  const originalPath = React.useContext(SectionPathContext);
  const { onLinkClick } = React.useContext(ScrollRouterContext);
  const { url, destinationType } = React.useMemo(() => {
    let finalUrl = href;
    // Resolve relative links
    if (finalUrl.startsWith(".")) {
      finalUrl = resolveRelativeUrl(finalUrl, originalPath);
    }
    return {
      url: finalUrl,
      destinationType: getLinkTarget(finalUrl),
    };
  }, [href, originalPath]);

  switch (destinationType) {
    case LINK_DESTINATIONS.api:
      return (
        <StyledLink
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onLinkClick(url);
          }}
          href={url}
          {...props}
        />
      );
    case LINK_DESTINATIONS.docs:
    case LINK_DESTINATIONS.external:
    default:
      return <StyledLink href={url} {...props} />;
  }
};
DocsLink.propTypes = {
  href: PropTypes.string.isRequired,
};
const NavLinkEl = styled(DocsLink)`
  color: inherit;
  font-weight: unset;
  display: block;

  &:hover {
    color: ${PALETTE.lightGrey};
  }
`;

const isInViewport = (elem) => {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

// eslint-disable-next-line react/prop-types
const NavItem = ({ isActive, forwardedRef, children, depth }) => {
  const itemRef = React.useRef();
  const parentDom = forwardedRef;
  const { isScrollingDown } = React.useContext(ScrollRouterContext);
  const isMobile = useMatchMedia(`(${MEDIA_QUERIES.ltLaptop})`);

  React.useLayoutEffect(() => {
    if (isActive && parentDom && !isMobile) {
      const activeItemSize = itemRef.current.getBoundingClientRect();

      /* If the active navigation is not in view
      For cases when a user scrolled the nav to the point
      the active nav is out of viewport */
      if (!isInViewport(itemRef.current)) {
        itemRef.current.scrollIntoView();
      }

      /* If scroll direction is down and its active item's top value
       is bigger than FIXED_NAV_DISTANCE (229px), subtract that amount
       from scrollTop to keep the consistent top value
       Its top value gets inconsistent when it hits the separate dropdown category
      */
      if (isScrollingDown.current && activeItemSize.top > FIXED_NAV_DISTANCE) {
        if (activeItemSize.top > FIXED_NAV_DISTANCE) {
          /* Reset the distance between the active nav and its offset top */
          parentDom.current.scrollTop +=
            activeItemSize.top - FIXED_NAV_DISTANCE;
        } else {
          parentDom.current.scrollTop += activeItemSize.height;
        }
      } else if (
        !isScrollingDown.current &&
        activeItemSize.top < FIXED_NAV_DISTANCE
      ) {
        if (activeItemSize.top > FIXED_NAV_DISTANCE) {
          parentDom.current.scrollTop -=
            activeItemSize.top - FIXED_NAV_DISTANCE;
        } else {
          parentDom.current.scrollTop -= activeItemSize.height;
        }
      }
    }
  }, [isActive, parentDom, isScrollingDown, isMobile]);

  return (
    <NavItemEl isActive={isActive} depth={depth} ref={itemRef}>
      {children}
    </NavItemEl>
  );
};

// This is a function, not a component
const renderItem = ({
  /* eslint-disable react/prop-types */
  depth,
  id,
  isActive,
  title,
  forwardedRef,
  isFirstItem,
  /* eslint-disable react/prop-types */
}) => {
  /* There are cases when folder's index.mdx shares the same title as
    its metadata.json's title. We are preventing redundancy by replacing
    its sub navigation's title to "Overview" if its title is the same
    as its metadata.json's */
  const navTitle = isFirstItem ? "Overview" : title;
  return (
    <NavItem depth={depth} forwardedRef={forwardedRef} isActive={isActive}>
      <NavLinkEl href={id}>{navTitle}</NavLinkEl>
    </NavItem>
  );
};

const headerOptions = {
  treatIdAsHref: true,
  LinkComponent: DocsLink,
};

const ApiRefLinkedH1 = makeLinkedHeader(ApiRefH1, headerOptions);
const ApiRefLinkedH2 = makeLinkedHeader(ApiRefH2, headerOptions);

const componentMap = {
  ...components,
  a: DocsLink,
  wrapper: ApiReferenceWrapper,
  h1: styled(components.h1).attrs({ as: ApiRefLinkedH1 }),
  h2: styled(components.h2).attrs({ as: ApiRefLinkedH2 }),
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  // eslint-disable-next-line react/prop-types
  td: ({ children }) => {
    if (children === "GET") {
      return <GreenTableCell>{children}</GreenTableCell>;
    }
    if (children === "POST") {
      return <OrangeTableCell>{children}</OrangeTableCell>;
    }
    return <td>{children}</td>;
  },
};

const ReferenceSection = React.memo(
  ({ body, relativePath, title, githubLink }) => {
    const path = buildPathFromFile(relativePath);
    const splitRelativePath = relativePath.split("/");

    /* Check to see if a section is a nested item */
    const isNestedSection =
      relativePath.split("/").length > 3 &&
      splitRelativePath[splitRelativePath.length - 1] !== "index.mdx";

    const SectionHeader = isNestedSection ? (
      <ApiRefH2 id={path}>{title}</ApiRefH2>
    ) : (
      <ApiRefH1 id={path}>{title}</ApiRefH1>
    );

    return (
      <SectionEl>
        <Route originalFilePath={relativePath} path={path}>
          <TrackedContent identifier={path}>
            <NestedRow>
              {/* Hack to make it look appear as if we had a column-gap
              4rem in between <CustomColumn/> on a large screen (min-width: 1440px)
              skip the 1st column to use it as column-gap, start at the 2nd column and
              span through then next 8 columns (ends at column 9)
              */}
              <CustomColumn xs={9} xlColumn="2 / span 8">
                {SectionHeader}
                {githubLink && (
                  <Link href={githubLink} newTab>
                    <EditIcon color={PALETTE.purpleBlue} />
                  </Link>
                )}
              </CustomColumn>
            </NestedRow>
            <NestedRow>
              <MDXRenderer>{body}</MDXRenderer>
            </NestedRow>
            <HorizontalRule />
          </TrackedContent>
        </Route>
      </SectionEl>
    );
  },
);

ReferenceSection.propTypes = {
  body: PropTypes.node.isRequired,
  relativePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  githubLink: PropTypes.string,
};

// eslint-disable-next-line react/no-multi-comp
const ApiReference = React.memo(function ApiReference({ data, pageContext }) {
  const referenceDocs = sortReference(
    data.referenceDocs.edges.map(({ node }) => normalizeMdx(node)),
  );
  const sideNavRef = React.useRef();
  const docsBySubCategory = groupByCategory(referenceDocs);

  return (
    <ScrollRouter>
      <Helmet>
        {/* SEO optimization. For js-less visitors (i.e. some crawlers), redirect
        to the same URL but with only the relevant content. */}
        <noscript>
          {`<meta http-equiv="refresh" content="0;url=?javascript=false" />`}
        </noscript>
      </Helmet>
      <MDXProvider components={componentMap}>
        <LayoutBase
          previewImage={DevelopersPreview}
          title="Stellar API Reference"
          description="The complete API reference for the Stellar network. Includes descriptions of Horizon endpoints, network concepts, and example code for some languages."
          pageContext={pageContext}
          viewport="width=1366, initial-scale=.1"
        >
          <PrismStyles />
          <ApiReferenceRow>
            <SideNavColumn xs={3} lg={3} xl={4}>
              <NavLogo pageName={docType.api} />
              <SideNavBackground />
              <SideNavContainer>
                <NavAbsoluteEl ref={sideNavRef}>
                  {Object.entries(docsBySubCategory).map((nav, i) => (
                    <ExpansionContainerEl
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                    >
                      <Expansion
                        title={<NavTitleEl>{nav[0]}</NavTitleEl>}
                        expandedModeTitle={<NavTitleEl>{nav[0]}</NavTitleEl>}
                        collapseIcon={<ArrowIcon direction="up" />}
                        expandIcon={<ArrowIcon direction="down" />}
                        isDefaultExpanded={true}
                      >
                        <SideNavBody
                          items={nav[1]}
                          renderItem={renderItem}
                          forwardedRef={sideNavRef}
                        />
                      </Expansion>
                    </ExpansionContainerEl>
                  ))}
                </NavAbsoluteEl>
                <AbsoluteNavFooterEl>
                  <StyledLink href="/docs">Documentation</StyledLink>
                </AbsoluteNavFooterEl>
              </SideNavContainer>
            </SideNavColumn>
            <Column
              xs={9}
              xl={18}
              isIndependentScroll
              id={`${DOM_TARGETS.contentColumn}`}
            >
              <BetaNotice />
              {referenceDocs.map(({ body, id, parent, title, githubLink }) => (
                <ReferenceSection
                  relativePath={parent.relativePath}
                  key={id}
                  title={title}
                  githubLink={githubLink}
                  body={body}
                />
              ))}
              <Footer />
            </Column>
          </ApiReferenceRow>
        </LayoutBase>
      </MDXProvider>
    </ScrollRouter>
  );
});

ApiReference.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default ApiReference;

export const pageQuery = graphql`
  query ApiReferenceQuery($ids: [String]) {
    referenceDocs: allMdx(filter: { id: { in: $ids } }) {
      edges {
        node {
          ...ApiReferencePage
        }
      }
    }
  }
`;
