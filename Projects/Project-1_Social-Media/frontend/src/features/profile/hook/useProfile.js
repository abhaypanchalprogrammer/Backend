import { useContext } from "react";
import { ProfileContext } from "../ProfileContext.jsx";

export const useProfile = () => {
  const context = useContext(ProfileContext);
  return context;
};
