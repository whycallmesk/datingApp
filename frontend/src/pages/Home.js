import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        {/* MyDate Logo and Name */}
        <div className="navbar-logo">
          <img src="/logo/mydate-logo.png" alt="MyDate Logo" className="logo" />
          <span className="logo-name">MyDate</span>
        </div>

        {/* Right-aligned items */}
        <div className="navbar-right">
          {/* About MyDate */}
          <div className="navbar-item" onClick={() => setShowAbout(!showAbout)}>
            About MyDate
          </div>

          {/* Log In */}
          <div className="navbar-item">
            <Link to="/login" className="navbar-link">Log In</Link>
          </div>
          
          {/* Sign Up */}
          <div className="navbar-item">
            <Link to="/signup" className="navbar-link">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="home-content">
        <h1>Welcome to MyDate App</h1>
        {/* Background Image */}
        <img
          src="/logo/Homepage.jpg"
          alt="Home illustration"
          className="home-image"
        />
      </div>

      {/* About MyDate Blog Style Section */}
      {showAbout && (
        <div className="about-mydate-blog">
          <h2>About MyDate</h2>
          <p>
            MyDate App connects individuals looking to meet new people, make friends,
            or find romance. The app helps users to discover matches nearby and
            initiate conversations in a safe and friendly environment.
          </p>
          <p>
            With a range of features such as profile customization, location-based
            matching, and interest-based searches, MyDate is designed to help you
            meet people with similar preferences and passions.
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
