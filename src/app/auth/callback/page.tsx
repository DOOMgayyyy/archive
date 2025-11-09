"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    
    if (code) {
      // Обмениваем код на токен через API
      fetch(`/api/auth/callback/vk?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            // Сохраняем токен и данные пользователя
            login(data);
            // Перенаправляем на главную страницу
            router.push("/");
          } else {
            console.error("Failed to get access token:", data);
            router.push("/?error=auth_failed");
          }
        })
        .catch((error) => {
          console.error("Auth callback error:", error);
          router.push("/?error=auth_failed");
        });
    } else {
      // Нет кода, перенаправляем на главную
      router.push("/");
    }
  }, [searchParams, login, router]);

  return (
    <div className="bg-[#0f111b] text-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-cyan-400 text-xl mb-4">Обработка авторизации...</div>
        <div className="text-gray-400">Пожалуйста, подождите</div>
      </div>
    </div>
  );
}

