import { createBrowserRouter } from "react-router";
import Register from "./Features/auth/pages/Register.jsx";
import Login from "./Features/auth/pages/Login.jsx";
import FaceExpression from "./Features/Expression/Components/FaceExpression.jsx";
import Protected from "./Features/auth/components/Protected.jsx";
import Home from "./Features/home/pages/Home.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
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
