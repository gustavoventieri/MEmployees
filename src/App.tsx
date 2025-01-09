import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { SideBar } from "./shared/components/sidebar/SideBar";
import { DrawerProvider } from "./shared/contexts";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { Login } from "./shared/components/login/Login";
export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <SideBar>
                <AppRoutes />
              </SideBar>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
