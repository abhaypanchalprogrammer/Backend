import React, { useState, useEffect } from "react";
import "../styles/feed.scss";
import { usePost } from "../hook/usePost.jsx";
import axios from "axios";
import { useAuth } from "../../auth/Hooks/useAuth.js";
const Feed = () => {
  const { posts, setPosts, loading, error, fetchPost } = usePost();
  const { user, loading: authLoading } = useAuth();
  useEffect(() => {
    if (!authLoading && user) {
      // fetchPost should call postApi internally
      fetchPost();
    }
  }, [authLoading, user]);
  const handleLike = async (postId) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/post/${postId}/like`,
      {},
      { withCredentials: true },
    );
    setPosts((prevPost) =>
      prevPost.map((post) =>
        post._id === postId ? { ...post, isLiked: res.data.createLike } : post,
      ),
    );
  };
  if (loading) return <h1>Loading..</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          {posts.map((post) => (
            <div key={post._id} className="post">
              <div className="user">
                <div className="img-wrapper">
                  <img src={post.user?.profileImage} alt="" />
                </div>
                <p>{post.user?.username}</p>
              </div>
              <img className="post-image" src={post.imgUrl} alt="" />
              <div className="icons">
                <div className="left">
                  <button onClick={() => handleLike(post._id)}>
                    <svg
                      className={post.isLiked ? "like" : ""}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                    </svg>
                  </button>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z"></path>
                    </svg>
                  </button>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="bottom">
                <div className="caption">{post.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Feed;
