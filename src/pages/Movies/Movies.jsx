import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { fetchSearchMovie } from '../../api/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import css from './Movies.module.css';

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
        } = await fetchSearchMovie(queryParams);
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
    setSearchParams({query: searchQuery});
  };

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
                      : 'https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png'
                  }
                  alt={movie.title}
                  className={css.moviePoster}
                />
                <h2 className={css.movieTitle}>{movie.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Movies;
