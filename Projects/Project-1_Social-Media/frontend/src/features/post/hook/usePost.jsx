import { useContext } from "react";
import { PostContext } from "../PostContext.jsx";

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within PostProvider");
  }
  return context;
};
