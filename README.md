# Stellar docs

## Structure

`yarn start` to start local development.

`src/` contains all documentation, API reference sections, and web assets
(images, videos, pdfs) needed for the docs. Each page is authored as an
`index.mdx` document.

Each folder must have a `metadata.json` file with 3 keys:

```json
{
  "order": 0,
  "title": "Display Name in Nav"
}
```

If we want to sort pages in an alphabetical order, add the following in the main
folder's `metadata.json`. The below example is for
[/glossary](https://github.com/stellar/new-docs/blob/master/content/docs/glossary/metadata.json)
page

```json
{
  "order": 60,
  "title": "Glossary",
  "sortMethod": "alphabetical"
}
```

Folders may be nested, which means that a final URL may be stitched together
from multiple metadata files.

```
src/
├── documentation/
│   ├── metadata.json
│   ├── index.mdx
│   └── walkthroughs/
│       ├── metadata.json
│       └── index.mdx
└── reference/
    ├── metadata.json
    ├── index.mdx
    └── horizon/
        ├── metadata.json
        └── index.mdx
```

## Local production build

The build has been dockerized so we can host with nginx on Kubernetes, which can
be compiled and run with `yarn` scripts. Make sure you have Docker set up on
your machine.

```sh
yarn production
# or
yarn prod:build
yarn prod:serve
```
