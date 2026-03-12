import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const register = async ({ email, username, password }) => {
  try {
    const res = await API.post("/register", { username, email, password });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const login = async ({ username, email, password }) => {
  try {
    const res = await API.post("/login", { username, email, password });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getMe = async () => {
  try {
    const res = await API.get("/getme");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const logout = async () => {
  try {
    const res = await API.get("/logout");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};
