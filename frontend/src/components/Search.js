import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';


function Search() {
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [users, setUsers] = useState([]); // State for storing search results
  const [error, setError] = useState(null); // State for handling errors

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await axios.get('http://localhost:5000/api/search', {
        params: { name: searchTerm }, // Send search term as query parameter
        headers: { Authorization: `Bearer ${token}` }, // Send token in the header
      });

      setUsers(response.data); // Set the found users in the state
      setError(null); // Clear any previous errors
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Name not found'); // If no users are found
        setUsers([]); // Clear users
      } else {
        setError('Error fetching search results'); // Handle other errors
        setUsers([]); // Clear users
      }
    }
  };

  return (
    <div className="search">
      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display the search results */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {/* Make the user's name clickable and link to their profile */}
            <Link to={`/profile/${user._id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>

      {/* Navigation Links with Icons */}
      <nav style={{ marginTop: '20px' }}>
        <Link to="/matches">
          <img src="/icons/matches-icon1.jpg" alt="Matches" style={{ width: '30px' }} />
        </Link>
        <Link to="/search">
          <img src="/icons/search-icon.jpg" alt="Search" style={{ width: '30px' }} />
        </Link>
        <Link to={`/profile/${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : ''}`}>
          <img src="/icons/profile-icon.jfif" alt="Profile" style={{ width: '30px' }} />
        </Link>
      </nav>
    </div>
  );
}

export default Search;
