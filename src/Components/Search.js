import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Delay the search request to avoid excessive API calls
    setTimeout(() => {
      handleSearch(value);
    }, 500); // Set an appropriate delay, like 500ms
  };

  const handleSearch = (query) => {
    onSearch(query).then((results) => {
      setSearchResults(results);
    });
  };

  useEffect(() => {
    // Clear search results when the search query is empty
    if (searchQuery === "") {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="search-section">
      <div className="search-input">
        <input
          className="search-box"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleChange}
        />
        <button className="btn-search" onClick={handleSearch}>
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="movies-section">
          {searchResults.map((result) => (
            <MovieCard
              key={result.id}
              title={result.name}
              image={result.image?.medium} // Use medium-sized image if available
              officialSiteUrl={result.url}
              rating={result.rating?.average}
              genres={result.genres?.join(" | ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
