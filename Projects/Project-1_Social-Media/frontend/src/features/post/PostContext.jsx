import { createContext, useEffect, useState } from "react";
import { postApi, createPost } from "./services/post.api.js";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  const handleCreatePost = async (file, caption) => {
    try {
      setLoading(true);

      const data = await createPost(file, caption);

      if (!data || !data.newPost) {
        console.log("Invalid response:", data);
        return;
      }

      setPosts((prev) => [data.newPost, ...prev]);
    } catch (error) {
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
        handleCreatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
