import "./Features/shared/styles/global.scss";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./Features/auth/auth.context.jsx";
import { SongProvider } from "./Features/home/song.context.jsx";
const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={router} />
      </SongProvider>
    </AuthProvider>
  );
};

export default App;
