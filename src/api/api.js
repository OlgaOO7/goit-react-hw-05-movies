import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3/"
const API_KEY = 'a4cd0ac584d8e9d66ad0a8071503e9b2'

export const fetchTrandingMovies = async () => {
  try {
    return await axios.get(`${BASE_URL}trending/all/day?api_key=${API_KEY}`)
  } catch (err) {
    console.log(err);
  }
}

export const fetchSearchMovie = async searchQuery => {
  try {
    return await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1`);
  } catch (err) {
    console.log(err);
  }
}

export const fetchMovieInfo = async movieId => {
  try {
    return await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  } catch (err) {
    console.log(err);
  }
}

export const fetchMovieCast = async movieId => {
  try {
    return await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    );
  } catch (err) {
    console.log(err);
  }
}

export const fetchMovieReview = async movieId => {
  try {
    return await axios.get(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
  }catch (err) {
    console.log(err);
  }
}
