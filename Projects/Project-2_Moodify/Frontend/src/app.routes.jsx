import { createBrowserRouter } from "react-router";
import Register from "./Features/auth/pages/Register.jsx";
import Login from "./Features/auth/pages/Login.jsx";
import FaceExpression from "./Features/Expression/Components/FaceExpression.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <FaceExpression />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
