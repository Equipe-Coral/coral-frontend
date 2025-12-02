import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se existe um token no localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Valida o token fazendo uma requisição ao backend
      validateToken();
    } else {
      setLoading(false);
    }

    async function validateToken() {
      try {
        // Tenta buscar o perfil para validar o token
        await api.getProfile();
        setIsAuthenticated(true);
      } catch (error) {
        // Token inválido ou expirado
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
