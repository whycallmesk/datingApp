import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Matches.css';


function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/matches', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError('Failed to fetch matches');
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div>Loading matches...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="matches">
      <h2>Your Matches</h2>
      <ul>
        {matches.map((user) => (
          <li key={user._id}>
            {/* Link each name to the user's profile */}
            <Link to={`/profile/${user._id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>

      {/* Icon navigation for Matches, Search, and Profile */}
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

export default Matches;
