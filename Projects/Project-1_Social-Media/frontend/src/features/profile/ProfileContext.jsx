import { createContext, useState, useCallback } from "react";
import { getProfile } from "./services/profile.api.js";
import { getMe } from "../auth/services/auth.api.js";

export const ProfileContext = createContext();
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async (username) => {
    setLoading(true);
    try {
      const res = await getProfile(username);
      // const res = await getMe();
      setProfile(res.profile);
      setPosts(res.posts);
      // console.log("profile Data = ", profile);
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
