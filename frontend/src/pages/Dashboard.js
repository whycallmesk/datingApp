import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome to MyDate Dashboard</h1>
      
      {/* Responsive GIF Image */}
      <img 
        src="/images/dashboard.gif" 
        alt="Dashboard Illustration" 
        className="dashboard-image"
      />

      {/* Navigation Links with Icons */}
      <nav className="dashboard-nav">
        {/* Matches Icon */}
        <Link to="/matches" className="dashboard-link">
          <img 
            src="/icons/matches-icon1.jpg" 
            alt="Matches" 
            className="nav-icon"
          />
          <span className="nav-label">Matches</span>
        </Link>

        {/* Search Icon */}
        <Link to="/search" className="dashboard-link">
          <img 
            src="/icons/search-icon.jpg" 
            alt="Search" 
            className="nav-icon"
          />
          <span className="nav-label">Search</span>
        </Link>

        {/* Profile Icon */}
        <Link to={`/profile/${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : ''}`} className="dashboard-link">
          <img 
            src="/icons/profile-icon.jfif" 
            alt="Profile" 
            className="nav-icon"
          />
          <span className="nav-label">Profile</span>
        </Link>
      </nav>
    </div>
  );
}

export default Dashboard;
