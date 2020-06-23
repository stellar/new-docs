import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FONT_WEIGHT, MEDIA_QUERIES, PALETTE } from "constants/styles";

import { BasicImage } from "basics/Images";
import { Link } from "basics/Links";
import { Mermaid } from "basics/Mermaid";
import * as TextComponents from "basics/Text";

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

export const components = {
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
  h3: styled(TextComponents.H3)`
    a {
      color: ${({ theme }) => theme.text};
      @media (${MEDIA_QUERIES.canHover}) {
        &:hover {
          color: ${({ theme }) => theme.darkGrey};
        }
      }
    }
  `,
  h4: styled(TextComponents.H4)`
    color: ${PALETTE.darkGrey};
    font-weight: ${FONT_WEIGHT.medium};
    font-size: 1.125rem;
    line-height: 1.5;
  `,
  h5: TextComponents.H5,
  h6: TextComponents.H6,
  blockquote: TextComponents.Quote,
  ul: TextComponents.List,
  ol: TextComponents.OrderedList,
  li: ListItem,
  table: TextComponents.Table,
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
