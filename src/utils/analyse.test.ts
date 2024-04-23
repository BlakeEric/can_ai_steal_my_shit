import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import * as fetchTxtRawModule from "./fetchTxtRaw";
import { analyse } from "./analyse";

// Edit an assertion and save to see HMR in action
describe("analyse()", () => {
  beforeAll(() => {
    const fetchSpy = vi.spyOn(fetchTxtRawModule, "fetchTxtRaw");

    const mockAnalyse = async () => {
      return Promise.resolve(`
        User-agent: CCBot
        Disallow: /
      `);
    };

    fetchSpy.mockImplementation(mockAnalyse);
  });

  it("returns an error if the url is malformatted", async () => {
    const res = await analyse("notaurl");
    expect(res.success).toEqual(false);
    expect(res.error).toBeDefined();
  });

  it("adds protocol to the url if necessary", async () => {
    const res = await analyse("myurl.com/my/path");
    expect(res.success).toEqual(true);
    expect(res.data?.url).toBe("https://myurl.com/my/path");
  });

  it("generates correct results from raw robots.txt content", async () => {
    const res = await analyse("https://myurl.com");

    expect(res.success).toEqual(true);

    const blockedBots = res.data?.results.filter((result) => !result.allowed);

    expect(blockedBots).toHaveLength(1);
    expect(blockedBots?.[0].name).toEqual("CCBot");
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
