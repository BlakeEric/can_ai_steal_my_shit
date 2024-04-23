export const fetchTxtRaw = async (urlString: string) => {
  const resp = await fetch(urlString);

  if (resp.status !== 200) {
    throw new Error("Failed to fetch txt file");
  }

  return await resp.text();
};
