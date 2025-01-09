import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "../services/auth/AuthService";
import { useNavigate } from "react-router-dom";

interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "jwtToken";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  // Inicializando o estado accessToken como string | null
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // UseEffect para recuperar o token do localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    if (storedToken) {
      setAccessToken(storedToken); // Se encontrar, armazena no estado
    }
  }, []);

  // Função de login
  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const result = await AuthService.auth({ email, password });
      if (result instanceof Error) {
        return result.message; // Retorna a mensagem de erro
      } else {
        // Salva o token no localStorage e no estado
        localStorage.setItem(
          LOCAL_STORAGE_KEY__ACCESS_TOKEN,
          result.accessToken
        );
        setAccessToken(result.accessToken);
        navigate("/dashboard");
      }
    },
    [navigate]
  );

  // Função de logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(null); // Define o estado como null após o logout
    navigate("/");
  }, [navigate]);

  // Verifica se o usuário está autenticado
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
