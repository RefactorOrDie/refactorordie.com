import React, { useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import { changeValue } from "../../utils";
import { searchGifs, Gif } from "../giphy";
import { WheelOfFortune } from "../WheelOfFortune";

function useGifSearcher(initialSearch: string) {
  const [search, setSearch] = useState(initialSearch);
  const [searchResults, setSearchResults] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      searchGifs(search).then(gifs => {
        setSearchResults(gifs);
        setIsLoading(false);
      });
    }, 2000);
    setIsLoading(true);
  }, [search]);

  return {
    search,
    setSearch,
    searchResults,
    isLoading
  };
}

export function App() {
  const { isLoading, searchResults, search, setSearch } = useGifSearcher('hello');

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
      <br />
      {isLoading ? (
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
