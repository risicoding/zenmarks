import "dotenv/config";
interface OpenGraphResponse {
  hybridGraph: {
    title: string;
    description: string;
    url: string;
  };
}

const apiKey = process.env.OPENGRAPH_API_KEY;

export const scrapeTitle = async (url: string) => {
  const encodedUrl = encodeURIComponent(url);

  const res = await fetch(
    `https://opengraph.io/api/1.1/site/${encodedUrl}?app_id=${apiKey}`,
  );
  const data = (await res.json()) as OpenGraphResponse;
  if (data.hybridGraph.title) {
    return data.hybridGraph.title;
  }
  return null;
};
