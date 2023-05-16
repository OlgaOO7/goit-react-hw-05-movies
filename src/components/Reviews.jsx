// import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReview } from "../api/api";

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// const API_KEY = 'a4cd0ac584d8e9d66ad0a8071503e9b2';

// https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1

const Reviews = () => {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);
  // http://localhost:3001/movies/movie-1/reviews

  useEffect(() => {
    const getMovieriview = async () => {
      try {
        // const response = await axios.get(
        //   `/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
        // );
        // console.log(response);
        const response = await fetchMovieReview(movieId);
        const result = response.data.results;
        setReview(result);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieriview();
  }, [movieId]);

  return (
    <ul>
      {!review.length ? (
        <p>No availbale reviews</p>
      ) : (
        review.map(({ id, author, content }) => (
          <li key={id}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
          </li>
        ))
      )}
    </ul>
    // <div>
    //   Movie Review: {movieId}
    // </div>
  );
};

export default Reviews;
