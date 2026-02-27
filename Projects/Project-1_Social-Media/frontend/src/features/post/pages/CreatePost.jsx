import React, { useState, useRef } from "react";
import "../styles/createPost.scss";
import { usePost } from "../hook/usePost.jsx";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);
  const { loading, handleCreatePost } = usePost();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const file = postImageInputFieldRef.current.files[0];
      await handleCreatePost(file, caption);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className=" image-label" htmlFor="imgUrl">
            Select Image
          </label>
          <input
            ref={postImageInputFieldRef}
            hidden
            type="file"
            name="imgUrl"
            id="imgUrl"
          />
          <input
            type="text"
            name="caption"
            id="caption"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            placeholder="Enter your caption"
          />
          <button type="submit" className="button primary-button">
            {loading ? "Creating Post" : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
