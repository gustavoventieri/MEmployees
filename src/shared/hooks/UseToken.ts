import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  uid: number;
  role: string;
  exp: number;
}

export const UseToken = () => {
  // Estado para armazenar a role
  const [role, setRole] = useState<string | null>(null);
  const [uid, setUid] = useState<number | null>(null);

  useEffect(() => {
    // Função para obter o token do localStorage e decodificar
    const getTokenFromLocalStorage = () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token); // Decodificando e tipando o token
          setUid(decoded.uid);
          setRole(decoded.role);
          // Armazenando a role no estado
        } catch (error) {
          console.error("Erro ao decodificar o token", error);
        }
      }
    };

    getTokenFromLocalStorage();
  }, []); // O useEffect é chamado apenas uma vez no carregamento inicial do componente

  return { role: role, uid: uid }; // Retorna a role
};
