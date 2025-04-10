import React from 'react';
// import './Search.css'; // make sure to create this file for styles

const SearchBar = ({ placeholder = "Search courses, requests..." }) => {
  return (
    <div className="search-bar-wrapper">
      <div className="search-row">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
        />
        <button className="add-request-btn">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
