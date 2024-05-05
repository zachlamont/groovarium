import React from "react";

const genres = ["Pop", "Rock", "Funk"];

const GenreSelector = ({ selectedGenre, onGenreSelect }) => {
  return (
    <div>
      <select
        value={selectedGenre}
        onChange={(e) => onGenreSelect(e.target.value)}
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <div>{selectedGenre}</div>
    </div>
  );
};

export default GenreSelector;
