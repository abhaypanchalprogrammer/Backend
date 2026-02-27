import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/posts",
  withCredentials: true,
});
export const postApi = async () => {
  try {
    const res = await API.get("/feed");
    return res.data;
  } catch (error) {
    throw error;
  }
};
