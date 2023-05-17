import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { fetchTrandingMovies } from '../../api/api';
import css from './Home.module.css';

const Home = () => {
  const [trandingFilms, setTrandingFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    try {
      const getTrandingMovies = async () => {
        const {
          data: { results },
        } = await fetchTrandingMovies();
        console.log(results);
        const trandingMovie = results.map(({ id, title, poster_path }) => ({
          id,
          title,
          poster_path,
        }));
        if (!results.length) {
          setIsLoading(false);
          toast.error(
            'Sorry, some error is occured, there are no tranding films. Please try again later.',
            {
              theme: 'colored',
            }
          );
          return;
        }
        setIsLoading(false);
        setTrandingFilms(trandingMovie);
      };

      getTrandingMovies();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <h1 className={css.homeTitle}>Tranding films</h1>
      {isLoading && <Loader />}
      <ul className={css.trandingMovieList}>
        {trandingFilms.map(({ id, title, poster_path }) => (
          <li key={id} className={css.trandingMovieItem}>
            <Link to={`/movies/${id}`} state={{ from: location }} className={css.trandMovieNav}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : 'https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png'
              }
              alt={title}
              className={css.posterImg}
            />
              <h2 className={css.movieTitle}>{title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
