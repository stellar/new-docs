import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { MEDIA_QUERIES, PALETTE } from "constants/styles";

import { BasicImage } from "basics/Images";
import { Link } from "basics/Links";
import { Mermaid } from "basics/Mermaid";
import * as TextComponents from "basics/NewDocText";

const ListItem = (props) => {
  const firstChild = React.Children.toArray(props.children)[0];
  const hasCheckbox = firstChild.props && firstChild.props.type === "checkbox";

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
    line-height: 1.5;
    font-size: 1rem;
    color: ${({ theme }) => theme.darkGrey};

    @media (${MEDIA_QUERIES.gtTablet}) {
      line-height: 1.7;
    }
  `,
  sub: styled.sub`
    bottom: -0.1875rem;
  `,
  sup: styled(TextComponents.Sup)`
    top: -0.375rem;
  `,
  h1: styled(TextComponents.LinkedH1)`
    font-size: 2.5rem;
    margin-top: 4rem;
    margin-bottom: 0.5rem;
  `,
  h2: styled(TextComponents.LinkedH2)`
    font-size: 2.5rem;
    margin-bottom: 0.5rem;

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
    font-size: 1.5rem;
    padding: 0;
    margin: 0;
    margin-top: 1.22rem;

    a {
      color: ${({ theme }) => theme.text};
      @media (${MEDIA_QUERIES.canHover}) {
        &:hover {
          color: ${({ theme }) => theme.darkGrey};
        }
      }
    }
  `,
  h4: TextComponents.LinkedH4,
  h5: TextComponents.LinkedH5,
  h6: TextComponents.LinkedH6,
  blockquote: styled(TextComponents.Quote)`
    ::before {
      color: ${({ theme }) => theme.cta.body};
    }
  `,
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
  em: TextComponents.Italic,
  strong: TextComponents.Bold,
  delete: TextComponents.Strike,
  hr: TextComponents.HorizontalRule,
  a: styled(Link)`
    color: ${PALETTE.purple};
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

export default components;
