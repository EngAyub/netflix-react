import React from "react";

function MovieCard({ title, image, officialSiteUrl, rating, genres }) {
  return (
    <div className="movie-card">
      <div className="movie-image">
        <img src={image} alt={title} />
      </div>
      <h3 className="movie-heading">{title}</h3>
      {rating && <div className="movie-rating">⭐{rating || "N/A"}</div>}
      {genres && <h5 className="movie-genre">{genres}</h5>}
      {officialSiteUrl && (
        <a href={officialSiteUrl} className="official-site-button">
          Official Site
        </a>
      )}
    </div>
  );
}

export default MovieCard;
