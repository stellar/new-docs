# Stellar docs

## Structure

`yarn start` to start local development.

`src/` contains all documentation, API reference sections, and web assets
(images, videos, pdfs) needed for the docs. Each page is authored as an
`index.mdx` document.

Each folder must have a `metadata.json` file with 3 keys:

```json
{
  "url": "url-segment",
  "order": 0,
  "title": "Display Name in Nav"
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

The build has been dockerized so we can host with nginx on Kubernetes.

To build and run locally:

```sh
docker image build -t new-docs:0.0 .
docker run -p 8000:80 new-docs:0.0
```
