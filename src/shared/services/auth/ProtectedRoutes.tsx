import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext"; // Seu contexto de autenticação

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(true);

  // Adicionando um efeito para garantir que o carregamento do token seja feito
  useEffect(() => {
    // Simulando um "efeito" para garantir que o token foi carregado do localStorage
    setLoading(false);
  }, [isAuthenticated]);

  // Enquanto o estado de autenticação estiver sendo carregado, exibe um loading
  if (loading) {
    return <div>Loading...</div>; // Ou uma tela de carregamento qualquer
  }

  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />; // Caso contrário, renderiza o conteúdo protegido
};
