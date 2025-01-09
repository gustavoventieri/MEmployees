import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { SideBar } from "./shared/components/sidebar/SideBar";
import { DrawerProvider } from "./shared/contexts";
import { AuthProvider } from "./shared/contexts/AuthContext";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppThemeProvider>
          <DrawerProvider>
            <AppRoutes />
          </DrawerProvider>
        </AppThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
