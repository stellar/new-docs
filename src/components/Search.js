import React, { useEffect } from "react";
import styled from "styled-components";

import { PALETTE, MEDIA_QUERIES, CSS_TRANSITION_SPEED } from "constants/styles";

import SearchIcon from "assets/icons/icon-search.svg";

const SearchContainerEl = styled.form`
  height: 4.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${PALETTE.white60};

  @media (${MEDIA_QUERIES.ltLaptop}) {
    width: 100%;
    height: auto;
    margin-top: 6.5rem;
    border-bottom: none;
  }
`;

const SearchInputWrapperEl = styled.div`
  position: relative;
  width: 100%;

  svg {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    fill: #333333;
  }
`;

const SearchInputEl = styled.input`
  width: 100%;
  transition: border ${CSS_TRANSITION_SPEED.default} ease;
  color: ${PALETTE.black80};
  background: none;
  padding: 0.5rem 1rem;
  padding-left: 2rem;
  border: 1px solid ${PALETTE.white60};
  border-radius: 2px;
  line-height: 1.75;
  vertical-align: middle;

  ::placeholder {
    color: ${PALETTE.black80};
    font-size: 1rem;
  }

  :focus {
    outline-color: transparent;
    outline-style: none;
    border-color: ${PALETTE.purpleBlue};
  }
`;

export const Search = () => {
  useEffect(() => {
    window.docsearch({
      apiKey: "a90bee98943eff1ca1adfdaac1e434d8",
      indexName: "stellar",
      inputSelector: "#stellar-docsearch",
      debug: false,
    });
  }, []);

  return (
    <SearchContainerEl id="stellar-docsearch-form">
      <SearchInputWrapperEl>
        <SearchInputEl
          type="search"
          placeholder="Search"
          id="stellar-docsearch"
          spellCheck={false}
        />
        <SearchIcon />
      </SearchInputWrapperEl>
    </SearchContainerEl>
  );
};
