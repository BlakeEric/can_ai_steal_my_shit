import robotsParser from "robots-parser";
import { getFormattedUrlString, getRobotsUrl, validateUrlString } from "./url";
import bots from "../data/bots.json";
import { fetchTxtRaw } from "./fetchTxtRaw";

export type ResponseData = {
  url: string;
  isCrawlableByAi: boolean;
  results: Array<(typeof bots)[number] & { allowed: boolean }>;
};

type SuccessResponse = {
  success: true;
  data: ResponseData;
  error?: never;
};

type ErrorResponse = {
  success: false;
  error: string;
  data?: never;
};

export const analyse = async (
  queryUrl: string
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const formattedUrlString = getFormattedUrlString(queryUrl);

    validateUrlString(formattedUrlString);

    const robotsTxtRaw = await fetchTxtRaw(getRobotsUrl(formattedUrlString));

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
      // TODO: send more detailed error info in response
      error: "Unable to fetch robots.txt data",
    };
  }
};
