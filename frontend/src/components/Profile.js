import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useParams } from 'react-router-dom';
import './Profile.css';


function Profile() {
  const { id } = useParams(); // Get user ID from URL
  const [profile, setProfile] = useState(null); // State for profile data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in header
        });

        setProfile(response.data); // Set profile data from response
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return (
    <div className="profile" style={{ textAlign: 'center' }}>
      <img
        src={profile.profilePic || '/images/user1.jpg'} // Use default picture if profilePic is unavailable
        alt={profile.name}
        style={{ width: '150px', height: '150px', borderRadius: '50%' }} // Circular profile picture
      />
      <h2>{profile.name}</h2>
      <p>{profile.clubsOrganizations}</p>

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

export default Profile;
