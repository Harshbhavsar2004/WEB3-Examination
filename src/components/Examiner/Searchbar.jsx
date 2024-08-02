import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './searchbar.css';

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="searchbar-container">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search users..."
      />
    </div>
  );
};

export default Searchbar;
