import { GraphQLClient } from "graphql-request";

export const GITHUB_ACCESS_TOKEN = `ffd2360e7e0aac17aab22e5213a99c6971d8e259`;

const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`
  }
});

export function github(query: string, vars?: any): Promise<any> {
  return client.request(query, vars);
}
