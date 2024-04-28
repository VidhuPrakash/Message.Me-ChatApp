import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button className="btn btn-circle bg-red-500 text-white" type="submit">
        <FaSearch color="black" />
      </button>
    </form>
  );
};

export default SearchInput;
