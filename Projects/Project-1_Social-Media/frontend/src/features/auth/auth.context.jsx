import { createContext, useState, useEffect, Children } from "react";
import { login, register, getMe } from "./services/auth.api.js";
export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (username, password) => {
//     setLoading(true);
//     try {
//       const res = await login(username, password);
//       setUser(res.user);
//       return res;
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleRegister = async (username, email, password) => {
//     setLoading(true);
//     try {
//       const res = await register(username, email, password);
//       setUser(res.user);
//       return res;
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await getMe();
        setUser(res.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleLogin = async (username, password) => {
    await login(username, password);
    const res = await getMe();
    setUser(res.user);
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
