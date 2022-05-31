import { autocomplete } from "@algolia/autocomplete-js";
import React, { createElement, Fragment, useEffect, useRef } from "react";
import { render } from "react-dom";

import { ListItemPreview } from "./ListItemPreview";
import { TableItemPreview } from "./TableItemPreview";
import { QuoteItemPreview } from "./QuoteItemPreview";
import { ContentPreview } from "./ContentPreview";
import { CodeBlockPreview } from "./CodeBlockPreview";

export function Autocomplete(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      debug: true,
      renderer: { createElement, Fragment },
      renderNoResults({ state }, root) {
        render(
          <div className="aa-NoResults">
            <p>
              No results for <strong>"{state.query}"</strong>.
            </p>
          </div>,
          root,
        );
      },
      render({ children, state, components }, root) {
        const { preview } = state.context;
        render(
          <div className="aa-Grid">
            <div className="aa-Results aa-Column">{children}</div>
            <div className="aa-Preview aa-Column">
              {preview && children && (
                <div className="aa-PreviewSection">
                  <div className="aa-PreviewSectionContent">
                    <div className="aa-PreviewBreadcrumb">
                      <span>
                        {preview.urlSegments.level1}{" "}
                        {preview.urlSegments.level2 &&
                          `> ${preview.urlSegments.level2}`}
                      </span>
                    </div>
                    <div className="aa-TitlePreview">
                      <a href={preview.url}>
                        <h1>
                          <components.Highlight
                            hit={preview}
                            attribute="title"
                          />
                        </h1>
                      </a>
                    </div>
                    <div className="aa-ContentPreview">
                      {preview.schema === "LIST_ITEM" && (
                        <ListItemPreview
                          preview={preview}
                          components={components}
                        />
                      )}
                      {preview.schema === "TABLE_ITEM" &&
                        preview.tableAttributes &&
                        preview.tableAttributes.headers.length > 0 && (
                          <TableItemPreview
                            preview={preview}
                            components={components}
                          />
                        )}
                      {preview.schema === "QUOTE" && (
                        <QuoteItemPreview
                          preview={preview}
                          components={components}
                        />
                      )}
                      {preview.schema.startsWith("PARAGRAPH") && (
                        <ContentPreview
                          preview={preview}
                          components={components}
                        />
                      )}
                    </div>
                    {preview.schema === "PARAGRAPH_WITH_CODE" && (
                      <CodeBlockPreview />
                    )}
                    {preview.pageOutlines.length > 0 && (
                      <div className="aa-Outline">
                        <h2 className="aa-OutlineTitle">On this page</h2>
                        <ol className="aa-OutlineList">
                          {preview.pageOutlines.map((pageOutline) => (
                            <li
                              key={pageOutline.url}
                              className="aa-OutlineLink"
                            >
                              <a href={pageOutline.url}>{pageOutline.title}</a>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>,
          root,
        );
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div className="aa-AutocompleteSearchbar" ref={containerRef} />;
}
