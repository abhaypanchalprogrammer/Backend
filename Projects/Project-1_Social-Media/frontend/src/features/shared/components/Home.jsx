import React, { useState } from "react";
import Profile from "../../profile/pages/profile.jsx";
import Feed from "../../post/pages/Feed.jsx";
import Nav from "./Nav.jsx";
import Follow from "../../follow/pages/Follow.jsx";
import "../media.scss";

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showDiscover, setShowDiscover] = useState(false);

  return (
    <div className="app-wrapper">
      <Nav />

    
      <div className="mobile-toggle-bar">
        <button
          className={`toggle-btn ${showProfile ? "active" : ""}`}
          onClick={() => {
            setShowProfile((p) => !p);
            setShowDiscover(false);
          }}
        >
          👤 Profile
        </button>
        <button
          className={`toggle-btn ${showDiscover ? "active" : ""}`}
          onClick={() => {
            setShowDiscover((d) => !d);
            setShowProfile(false);
          }}
        >
          🔍 Discover
        </button>
      </div>

     
      <div className={`profile-panel-wrapper ${showProfile ? "panel-open" : ""}`}>
        <Profile />
      </div>
      <div className={`discover-panel-wrapper ${showDiscover ? "panel-open" : ""}`}>
        <Follow />
      </div>

     
      <div className="main">
        <div className="home-layout">
          <div className="desktop-only-profile">
            <Profile />
          </div>
          <div className="feed-section">
            <Feed />
            <div className="desktop-only-discover">
              <Follow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
