import "dotenv/config";
interface OpenGraphResponse {
  hybridGraph: {
    title: string;
    description: string;
    url: string;
    favicon?: string | null;
    image?: string | null;
  };

  error?: {
    code?: number;
  };
}

const apiKey = process.env.OPENGRAPH_API_KEY;

export const getOgData= async (url: string) => {
  const encodedUrl = encodeURIComponent(url);

  const res = await fetch(
    `https://opengraph.io/api/1.1/site/${encodedUrl}?app_id=${apiKey}`,
  );
  const data = (await res.json()) as OpenGraphResponse;
  console.log(data);
  if (data.error?.code === 102) return null

  return data.hybridGraph
};
