import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ExternalLinkIcon from "assets/icons/icon-external-link.svg";
import CopyIcon from "assets/icons/icon-copy.svg";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";
import { PrismStyles } from "basics/Prism";
import { Link } from "basics/Links";
import { Select } from "basics/Inputs";
import { getCookie, extractStringChildren } from "utils";

import { Tooltip } from "components/Tooltip";
import { DividerEl } from "components/Documentation/SharedStyles";

const CODE_LANGS = {
  curl: "cURL",
  go: "Go",
  javascript: "JAVASCRIPT",
  java: "Java",
};

const LangSelect = styled(Select)`
  width: 100%;
  display: inline-block;
  margin: 0;

  select {
    display: inline-block;
    border: none;
    background: transparent;
    color: ${PALETTE.white};
    margin: calc(1rem - 1px);
    padding: 0;
    height: 1rem;
    font-family: ${FONT_FAMILY.monospace};
    font-weight: 500;
    font-size: 0.75rem;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const MethodContentEl = styled.div`
  position: relative;
  border-radius: 4px;
`;

const ContentEl = styled.div`
  padding: 1rem;
  overflow: auto;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CodeExampleEl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  div {
    background: #292d3e;
  }

  thead {
    display: none;
  }

  td {
    border: none;
    padding: 0.5rem 0;

    &:first-child {
      color: ${PALETTE.purple};
      font-weight: ${FONT_WEIGHT.bold};
      padding-right: 1rem;
    }
  }
`;

const CopyIconWrapper = styled.div`
  display: block;
  position: relative;
  cursor: pointer;
`;

const TitleEl = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 1rem;
  align-items: center;
  color: ${PALETTE.white};
  border-bottom: 1px solid ${PALETTE.white60};
  font-size: 0.875rem;
  font-weight: ${FONT_WEIGHT.bold};
`;

const mdxJsxToString = (jsx) => {
  const { props } = jsx;
  const { children } = props;
  let str;

  if (children.props.children.length > 0) {
    str = children.props.children[0].props.children.map((codeSnippet) =>
      extractStringChildren(codeSnippet),
    );
  }

  return str.join("");
};

const CodeSnippet = ({ codeSnippets, title, href }) => {
  const SelectRef = React.createRef(null);
  const availableLangs = React.Children.map(
    codeSnippets,
    (eachLang) => eachLang.props["data-language"],
  );
  const [activeLang, setActiveLang] = React.useState("");
  const [isCopied, setCopy] = React.useState(false);
  const [isHovered, setHover] = React.useState(false);
  const [dimension, setDimension] = React.useState({ right: 0, top: 0 });

  const codeSnippetsArr = React.Children.toArray(codeSnippets);
  const selectedSnippet =
    codeSnippetsArr.find(
      (snippet) => snippet.props["data-language"] === activeLang,
    ) || codeSnippetsArr[0];
  const SelectedSnippetStr = mdxJsxToString(selectedSnippet);

  const CopyToClipboardRef = React.useCallback((node) => {
    if (node !== null) {
      setDimension({
        right: Math.floor(node.getBoundingClientRect().right),
        top: Math.floor(node.getBoundingClientRect().top),
      });
    }
  }, []);

  const onChange = React.useCallback((e) => {
    const { value } = e.target;
    document.cookie = `lang=${value}`;
    navigate(`?lang=${value}`, {
      replace: true,
    });
    setActiveLang(value);
  }, []);

  React.useEffect(() => {
    const langCookie = getCookie("lang");
    let timer;
    if (langCookie) {
      setActiveLang(langCookie);
    } else {
      setActiveLang(availableLangs[0]);
    }

    if (isCopied) {
      timer = setTimeout(() => {
        setCopy(false);
      }, 6000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [availableLangs, isCopied]);

  return (
    <MethodContentEl>
      <TitleEl>
        {title}
        <OptionsContainer>
          <LangSelect
            ref={SelectRef}
            onChange={onChange}
            name="langSelect"
            label=""
            value={activeLang}
          >
            {availableLangs.map((langValue) => (
              <option key={langValue} value={langValue}>
                {CODE_LANGS[langValue]}
              </option>
            ))}
          </LangSelect>
          <DividerEl color="rgba(255, 255, 255, 0.1)" />
          <CopyToClipboard
            text={SelectedSnippetStr && SelectedSnippetStr}
            onCopy={() => {
              setCopy((x) => !x);
            }}
          >
            <CopyIconWrapper
              ref={CopyToClipboardRef}
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              <CopyIcon />
            </CopyIconWrapper>
          </CopyToClipboard>

          {href && (
            <Link href={href} newTab>
              <ExternalLinkIcon />
            </Link>
          )}
        </OptionsContainer>
      </TitleEl>
      <ContentEl>
        <PrismStyles isCodeSnippet />
        {selectedSnippet}
      </ContentEl>
      <Tooltip in={isHovered} isCopied={isCopied} parentDimension={dimension}>
        {isCopied ? "Copied" : "Click to copy"}
      </Tooltip>
    </MethodContentEl>
  );
};

CodeSnippet.propTypes = {
  codeSnippets: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  href: PropTypes.string,
};

/**
 * Note: This exports a React component instead of a styled-component.
 * [Design Mockup](https://zpl.io/V1DGqJ5)
 */

export const CodeExample = React.forwardRef(function CodeExample(
  { title, children, href, ...props },
  ref,
) {
  return (
    <CodeExampleEl ref={ref} {...props}>
      <CodeSnippet codeSnippets={children} title={title} href={href} />
    </CodeExampleEl>
  );
});

CodeExample.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
};
