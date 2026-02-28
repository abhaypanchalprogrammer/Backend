import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});
export const getProfile = async (username) => {
  try {
    const res = await API.get(`/api/user/user/${username}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
