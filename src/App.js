import React, { useState } from "react";
import Header from "./Components/Header";
import Search from "./Components/Search";
import MovieCard from "./Components/MovieCard";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    return fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.map((item) => item.show)); // Extract the show data from the response
        return data.map((item) => item.show); // Return the show data to the Search component
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const dramaActionMysteryMovie = {
    id: 2,
    title: "Drama Action Mystery",
    image: "https://i.pinimg.com/originals/a2/34/75/a234753b69e3bd27b7f1d448956c38af.jpg",
    rating:   8.7,
    officialSiteUrl: "https://www.tvmaze.com/api",
  };

  return (
    <div className="App">
      <Header />
      <div className="main">
        <Search onSearch={handleSearch} />
        <div className="movies-section">
          <MovieCard
            key={dramaActionMysteryMovie.id}
            title={dramaActionMysteryMovie.title}
            image={dramaActionMysteryMovie.image}
            rating={dramaActionMysteryMovie.rating}
            officialSiteUrl={dramaActionMysteryMovie.officialSiteUrl}
          />
          {searchResults.map((result) => (
            <MovieCard
              key={result.id}
              title={result.name}
              image={result.image?.medium} // Use medium-sized image if available
              rating={result.rating?.average} // Use the film's rating if available
              officialSiteUrl={result.officialSite} // Use the official site URL if available
              genres={result.genres?.join(" | ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
