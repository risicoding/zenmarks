import "dotenv/config";
interface OpenGraphResponse {
  hybridGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  error: {
    code: number;
  };
}

const apiKey = process.env.OPENGRAPH_API_KEY;

export const scrapeTitle = async (url: string) => {
  const encodedUrl = encodeURIComponent(url);

  const res = await fetch(
    `https://opengraph.io/api/1.1/site/${encodedUrl}?app_id=${apiKey}`,
  );
  const data = (await res.json()) as OpenGraphResponse;
  if (data.error.code === 102) return url;

  return data.hybridGraph.title;
};
