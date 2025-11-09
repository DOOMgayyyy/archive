// hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';

export type User = {
  name: string;
  role: string;
  id?: number;
  email?: string;
};

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('vk_access_token');
    if (token) {
      // Здесь можно добавить проверку валидности токена
      setIsAuthenticated(true);
      // Загрузка данных пользователя
      // TODO: Загрузить реальные данные пользователя из API
      // fetchUserData(token);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Проверка существующей сессии при загрузке
    checkAuth();
  }, [checkAuth]);

  const login = (authData: any) => {
    if (authData.access_token) {
      localStorage.setItem('vk_access_token', authData.access_token);
      setIsAuthenticated(true);
      // TODO: Загрузить данные пользователя из API
      // Временно устанавливаем дефолтного пользователя
      setUser({
        name: 'Пользователь',
        role: 'user',
        id: authData.user_id,
        email: authData.email
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('vk_access_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };
}
