import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const axiosMovie = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
          },
        });
        console.log(response.data);
        setMovies(response.data.results);
      } catch (error) {
        console.log(error.text);
      }
    };
    axiosMovie();
  }, []);

  return (
    <div>
      <h2>인기영화</h2>
      <ul>
        {movies.map((movie) => (
          <li>
            <h3>{movie.title}</h3>
            <p>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movie;
