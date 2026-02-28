import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});
export const postApi = async () => {
  try {
    const res = await API.get("/api/posts/feed");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (file, caption) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    const res = await API.post("/api/posts/", formData);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
