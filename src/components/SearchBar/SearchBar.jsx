
import { useState } from 'react';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import css from "./SearchBar.module.css";

const SearchBar = ({onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      return toast.warning("Please, enter your query!", {
        theme: "colored"
      });
    }
    onSubmit(searchQuery.trim());
    // setSearchQuery("");
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
      <button type="submit">
        <MagnifyingGlassIcon />
      </button>
      <input
        type="text"
        value={searchQuery}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleSearchChange}
      />
    </form>
    </>

  )
}

export default SearchBar;