import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ExternalLinkIcon from "assets/icons/icon-external-link.svg";
import CopyIcon from "assets/icons/icon-copy.svg";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";

import { getCookie } from "helpers/getCookie";
import { extractStringChildren } from "helpers/extractStringChildren";
import { useHighlighting } from "helpers/useHighlighting";

import { Link } from "basics/Links";
import { Select } from "basics/Inputs";

import { Tooltip } from "components/Tooltip";
import { DividerEl } from "components/Documentation/SharedStyles";
import { Code } from "basics/Text";

const CODE_LANGS = {
  bash: "bash",
  curl: "cURL",
  cpp: "C++",
  go: "Go",
  html: "html",
  java: "Java",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  python: "Python",
  scss: "SCSS",
  toml: "TOML",
  ts: "TypeScript",
  tsx: "TSX",
  yaml: "YAML",
};

const LangSelect = styled(Select)`
  width: 100%;
  display: inline-block;
  margin: 0;

  select {
    display: inline-block;
    margin: 0 1rem;
    padding: 0.5rem;
    font-size: 0.75rem;
    border: none;
    background: transparent;
    color: ${PALETTE.white};
    font-weight: 500;
  }
`;

const LangOptionEl = styled.div`
  font-family: ${FONT_FAMILY.monospace};
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.15;
`;

const OptionsContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const MethodContentEl = styled.div`
  position: relative;
  overflow: auto;
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
  & ${Code} {
    color: ${PALETTE.light};
  }
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
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
  justify-content: ${(props) =>
    props.hasTitle ? "space-between" : "flex-end"};
  position: relative;
  padding: 0.5rem 1rem;
  align-items: center;
  color: ${PALETTE.white};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem;
  font-weight: ${FONT_WEIGHT.bold};
`;

const mdxJsxToString = (jsx) => {
  const { props } = jsx;
  const { children } = props;
  let str;

  if (children.props.children.length > 0) {
    if (typeof children.props.children === "string") {
      str = children.props.children;
      return str;
    }
    str = children.props.children.map((codeSnippet) =>
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
  const [position, setPosition] = React.useState({ right: 0, top: 0 });

  const contentsRef = React.useRef();
  useHighlighting(contentsRef);

  const codeSnippetsArr = React.Children.toArray(codeSnippets);
  const selectedSnippet =
    codeSnippetsArr.find(
      (snippet) => snippet.props["data-language"] === activeLang,
    ) || codeSnippetsArr[0];
  const SelectedSnippetStr = mdxJsxToString(selectedSnippet);

  const CopyToClipboardRef = React.useCallback(
    (node) => {
      if (node !== null && isHovered) {
        setPosition({
          right: Math.floor(node.getBoundingClientRect().right),
          top: Math.floor(node.getBoundingClientRect().top),
        });
      }
    },
    [isHovered],
  );

  const onChange = React.useCallback((e) => {
    const { value } = e.target;
    document.cookie = `lang=${value}`;
    setActiveLang(value);
  }, []);

  React.useEffect(() => {
    const setHoverFalse = () => {
      if (isHovered) setHover(false);
    };

    /* Setting 'isHovered' to false while scrolling is necessary to
    prevent a tooltip to be displayed and its position to be scrolled
    together when a user scrolls while hovering on an icon */
    window.addEventListener("scroll", setHoverFalse);

    return () => {
      window.removeEventListener("scroll", setHoverFalse);
    };
  }, [isHovered]);

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
      <TitleEl hasTitle={title}>
        {title}
        <OptionsContainer>
          <LangOptionEl>
            {availableLangs.length > 1 ? (
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
            ) : (
              CODE_LANGS[availableLangs[0]]
            )}
          </LangOptionEl>
          <DividerEl />
          <CopyToClipboard
            text={SelectedSnippetStr && SelectedSnippetStr}
            onCopy={() => !isCopied && setCopy(true)}
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
      <ContentEl className="line-numbers" ref={contentsRef}>
        {selectedSnippet}
      </ContentEl>
      {isHovered && (
        <Tooltip in={isHovered} isCopied={isCopied} parentPosition={position}>
          {isCopied ? "Copied" : "Click to copy"}
        </Tooltip>
      )}
    </MethodContentEl>
  );
};

CodeSnippet.propTypes = {
  codeSnippets: PropTypes.node.isRequired,
  title: PropTypes.node,
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
  const codeSnippets = React.useMemo(
    () =>
      React.Children.map(children, (child) => {
        // The language is present in the css className under `language-xx`.
        // Swipe it, then put it on `data-language` like `CodeSnippet` expects.
        // If the code snippet has no language specified, there won't be a
        // className at all.
        const { className = "" } = child.props.children.props;
        const langClass =
          className.split(" ").find((x) => x.startsWith("language-")) || "";
        const lang = langClass.split("-")[1];
        return React.cloneElement(child, { "data-language": lang });
      }),
    [children],
  );

  return (
    <CodeExampleEl ref={ref} {...props}>
      <CodeSnippet codeSnippets={codeSnippets} title={title} href={href} />
    </CodeExampleEl>
  );
});

CodeExample.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
};
