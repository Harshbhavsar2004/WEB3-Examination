import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './searchbar.css';

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [flag , setFlag] = useState(false)
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleclickchange = () =>{
    setFlag(!flag)
  }
  return (
    <div onClick={handleclickchange} className="searchbar-container" style={flag ? {border:'2px solid black'} : null }>
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
