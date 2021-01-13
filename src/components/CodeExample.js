import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { BasicButton } from "basics/Buttons";
import { CopyIcon, ExternalLinkIcon } from "basics/Icons";
import { Code } from "basics/Text";

import { PALETTE, FONT_FAMILY, FONT_WEIGHT } from "constants/styles";

import { getCookie } from "helpers/getCookie";
import { extractStringChildren } from "helpers/extractStringChildren";
import { useHighlighting } from "helpers/useHighlighting";

import { Link } from "basics/Links";
import { Select } from "basics/Inputs";

import { Tooltip } from "components/Tooltip";

const CODE_LANG_CHANGE_EVENT = "codeLangChange";

const CODE_LANGS = {
  bash: "bash",
  cpp: "C++",
  curl: "cURL",
  go: "Go",
  html: "html",
  java: "Java",
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

const OptionsContainerEl = styled.div`
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

const CopyButtonEl = styled(BasicButton).attrs({
  "aria-label": "Copy snippet",
})`
  padding: 0.75rem 1rem;
`;

const TitleEl = styled.div`
  display: flex;
  padding-left: 1rem;
  justify-content: ${(props) =>
    props.hasTitle ? "space-between" : "flex-end"};
  position: relative;
  align-items: center;
  color: ${PALETTE.white};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem;
  font-weight: ${FONT_WEIGHT.bold};
`;

const DividerEl = styled.span`
  display: inline-block;
  width: 0.0625rem;
  height: 1.5rem;
  margin-left: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
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

  const contentsRef = React.useRef();
  useHighlighting(contentsRef);

  const codeSnippetsArr = React.Children.toArray(codeSnippets);
  const selectedSnippet =
    codeSnippetsArr.find(
      (snippet) => snippet.props["data-language"] === activeLang,
    ) || codeSnippetsArr[0];
  const SelectedSnippetStr = mdxJsxToString(selectedSnippet);

  const onChange = React.useCallback((e) => {
    const { value } = e.target;
    document.cookie = `lang=${value}`;

    document.dispatchEvent(
      new CustomEvent(CODE_LANG_CHANGE_EVENT, {
        detail: {
          lang: value,
        },
      }),
    );
  }, []);

  const onLangChangeEvent = (e) => {
    setActiveLang(e.detail.lang);
  };

  React.useEffect(() => {
    document.addEventListener(CODE_LANG_CHANGE_EVENT, onLangChangeEvent);

    return document.removeEventListener(
      CODE_LANG_CHANGE_EVENT,
      onLangChangeEvent,
      true,
    );
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
        <OptionsContainerEl>
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
          <Tooltip message={isCopied ? "Copied" : "Click to copy"}>
            <CopyToClipboard
              text={SelectedSnippetStr}
              onCopy={() => !isCopied && setCopy(true)}
            >
              <CopyButtonEl>
                <CopyIcon />
              </CopyButtonEl>
            </CopyToClipboard>
          </Tooltip>

          {href && (
            <Link href={href} newTab>
              <ExternalLinkIcon />
            </Link>
          )}
        </OptionsContainerEl>
      </TitleEl>
      <ContentEl className="line-numbers" ref={contentsRef}>
        {selectedSnippet}
      </ContentEl>
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
