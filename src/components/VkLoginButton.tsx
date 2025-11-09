"use client";

import { useEffect } from "react";

type VkLoginButtonProps = {
  clientId: string;
  redirectUri: string;
  onSuccess: (code: string) => void;
};

export default function VkLoginButton({ clientId, redirectUri, onSuccess }: VkLoginButtonProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vk.com/js/api/openapi.js?168";
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  const handleLogin = () => {
    const vkAuthUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=email&response_type=code&v=5.131`;
    window.location.href = vkAuthUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
    >
      Войти через VK
    </button>
  );
}
