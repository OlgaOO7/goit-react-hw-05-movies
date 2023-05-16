// import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from "../../api/api";
import css from "./Cast.module.css";

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// const API_KEY = 'a4cd0ac584d8e9d66ad0a8071503e9b2';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  // http://localhost:3001/movies/movie-1/cast

  //
  // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        // const response = await axios.get(
        //   `/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
        // );
        // console.log(response);
        // const result = response.data.cast;
        // console.log(result);

        const response = await fetchMovieCast(movieId);
        const result = response.data.cast;
        setCast(result);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieCast();
  }, [movieId]);

  return (
    <>
      <ul className={css.castList}>
        {!cast.length ? (
          <p>Sorry, no information.</p>
        ) : (
          cast.map(({ character, name, id, profile_path }) => (
            <li key={id}>
              <img
                src={profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path}` : "../images/no_photo.jpg"}
                alt={name}
                width="160"
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

// export default Cast;
