import React, { useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import { changeValue } from "../utils";
import { searchGifs, Gif } from "./giphy";
import { WheelOfFortune } from "./WheelOfFortune";

export function App() {
  const [search, setSearch] = useState("welcomes");
  const [searchResults, setSearchResults] = useState<Gif[]>([]);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      searchGifs(search).then(gifs => {
        setSearchResults(gifs);
        setSearchResultsLoading(false);
      });
    }, 2000);
    setSearchResultsLoading(true);
  }, [search]);

  return (
    <div className="container">
      <h1>Super Giphy Search</h1>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">🔍📼</span>
        </div>
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "30em" }}
          value={search}
          onChange={changeValue(setSearch)}
        />
      </div>
      <br/>
      {searchResultsLoading ? (
        <WheelOfFortune />
      ) : searchResults.length > 0 ? (
        <Gallery photos={searchResults} margin={2} />
      ) : (
        <>
          <h2>Nothing found...</h2>
          <img
            src="https://media2.giphy.com/media/gQzoxR4vrBYg8/giphy.gif?cid=790b76119af7dbfb7c0136cdca75cead3a026176c00e7453&rid=giphy.gif"
            alt="Spilled milk"
          />
        </>
      )}
    </div>
  );
}
