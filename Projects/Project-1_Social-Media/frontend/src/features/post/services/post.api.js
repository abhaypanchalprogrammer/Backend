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

export const createPost = async (file, caption) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    const res = await API.post("/", formData);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
