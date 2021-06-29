import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchKey, setSearchKey] = useState("");
  const [prevKey, setPrevKey] = useState("");

  const handleSearch = (event) => {
    // return if there is no change from prev search
    if (prevKey === searchKey) return;

    // set prev state
    setPrevKey(searchKey);

    // emit event to parent with the new key
    onSearch(searchKey);
  };

  const handleInputChange = (event) => {
    // set the state
    setSearchKey(event.target.value);
  };

  return (
    <div className="search-form">
      <input
        type="text"
        className="form-control"
        placeholder="search"
        value={searchKey}
        onChange={handleInputChange}
      />
      <i className="icofont-search" onClick={handleSearch}></i>
    </div>
  );
};

export default Search;
