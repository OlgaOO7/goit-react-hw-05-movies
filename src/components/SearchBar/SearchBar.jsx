import { useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.warning('Please, enter your query!', {
        theme: 'colored',
      });
    }
    onSubmit(searchQuery.trim());
    setSearchQuery("");
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <div className={css.formWrapper}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit">
          <MagnifyingGlassIcon className={css.searchIcon} />
        </button>
        <input
          type="text"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          onChange={handleSearchChange}
          className={css.searchInput}
        />
      </form>
    </div>
  );
};

export default SearchBar;
