import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://localhost:4000/graphql");

export function giphy(query: string, vars?: any): Promise<any> {
  return client.request(query, vars);
}

export type Gif = {
  src: string;
  width: number;
  height: number;
};

export function searchGifs(query: string): Promise<Gif[]> {
  if (query.split(/\s+/g).length > 3) {
    return Promise.resolve([]);
  }

  return giphy(
    `
    query($query:String!) {
      gifs(query: $query) {
        gifsData {
          images{
            preview_gif {
              url
              width
              height
            }
          }
        }
      }
    }`,
    {
      query
    }
  ).then(({ gifs }) => {
    return gifs.gifsData
      .map(({ images }: any) => images.preview_gif)
      .map(({ url, width, height }: any) => ({
        src: url,
        width: Math.floor(Number(width)),
        height: Math.floor(Number(height))
      }));
  });
}
