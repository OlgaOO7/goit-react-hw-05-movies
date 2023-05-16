// import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { fetchTrandingMovies } from '../../api/api';
import css from './Home.module.css';

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// const API_KEY = 'a4cd0ac584d8e9d66ad0a8071503e9b2';

// const getTrandingMovies = async () => {
//   const data = await axios.get(`/3/trending/all/day?api_key=${API_KEY}`)
// }

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
        // const response = await fetchTrandingMovies();
        // const results = response.data.results;
        // console.log(response.data.results);
        // console.log(results);
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
      <h1>Tranding films</h1>
      {isLoading && <Loader />}
      <ul>
        {trandingFilms.map(({ id, title, poster_path }) => (
          <li key={id}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : '../../images/poster_not_available.png'
              }
              alt={title}
            />
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
