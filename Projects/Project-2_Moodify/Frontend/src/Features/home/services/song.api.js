import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getSong = async ({ mood }) => {
  const res = await API.get("/getSong?mood=" + mood);
  return res.data;
};
