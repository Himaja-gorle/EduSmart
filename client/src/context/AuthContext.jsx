import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUserApi, registerUserApi, fetchMeApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await fetchMeApi();
          setUser(response.data.user);
        } catch (error) {
          console.error('Session expired or invalid token:', error);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (credentials) => {
    const response = await loginUserApi(credentials);
    const { token: authToken, user: userData } = response.data;
    localStorage.setItem('token', authToken);
    setToken(authToken);
    setUser(userData);
    return response;
  };

  const register = async (userData) => {
    const response = await registerUserApi(userData);
    const { token: authToken, user: registeredUser } = response.data;
    localStorage.setItem('token', authToken);
    setToken(authToken);
    setUser(registeredUser);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
