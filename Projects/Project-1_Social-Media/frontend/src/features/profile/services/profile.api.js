import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
export const getProfile = async (username) => {
  try {
    const res = await API.get(`/api/user/user/${username}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
