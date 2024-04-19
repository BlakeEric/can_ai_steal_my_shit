const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9():%_\+.~#?&//=]*)/;

export const isValidUrl = (urlString: string) => URL_REGEX.test(urlString);

export const getFormattedUrlString = (urlString: string) => {
  if (!/^https?:\/\//i.test(urlString)) {
    return "https://" + urlString;
  }

  return urlString;
};

export const validateUrlString = (formattedUrlString: string) => {
  if (!isValidUrl(formattedUrlString)) {
    throw new Error("Invalid URL");
  }
};

export const getRobotsUrl = (urlString: string) => {
  const urlObj = new URL(urlString);
  if (!urlObj.origin) {
    throw new Error();
  }
  return urlObj.origin + "/robots.txt";
};
