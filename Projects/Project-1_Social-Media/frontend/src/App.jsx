import { AuthProvider } from "./features/auth/auth.context.jsx";
import { Routers } from "./Routers.jsx";
import "./features/shared/style.scss";
import { PostProvider } from "./features/post/PostContext.jsx";
import { ProfileProvider } from "./features/profile/ProfileContext.jsx";
function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <ProfileProvider>
          <Routers />
        </ProfileProvider>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
