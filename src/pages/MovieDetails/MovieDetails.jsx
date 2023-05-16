// import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieInfo } from '../../api/api';
import Loader from 'components/Loader/Loader';
import css from './MovieDetails.module.css';

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// const API_KEY = 'a4cd0ac584d8e9d66ad0a8071503e9b2';

const MovieDetails = () => {
  const [currentMovie, setCurrentMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  // console.log(movieId);
  const location = useLocation();
  // console.log(location);
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  // console.log(backLinkLocationRef);

  useEffect(() => {
    setIsLoading(true);
    const getMovieInfo = async () => {
      try {
        // const response = await axios.get(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        // console.log(response);
        // const result = response.data;
        // console.log(result);
        const response = await fetchMovieInfo(movieId);
        console.log(response);
        const result = response.data;
        console.log(result);

        if (!result) {
          setIsLoading(false);
          toast.error('Sorry, some error is occured. Please try again later.', {
            theme: 'colored',
          });
          return;
        }
        const movieInfo = {
          title: result.title,
          popularity: result.popularity,
          poster_path: result.poster_path,
          overview: result.overview,
          release_date: result.release_date,
          genres: result.genres.map(({ name }) => name).join(', '),
        };
        setCurrentMovie(movieInfo);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieInfo();
  }, [movieId]);

  const { title, popularity, poster_path, overview, release_date, genres } =
    currentMovie;

  return (
    <>
      <Link to={backLinkLocationRef.current} className={css.navLinkBack}>
        <ArrowLeftIcon className={css.arrowIcon} />
        Go back
      </Link>
      {isLoading && <Loader />}
      <h1 className={css.movieTitle}>{title}</h1>
      <div className={css.infoMovieWrapper}>
        <div className={css.posterWrapper}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : '../images/poster_not_available.png'
            }
            alt={title}
            width="480"
          />
        </div>
        <div className={css.movieInfoDetails}>
          <h3 className={css.movieSubtitle}>Movie info</h3>
          <p>Popularity: {popularity}</p>
          <p>Release date: {release_date}</p>
          <h3 className={css.movieSubtitle}>Overview</h3>
          <p>{overview}</p>
          <h3 className={css.movieSubtitle}>Genres</h3>
          <p>{genres}</p>
        </div>
      </div>

      <h3 className={css.movieSubtitle}>Additional information</h3>
      <ul className={css.navLinkList}>
        <li>
          <Link to="cast" className={css.navlinkInfo}>Cast</Link>
        </li>
        <li>
          <Link to="reviews" className={css.navlinkInfo}>Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetails;
