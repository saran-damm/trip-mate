import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/common/Toast";
import { FirebaseInitializer } from "./components/common/FirebaseInitializer";
import { TripProvider } from './context/TripContext';

function App() {
  return (
    <FirebaseInitializer>
      <ThemeProvider>
        <AuthProvider>
          <TripProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </TripProvider>
        </AuthProvider>
      </ThemeProvider>
    </FirebaseInitializer>
  );
}

export default App;
