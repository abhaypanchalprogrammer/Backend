import { AuthProvider } from "./features/auth/auth.context.jsx";
import { Routers } from "./Routers.jsx";
import "./features/shared/style.scss";
import { PostProvider } from "./features/post/PostContext.jsx";
function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Routers />
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
