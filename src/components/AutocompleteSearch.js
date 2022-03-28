import React from "react";
import PropTypes from "prop-types";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch/lite";
import styled from "styled-components";
import "@algolia/autocomplete-theme-classic";

import {
  AUTOCOMPLETE_APP_ID,
  AUTOCOMPLETE_API_KEY,
  AUTOCOMPLETE_INDEX_NAME,
  AUTOCOMPLETE_SUGGESTIONS_INDEX_NAME,
} from "constants/config";
import { MEDIA_QUERIES } from "constants/styles";

import { Autocomplete } from "./Autocomplete/Autocomplete";
import { Item } from "./Autocomplete/Item";

const searchClient = algoliasearch(AUTOCOMPLETE_APP_ID, AUTOCOMPLETE_API_KEY);

const SearchContainerEl = styled.form`
  height: 5rem;
  display: flex;
  align-items: center;

  @media (${MEDIA_QUERIES.ltLaptop}) {
    width: 100%;
    height: auto;
    margin-top: 6.5rem;
    border-bottom: none;
  }
`;

export const AutocompleteSearch = () => (
  <SearchContainerEl>
    <Autocomplete
      defaultActiveItemId={0}
      placeholder="Search"
      detachedMediaQuery="none"
      getSources={() => [
        {
          sourceId: "hits",
          getItems({ query }) {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: AUTOCOMPLETE_INDEX_NAME,
                  query,
                  params: {
                    hitsPerPage: 15,
                  },
                },
              ],
            });
          },
          getItemUrl({ item }) {
            return item.url;
          },
          onActive({ item, setContext }) {
            setContext({ preview: item });
          },
          templates: {
            item({ item, components }) {
              return <Item hit={item} components={components} />;
            },
          },
        },
        {
          sourceId: "suggestions",
          getItems({ query }) {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: AUTOCOMPLETE_SUGGESTIONS_INDEX_NAME,
                  query,
                  params: {
                    hitsPerPage: 4,
                  },
                },
              ],
            });
          },
          onSelect({ item, setQuery, setIsOpen, refresh }) {
            setQuery(`${item.query} `);
            setIsOpen(true);
            refresh();
          },
          templates: {
            header({ items, Fragment }) {
              if (items.length === 0) {
                return null;
              }
              return (
                <Fragment>
                  <div>
                    <span className="aa-SourceHeaderTitle">
                      Not finding what you‘re looking for? Try one of these
                      queries instead:
                    </span>
                  </div>
                </Fragment>
              );
            },
            item({ item, components }) {
              return (
                <button className="aa-QuerySuggestion">
                  <components.ReverseHighlight
                    hit={item}
                    attribute="query"
                    cl
                  />
                </button>
              );
            },
          },
        },
      ]}
    />
  </SearchContainerEl>
);
