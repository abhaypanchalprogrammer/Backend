import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/user",
  withCredentials: true,
});
export const getProfile = async (username) => {
  try {
    const res = await API.get(`/user/${username}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
