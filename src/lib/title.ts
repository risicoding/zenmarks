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

  let title = "";

  const res = await fetch(
    `https://opengraph.io/api/1.1/site/${encodedUrl}?app_id=${apiKey}`,
  );
  const data = await res.json() as OpenGraphResponse;
  if (data.hybridGraph) {
    console.log("Title:", data.hybridGraph.title);
    title = data.hybridGraph.title;
  } else {
    console.log("Title not found in OpenGraph data");
  }

  return title;
};
