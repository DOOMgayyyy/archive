// components/VKIDAuth.tsx
'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    VKIDSDK: any;
  }
}

interface VKIDAuthProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  scheme?: 'light' | 'dark';
  showAlternativeLogin?: boolean;
}

export default function VKIDAuth({ 
  onSuccess, 
  onError, 
  scheme = 'dark',
  showAlternativeLogin = true 
}: VKIDAuthProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const oneTapRef = useRef<any>(null);

  useEffect(() => {
    // Функция для загрузки скрипта
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        if (window.VKIDSDK) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
        script.async = true;
        
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load VKID SDK'));
        
        document.head.appendChild(script);
      });
    };

    // Функции обработчиков
    const vkidOnSuccess = (data: any) => {
      console.log('VKID success:', data);
      onSuccess?.(data);
    };

    const vkidOnError = (error: any) => {
      console.error('VKID error:', error);
      onError?.(error);
    };

    // Инициализация виджета
    const initWidget = async () => {
      try {
        await loadScript();

        if (!window.VKIDSDK || !containerRef.current) {
          return;
        }

        const VKID = window.VKIDSDK;

        // Инициализация конфига
        VKID.Config.init({
          app: 54294764,
          redirectUrl: 'https://rusfurbal.ru/api/auth/callback/vk',
          responseMode: VKID.ConfigResponseMode.Callback,
          source: VKID.ConfigSource.LOWCODE,
          scope: '',
        });

        // Создание и рендер виджета
        oneTapRef.current = new VKID.OneTap();

        oneTapRef.current
          .render({
            container: containerRef.current,
            scheme: scheme,
            showAlternativeLogin: showAlternativeLogin
          })
          .on(VKID.WidgetEvents.ERROR, vkidOnError)
          .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload: any) {
            const code = payload.code;
            const deviceId = payload.device_id;

            VKID.Auth.exchangeCode(code, deviceId)
              .then(vkidOnSuccess)
              .catch(vkidOnError);
          });

      } catch (error) {
        console.error('Failed to initialize VKID widget:', error);
        onError?.(error);
      }
    };

    initWidget();

    // Очистка при размонтировании
    return () => {
      if (oneTapRef.current) {
        try {
          oneTapRef.current.destroy();
        } catch (error) {
          console.error('Error destroying VKID widget:', error);
        }
      }
    };
  }, [onSuccess, onError, scheme, showAlternativeLogin]);

  return <div ref={containerRef} />;
}
