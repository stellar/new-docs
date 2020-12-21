import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FONT_WEIGHT, MEDIA_QUERIES, PALETTE } from "constants/styles";

import { makeLinkedHeader } from "helpers/makeLinkedHeader";

import { CheckmarkIcon } from "basics/Icons";
import { BasicImage } from "basics/Images";
import { Link } from "basics/Links";
import { Mermaid } from "basics/Mermaid";
import * as TextComponents from "basics/Text";

import { WrapperApiReference } from "components/WrapperApiReference";
import { WrapperDocumentation } from "components/WrapperDocumentation";

const ListItem = (props) => {
  const firstChild = React.Children.toArray(props.children)[0];

  // checking 'firstChild &&' because there are cases when a list is intentionally empty
  const hasCheckbox =
    firstChild && firstChild.props && firstChild.props.type === "checkbox";

  return <TextComponents.ListItem hasDot={!hasCheckbox} {...props} />;
};
ListItem.propTypes = {
  children: PropTypes.node.isRequired,
};

const Div = styled.div``;

const components = {
  // eslint-disable-next-line react/prop-types
  div: ({ children, className, ...props }) => {
    if (className === "mermaid") {
      return <Mermaid>{children}</Mermaid>;
    }
    return (
      <Div {...props} className={className}>
        {children}
      </Div>
    );
  },
  span: styled.span``,
  p: styled(TextComponents.Text)`
    font-size: 1rem;
    color: ${({ theme }) => theme.darkGrey};

    @media (${MEDIA_QUERIES.gtTablet}) {
      line-height: 1.75;
    }
  `,
  sub: styled.sub`
    bottom: -0.1875rem;
  `,
  sup: styled(TextComponents.Sup)`
    top: -0.375rem;
  `,
  h1: styled(TextComponents.H1)``,
  h2: styled(TextComponents.LinkedH2)`
    a {
      color: ${({ theme }) => theme.text};
      @media (${MEDIA_QUERIES.canHover}) {
        &:hover {
          color: ${({ theme }) => theme.darkGrey};
        }
      }
    }
  `,
  h3: styled(TextComponents.LinkedH3)`
    a {
      color: ${({ theme }) => theme.text};
      @media (${MEDIA_QUERIES.canHover}) {
        &:hover {
          color: ${({ theme }) => theme.darkGrey};
        }
      }
    }
  `,
  h4: styled(TextComponents.LinkedH4)`
    color: ${PALETTE.darkGrey};
    font-weight: ${FONT_WEIGHT.medium};
    font-size: 1.125rem;
    line-height: 1.5;

    a {
      color: ${({ theme }) => theme.text};
      @media (${MEDIA_QUERIES.canHover}) {
        &:hover {
          color: ${({ theme }) => theme.darkGrey};
        }
      }
    }
  `,
  h5: TextComponents.H5,
  h6: TextComponents.H6,
  blockquote: TextComponents.Quote,
  ul: TextComponents.List,
  ol: TextComponents.OrderedList,
  li: ListItem,
  section: TextComponents.Section,
  table: styled(TextComponents.Table)`
    margin: 1rem 0;
  `,
  thead: TextComponents.TableHead,
  th: TextComponents.TableHeadCell,
  tbody: TextComponents.TableBody,
  tr: TextComponents.TableRow,
  td: TextComponents.TableCell,
  pre: TextComponents.Preformatted,
  code: TextComponents.Code,
  inlineCode: styled(TextComponents.Code)`
    font-size: 0.875rem;
    font-weight: ${FONT_WEIGHT.bold};
  `,
  em: TextComponents.Italic,
  strong: TextComponents.Bold,
  delete: TextComponents.Strike,
  hr: TextComponents.HorizontalRule,
  a: styled(Link)`
    color: ${PALETTE.purple};
    &:hover {
      color: #1c0c62;
    }
  `,
  img: styled(BasicImage)`
    display: block;
    margin: 0 auto;
  `,
  iframe: styled.iframe``,
  script: () => null,
  br: styled.br``,
  small: TextComponents.Small,
};

/**
 * Template-specific overrides to these default styles
 */

const { td: TD } = components;

export const documentationComponents = {
  ...components,
  wrapper: WrapperDocumentation,
  // eslint-disable-next-line react/prop-types
  td: ({ children }) => {
    if (children === ":heavy_check_mark:") {
      return (
        <TD>
          <CheckmarkIcon />
        </TD>
      );
    }
    return <TD>{children}</TD>;
  },
};

const headerOptions = {
  treatIdAsHref: true,
  LinkComponent: Link,
};

const ApiRefH1 = styled(TextComponents.H1)`
  padding-top: 0.25rem;
  margin-top: 0;
  margin-bottom: 0;
`;
const ApiRefH2 = styled(TextComponents.H2)`
  padding-top: 0.25rem;
  margin-top: 0;
  margin-bottom: 0;
`;
const GreenTableCell = styled.td`
  color: ${PALETTE.lightGreen};
`;
const OrangeTableCell = styled.td`
  color: ${PALETTE.lightOrage};
`;

export const apiReferenceComponents = {
  ...components,
  wrapper: WrapperApiReference,
  h1: makeLinkedHeader(ApiRefH1, headerOptions),
  h2: makeLinkedHeader(ApiRefH2, headerOptions),
  h3: TextComponents.H3,
  h4: TextComponents.H4,
  h5: TextComponents.H5,
  h6: TextComponents.H6,
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
