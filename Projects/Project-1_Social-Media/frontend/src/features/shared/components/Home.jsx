import React from "react";
import Profile from "../../profile/pages/profile.jsx";
import Feed from "../../post/pages/Feed.jsx";
import Nav from "./Nav.jsx";

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="main">
        <div className="home-layout">
          <Profile />
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Home;
