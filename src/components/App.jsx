// import { lazy, Suspense } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Movies from 'pages/Movie/Movies';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import Layout from './Layout/Layout';
import Reviews from './Reviews/Reviews';
import Cast from './Cast/Cast';
// import Home from "path/to/pages/Home";
// import NotFound from "path/to/pages/NotFound";

// const Home = lazy(() => import("../pages/Home"));
// const Movies = lazy(() => import("../pages/MovieDetails"));
// const MovieDetails = lazy(() => import("../pages/MovieDetails"));

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} /> 
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} limit={1} />
    </>
  );
};
