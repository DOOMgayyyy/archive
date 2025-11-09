// app/login/page.tsx
'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 1. Импортируем useRouter для редиректа
import { useAuth } from '@/hooks/useAuth';    // 2. Импортируем наш главный хук аутентификации
import VKIDAuth from '@/components/VKIDAuth';

export default function LoginPage() { // 3. Переименовал для ясности
  const router = useRouter();
  const { login, isAuthenticated } = useAuth(); // 4. Получаем функцию login и статус

  // 5. Если пользователь УЖЕ вошел и случайно попал на /login,
  //    не показываем ему кнопку входа, а сразу кидаем на главную.
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/'); // replace, а не push, чтобы страница /login не попадала в историю
    }
  }, [isAuthenticated, router]);

  const handleAuthSuccess = (data: any) => {
    console.log('Authentication successful:', data);
    
    // 6. Вызываем функцию login из useAuth.
    //    Она сама сохранит все что нужно (токен, юзера) и обновит состояние.
    login(data);
    
    // 7. Перенаправляем пользователя на главную страницу
    router.replace('/'); 
  };

  const handleAuthError = (error: any) => {
    console.error('Authentication failed:', error);
    // Здесь можно показать сообщение об ошибке
  };

  // 8. Пока идет проверка (isAuthenticated) или редирект, показываем загрузчик
  if (isAuthenticated) {
    return <div>Перенаправляем...</div>;
  }

  return (
    // 9. Добавил немного стилей для центрирования, как на типовой странице входа
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f111b] text-gray-100 p-4">
      <div className="bg-gray-900/50 p-8 rounded-lg shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-2 text-cyan-400">
          Вход
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Войдите с помощью VK ID, чтобы продолжить
        </p>
        
        <VKIDAuth 
          onSuccess={handleAuthSuccess}
          onError={handleAuthError}
          scheme="dark"
          showAlternativeLogin={true} // Оставляем как есть, это хороший вариант для страницы входа
        />
      </div>
    </div>
  );
}