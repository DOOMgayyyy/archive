'use client';

import { useAuth } from '@/hooks/useAuth';
import VKIDAuth from '@/components/VKIDAuth';

export default function AuthWrapper() {
  const { isAuthenticated, login, logout, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <p>Вы авторизованы!</p>
        <button onClick={logout}>Выйти</button>
      </div>
    );
  }

  return (
    <VKIDAuth 
      onSuccess={login}
      onError={(error) => console.error('Auth error:', error)}
    />
  );
}
