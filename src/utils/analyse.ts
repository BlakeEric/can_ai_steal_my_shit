import robotsParser from "robots-parser";
import { getFormattedUrlString, getRobotsUrl, validateUrlString } from "./url";
import bots from "../data/bots.json";

export type ResponseData = {
  url: string;
  isCrawlableByAi: boolean;
  results: Array<(typeof bots)[number] & { allowed: boolean }>;
};

type SuccessResponse = {
  success: true;
  data: ResponseData;
};

type ErrorResponse = {
  success: false;
  error: string;
};

const fetchRobotsTxtRaw = async (urlString: string) => {
  const resp = await fetch(getRobotsUrl(urlString));

  if (resp.status !== 200) {
    throw new Error("Failed to fetch robots.txt file");
  }

  return await resp.text();
};

export const analyse = async (
  queryUrl: string
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const formattedUrlString = getFormattedUrlString(queryUrl);

    validateUrlString(formattedUrlString);

    const robotsTxtRaw = await fetchRobotsTxtRaw(formattedUrlString);

    const robotsTxtData = robotsParser(formattedUrlString, robotsTxtRaw);

    const results = bots.map((bot) => ({
      ...bot,
      allowed: Boolean(robotsTxtData.isAllowed(formattedUrlString, bot.name)),
    }));

    return {
      success: true,
      data: {
        url: formattedUrlString,
        isCrawlableByAi:
          results.findIndex((result) => result.allowed === true) !== -1,
        results,
      },
    };
  } catch {
    return {
      success: false,
      error: "Unable to fetch robots.txt data",
    };
  }
};
