import robotsParser from "robots-parser";
import { getRobotsUrl, isValidUrl } from "./url";
import bots from "../data/bots.json";

export const analyse = async (analysisUrl: string) => {
  let formattedUrl = analysisUrl;

  if (!/^https?:\/\//i.test(analysisUrl)) {
    formattedUrl = "https://" + analysisUrl;
  }

  if (!isValidUrl(formattedUrl)) {
    throw "OH NO - not formatted";
  }

  try {
    const resp = await fetch(getRobotsUrl(formattedUrl));

    if (resp.status !== 200) {
      throw "Failed to fetch robots.txt file";
    }
    const robotsTxtRaw = await resp.text();

    const robots = robotsParser(formattedUrl, robotsTxtRaw);

    const results = bots.map((bot) => ({
      ...bot,
      allowed: robots.isAllowed(formattedUrl, bot.name),
    }));

    return {
      title: "Analysis of " + formattedUrl,
      url: formattedUrl,
      isCrawlableByAi:
        results.findIndex((result) => result.allowed === true) !== -1,
      results,
    };
  } catch {
    throw "THERE WAS AN ERROR PARSING ";
  }
};
