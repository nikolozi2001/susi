import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getCurrentUser } from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app init
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const user = await getCurrentUser();
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login user
  const login = async (email, password) => {
    const userData = await apiLogin(email, password);
    localStorage.setItem('authToken', userData.token);
    setCurrentUser(userData);
    return userData;
  };

  // Register new user
  const signup = async (email, password, name, role = 'user') => {
    const userData = await apiRegister(name, email, password, role);
    localStorage.setItem('authToken', userData.token);
    setCurrentUser(userData);
    return userData;
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
