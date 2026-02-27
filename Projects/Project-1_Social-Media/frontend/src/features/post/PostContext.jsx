import { createContext, useEffect, useState } from "react";
import { postApi } from "./services/post.api.js";

export const PostContext = createContext();
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await postApi();
      setPosts(data.posts);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        loading,
        error,
        fetchPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
