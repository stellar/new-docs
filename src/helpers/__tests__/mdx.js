import { extractTextFromAst, normalizeMdx } from "../mdx";
import { mdxAsts, mdxNodes } from "./fixtures/mdx";

describe("extractTextFromAst", () => {
  it("extracts text without headers", () => {
    expect(extractTextFromAst(mdxAsts.basic)).toBe(
      "Horizon is an API for interacting with the Stellar network. This API serves the bridge between apps and stellar-core. Projects like wallets, decentralized exchanges, and asset issuers use Horizon to submit transactions, query an account balance, or stream events like transactions to an account. Horizon is a RESTful API and can be accessed via cURL, a browser, or one of the Stellar SDKs. To reduce the complexity of your project, we recommend you use an SDK instead of making direct API calls. The Stellar Development Foundation (SDF) runs two instances of Horizon: https://horizon.stellar.org/ for interacting with the public network https://horizon-testnet.stellar.org/ for interacting with the testnet",
    );
  });
});

describe("normalizeMdx", () => {
  it("converts nodes", () => {
    expect(normalizeMdx(mdxNodes.basic)).toMatchObject({
      id: expect.any(String),
      order: expect.any(Number),
      title: expect.any(String),
      githubLink: expect.any(String),
      body: expect.any(String),
      directory: expect.any(String),
      currentDirectory: expect.any(String),
      folder: {
        order: expect.any(Number),
        title: expect.any(String),
      },
    });
  });
  it("gracefully fails on missing fields", () => {
    expect(normalizeMdx(mdxNodes.empty)).toMatchObject({
      id: undefined,
      order: undefined,
      title: undefined,
      githubLink: undefined,
      body: undefined,
      directory: undefined,
      currentDirectory: undefined,
      folder: {
        order: undefined,
        title: undefined,
      },
    });
  });
});
