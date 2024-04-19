// export const isValidUrl = (urlString: string) => URL_REGEX.test(urlString);

// export const getFormattedUrlString = (urlString: string) => {
//   if (!/^https?:\/\//i.test(urlString)) {
//     return "https://" + urlString;
//   }

//   return urlString;
// };

// export const validateUrlString = (formattedUrlString: string) => {
//   if (!isValidUrl(formattedUrlString)) {
//     throw new Error("Invalid URL");
//   }
// };

// export const getRobotsUrl = (urlString: string) => {
//   const urlObj = new URL(urlString);
//   if (!urlObj.origin) {
//     throw new Error();
//   }
//   return urlObj.origin + "/robots.txt";
// };

import { describe, expect, it } from "vitest";

import { getFormattedUrlString, getRobotsUrl, isValidUrl } from "./url";

describe("isValidUrl()", () => {
  it.each(["notaurl", "https://badurl,com", "https://noending"])(
    "returns false for %s",
    (url) => {
      expect(isValidUrl(url)).toBe(false);
    }
  );
  it.each(["http://www.myurl.com", "https://goodurl.com"])(
    "returns true for %s",
    (url) => {
      expect(isValidUrl(url)).toBe(true);
    }
  );
  it("works when there are numbers in the url", () => {
    const url = "https://mywebsite123.com";
    expect(isValidUrl(url)).toBe(true);
  });
  it("fails for email addresses", () => {
    const url = "email@gmail.com";
    expect(isValidUrl(url)).toBe(false);
  });
  it("fails for ftp", () => {
    const url = "ftp://server.com";
    expect(isValidUrl(url)).toBe(false);
  });
});

describe("getFormattedUrlString()", () => {
  const urlStr = "www.mywebsite.com";
  const urlStrHTTP = "http://www.mywebsite.com";
  const urlStrHTTPS = "https://www.mywebsite.com";

  it("adds HTTPS if no protocol exists", () => {
    expect(getFormattedUrlString(urlStr)).toEqual(urlStrHTTPS);
  });

  it("returns original string if protocol is present", () => {
    expect(getFormattedUrlString(urlStrHTTP)).toEqual(urlStrHTTP);
    expect(getFormattedUrlString(urlStrHTTPS)).toEqual(urlStrHTTPS);
  });
});

describe("getRobotsUrl()", () => {
  it("adds robots.txt to the end of the url", () => {
    const url = "https://www.mywebsite.com";
    expect(getRobotsUrl(url)).toBe("https://www.mywebsite.com/robots.txt");
  });

  it("works properly if there is already a trailing slash", () => {
    const url = "http://www.mywebsite.com/";
    expect(getRobotsUrl(url)).toBe("http://www.mywebsite.com/robots.txt");
  });

  it("works properly if there is already a multiple trailing slashes", () => {
    const url = "https://www.mywebsite.com//";
    expect(getRobotsUrl(url)).toBe("https://www.mywebsite.com/robots.txt");
  });

  it("works on sub-paths", () => {
    const url = "https://www.mywebsite.com/subpath/";
    expect(getRobotsUrl(url)).toBe("https://www.mywebsite.com/robots.txt");
  });
});
