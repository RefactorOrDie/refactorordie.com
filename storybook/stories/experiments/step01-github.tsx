import React, { useState, useEffect } from "react";

import { request } from "graphql-request";
import { changeValue } from "../utils";
import { github } from "./github";

type GithubRepo = {
  "nameWithOwner": string,
}

export function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    github(
      `query($limit:Int!, $query:String!) {
      search(query: $query, type:REPOSITORY, first: $limit){
        nodes {
          __typename ... on Repository {
            nameWithOwner
          }
        }
        repositoryCount
      }
    }
    `,
      {
        limit: 30,
        query: search
      }
    ).then(res => {
      setSearchResults(res.search.nodes);
      setIsLoading(false);
    });
  }, [search]);

  return (
    <div className="container" style={{ maxWidth: "30em" }}>
      <input
        type="text"
        className="form-control"
        value={search}
        onChange={changeValue(setSearch)}
      />
      {isLoading ? (
        "Loading..."
      ) : (
        <ul>
          {searchResults.map(result => (
            <li>
              <pre>{result.nameWithOwner}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
