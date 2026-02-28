import React from "react";
import "../nav.scss";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const navigateToCreatePost = (e) => {
    e.preventDefault();
    navigate("/createPost");
  };
  return (
    <nav>
      <p>Social-Media</p>
      <button onClick={navigateToCreatePost} className="button primary-button">
        New Post
      </button>
    </nav>
  );
};

export default Nav;
