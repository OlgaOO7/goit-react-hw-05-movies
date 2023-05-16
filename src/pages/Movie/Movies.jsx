// import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { fetchSearchMovie } from '../../api/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import css from './Movie.module.css';
// import SearchedMovieList from '../components/SearchedMovieList';

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// const API_KEY = 'a4cd0ac584d8e9d66ad0a8071503e9b2';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movieBySearch, setMovieBySearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = searchParams.get('query') ?? '';

  if (!searchQuery && queryParams) {
    setSearchQuery(queryParams);
  }

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    try {
      setIsLoading(true);
      const getSearchMovie = async () => {
        const {
          data: { results },
        } = await fetchSearchMovie(searchQuery);
        // const response = await axios.get(
        //   `/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1`
        // );
        // const result = response.data.results;

        if (!results.length) {
          setMovieBySearch([]);
          setIsLoading(false);
          toast.error(
            'Sorry there are no movies matching your search query. Please try again.',
            {
              theme: 'colored',
            }
          );
          return;
        }
        setMovieBySearch(results);
        setIsLoading(false);
      };
      getSearchMovie();
    } catch (error) {
      console.log(error);
    }
  }, [searchQuery, queryParams]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setSearchParams(searchQuery);
  };

  //   //   useEffect(() =>{
  //   // //  http запит, якщо потрібно
  //   //   }, [])

  //   // const [movies, setMovies] = useState([
  //   //   'movie-1',
  //   //   'movie-2',
  //   //   'movie-3',
  //   //   'movie-4',
  //   //   'movie-5',
  //   //   'movie-6',
  //   // ]);

  //   const location = useLocation();

  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const movieId = searchParams.get('movieId') ?? "";

  //   const visibleMovies = movies.filter(movie => movie.includes(movieId));

  //   const updateQueryString = e => {
  //     const movieIdValue = e.target.value;
  //     if (movieIdValue === "") {
  //       return setSearchParams({});
  //     } else
  //     setSearchParams({ movieId: movieIdValue });
  //     // const nextParams = name !== "" ? { name } : {};
  //     // setSearchParams(nextParams);
  //   };

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {movieBySearch && (
        <ul className={css.movieList}>
          {movieBySearch.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.movieNav}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : '../images/poster_not_available.png'
                  }
                  alt={movie.title}
                />
                <h2 className={css.movieTitle}>{movie.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* <input
        type="text"
        value={movieId}
        onChange={updateQueryString}
      /> */}
      {/* {visibleMovies.map(movie => {
        return (
          <li key={movie}>
            <Link to={`${movie}`} state={{ from: location }}>
            {movie}
          </Link>
          </li>
        );
      })} */}
    </div>
  );
};

export default Movies;
