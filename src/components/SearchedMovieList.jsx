// import { Link, useLocation } from 'react-router-dom';

// const SearchedMovieList = ({ movieList }) => {
//   const location = useLocation();
//   console.log(movieList);
//   return (
//     <ul>
//       {movieList.map(movie => (
//         <li key={movie.id}>
//           <img
//             src={
//               movie.poster_path
//                 ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
//                 : '../images/no-poster-available.webp'
//             }
//             alt={movie.title}
//           />
//           <Link to={`/movies/${movie.id}`} state={{ from: location }}>
//             {movie.title}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default SearchedMovieList;
