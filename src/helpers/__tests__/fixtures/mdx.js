export const mdxAsts = {};
mdxAsts.basic = {
  type: "root",
  children: [
    {
      type: "import",
      value: 'import { NavTable } from "components/NavTable";',
      position: {},
    },
    {
      type: "heading",
      depth: 1,
      children: [
        {
          type: "text",
          value: "Errant H1 Tag",
          position: {},
        },
      ],
      position: {},
    },
    {
      type: "heading",
      depth: 2,
      children: [
        {
          type: "text",
          value: "H2 Tag that Follows an H1",
          position: {},
        },
      ],
      position: {},
    },
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          value: "Horizon is an API for interacting with the Stellar network.",
          position: {},
        },
      ],
      position: {},
    },
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          value: "This API serves the bridge between apps and ",
          position: {},
        },
        {
          type: "link",
          title: null,
          url: "../../docs/glossary/stellar-core.mdx",
          children: [
            {
              type: "text",
              value: "stellar-core",
              position: {},
            },
          ],
          position: {},
        },
        {
          type: "text",
          value:
            ". Projects like wallets, decentralized exchanges, and asset issuers use Horizon to submit transactions, query an account balance, or stream events like transactions to an account.",
          position: {},
        },
      ],
      position: {},
    },
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          value: "Horizon is a ",
          position: {},
        },
        {
          type: "link",
          title: null,
          url: "https://en.wikipedia.org/wiki/Representational_state_transfer",
          children: [
            {
              type: "text",
              value: "RESTful API",
              position: {},
            },
          ],
          position: {},
        },
        {
          type: "text",
          value: " and can be accessed via cURL, a browser, or one of the ",
          position: {},
        },
        {
          type: "link",
          title: null,
          url: "../../docs/software-and-sdks/overview.mdx",
          children: [
            {
              type: "text",
              value: "Stellar SDKs",
              position: {},
            },
          ],
          position: {},
        },
        {
          type: "text",
          value:
            ". To reduce the complexity of your project, we recommend you use an SDK instead of making direct API calls.",
          position: {},
        },
      ],
      position: {},
    },
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          value:
            "The Stellar Development Foundation (SDF) runs two instances of Horizon:",
          position: {},
        },
      ],
      position: {},
    },
    {
      type: "list",
      ordered: false,
      start: null,
      spread: false,
      children: [
        {
          type: "listItem",
          spread: false,
          checked: null,
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "link",
                  title: null,
                  url: "https://horizon.stellar.org/",
                  children: [
                    {
                      type: "text",
                      value: "https://horizon.stellar.org/",
                      position: {},
                    },
                  ],
                  position: {},
                },
                {
                  type: "text",
                  value: " for interacting with the public network",
                  position: {},
                },
              ],
              position: {},
            },
          ],
          position: {},
        },
        {
          type: "listItem",
          spread: false,
          checked: null,
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "link",
                  title: null,
                  url: "https://horizon-testnet.stellar.org/",
                  children: [
                    {
                      type: "text",
                      value: "https://horizon-testnet.stellar.org/",
                      position: {},
                    },
                  ],
                  position: {},
                },
                {
                  type: "text",
                  value: " for interacting with the ",
                  position: {},
                },
                {
                  type: "link",
                  title: null,
                  url: "../../docs/glossary/testnet.mdx",
                  children: [
                    {
                      type: "text",
                      value: "testnet",
                      position: {},
                    },
                  ],
                  position: {},
                },
              ],
              position: {},
            },
          ],
          position: {},
        },
      ],
      position: {},
    },
    {
      type: "export",
      value:
        'export const _frontmatter = {"title":"Horizon API Reference","order":0}',
      position: {},
    },
  ],
  position: {},
};

export const mdxNodes = {
  basic: {
    id: "4e754fbc-ac44-5769-920c-7c1a1faf4af0",
    frontmatter: {
      title: "Literally a title",
      order: 0,
    },
    body: "some long body string",
    parent: {
      relativePath: "some/path/index.mdx",
      relativeDirectory: "some/path",
      fields: {
        metadata: {
          data: {
            order: 10,
            title: "Folder title",
          },
        },
      },
    },
  },
  empty: {},
};
