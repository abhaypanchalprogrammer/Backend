import { useContext, useEffect } from "react";
import { getMe, login, logout, register } from "../services/auth.api.js";
import { AuthContext } from "../auth.context.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, loading, setUser, setLoading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const res = await register({ username, email, password });
      setUser(res.user);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ username, email, password }) => {
    setLoading(true);
    try {
      await login({ username, email, password });
      const userData = await getMe();
      setUser(userData.user);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);
    try {
      const res = await getMe();
      setUser(res.user);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await logout();
      setUser(null);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetMe();
  }, []);
  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};
