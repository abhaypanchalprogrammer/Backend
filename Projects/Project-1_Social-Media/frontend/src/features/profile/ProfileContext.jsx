import { createContext, useEffect, useState, useCallback } from "react";
import { getProfile } from "./services/profile.api.js";

export const ProfileContext = createContext();
export const ProfileProvider = ({ children }) => {
  const [profile, setprofile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async (username) => {
    setLoading(true);
    try {
      const res = await getProfile(username);
      console.log("Profile API response:", res);
      setprofile(res.profile);
      setPosts(res.posts);
    } catch (error) {
      console.log("PROFILE ERROR:", error.response?.status);
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profile, posts, loading, error, fetchProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
