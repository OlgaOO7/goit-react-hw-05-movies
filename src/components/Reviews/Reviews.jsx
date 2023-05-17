import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReview } from "../../api/api";
import css from "./Reviews.module.css";

const Reviews = () => {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);

  useEffect(() => {
    const getMovieriview = async () => {
      try {
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
    <ul className={css.reviewList}>
      {!review.length ? (
        <p className={css.content}>No availbale reviews</p>
      ) : (
        review.map(({ id, author, content }) => (
          <li key={id} className={css.reviewItem}>
            <h3 className={css.reviewAuthor}>{author}</h3>
            <p className={css.content}>{content}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default Reviews;
