import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import CreatePost from "./features/post/pages/CreatePost.jsx";
import Home from "./features/shared/components/Home.jsx";
export const Routers = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createpost" element={<CreatePost />} />
    </Routes>
  );
};
