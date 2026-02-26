import { AuthProvider } from "./features/auth.context.jsx";
import { Routers } from "./Routers.jsx";
import "./features/shared/style.scss";
function App() {
  return (
    <AuthProvider>
      <Routers />
    </AuthProvider>
  );
}

export default App;
