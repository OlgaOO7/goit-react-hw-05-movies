// import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from "../../api/api";
import css from "./Cast.module.css";

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const Cast = () => {
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
            <li key={id} className={css.castItem}>
              <img
                src={profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path}` : "http://tinleychamber.org/wp-content/uploads/2019/01/no-image-available.png"}
                alt={name}
                width="160"

                className={css.castImg}
              />
              <p className={css.name}>{name}</p>
              <p className={css.character}>Character: {character}</p>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default Cast;
