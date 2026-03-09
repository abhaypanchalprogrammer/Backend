import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const register = async ({ email, username, password }) => {
  try {
    const res = await API.post("/api/register", { username, email, password });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const login = async ({ username, email, password }) => {
  try {
    const res = await API.post("/api/login", { username, email, password });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getMe = async () => {
  try {
    const res = await API.get("/api/getme");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const logout = async () => {
  try {
    const res = await API.get("/api/logout");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};
