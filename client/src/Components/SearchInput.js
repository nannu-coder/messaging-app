import React from "react";
import { FiSearch } from "react-icons/fi";
import { IconContext } from "react-icons/lib";

const SearchInput = () => {
  return (
    <div className="search-box">
      <input
        type="text"
        className="form-control shadow-none search-input"
        placeholder="Search..."
      />
      <IconContext.Provider value={{ className: "search-icon" }}>
        <FiSearch />
      </IconContext.Provider>
    </div>
  );
};

export default SearchInput;
