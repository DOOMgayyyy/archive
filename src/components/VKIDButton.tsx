// components/VKIDButton.tsx
'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    VKIDSDK: any;
  }
}

interface VKIDButtonProps {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  scheme?: 'light' | 'dark';
}

export default function VKIDButton({ 
  onSuccess, 
  onError, 
  scheme = 'dark'
}: VKIDButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const oneTapRef = useRef<any>(null);
  const observerRef = useRef<MutationObserver | null>(null);

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
        
        script.onload = () => {
          // Даем время SDK инициализироваться
          setTimeout(() => resolve(true), 100);
        };
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
          console.warn('VKID SDK not loaded or container not available');
          return;
        }

        const VKID = window.VKIDSDK;

        // Проверяем наличие необходимых компонентов SDK
        if (!VKID.Config || !VKID.OneTap) {
          console.error('VKID SDK components not available');
          onError?.({ message: 'VKID SDK components not available' });
          return;
        }

        // Инициализация конфига
        try {
          VKID.Config.init({
            app: 54294764,
            redirectUrl: 'https://rusfurbal.ru/api/auth/callback/vk',
            responseMode: VKID.ConfigResponseMode.Callback,
            source: VKID.ConfigSource.LOWCODE,
            scope: '',
          });
        } catch (configError) {
          console.error('Failed to init VKID config:', configError);
          onError?.(configError);
          return;
        }

        // Используем OneTap, но без альтернативной кнопки
        try {
          oneTapRef.current = new VKID.OneTap();

          const widget = oneTapRef.current
            .render({
              container: containerRef.current,
              scheme: scheme,
              showAlternativeLogin: false // Отключаем альтернативную кнопку
            })
            .on(VKID.WidgetEvents.ERROR, vkidOnError)
            .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload: any) {
              const code = payload.code;
              const deviceId = payload.device_id;

              VKID.Auth.exchangeCode(code, deviceId)
                .then(vkidOnSuccess)
                .catch(vkidOnError);
            });
        } catch (widgetError) {
          console.error('Failed to create VKID widget:', widgetError);
          onError?.(widgetError);
          return;
        }

        // Скрываем дополнительные кнопки через CSS
        const hideExtraButtons = () => {
          if (containerRef.current) {
            // Находим все кнопки внутри контейнера
            const buttons = containerRef.current.querySelectorAll('button');
            if (buttons.length > 1) {
              // Оставляем только первую кнопку, остальные скрываем
              for (let i = 1; i < buttons.length; i++) {
                (buttons[i] as HTMLElement).style.display = 'none';
              }
            }
            // Также скрываем элементы с data-test-id="alternativeLogin" если они есть
            const alternativeLogin = containerRef.current.querySelector('[data-test-id="alternativeLogin"]');
            if (alternativeLogin) {
              (alternativeLogin as HTMLElement).style.display = 'none';
            }
          }
        };

        // Используем MutationObserver для отслеживания изменений DOM
        const observer = new MutationObserver(() => {
          hideExtraButtons();
        });

        if (containerRef.current) {
          observer.observe(containerRef.current, {
            childList: true,
            subtree: true
          });
        }

        // Первоначальная проверка
        setTimeout(hideExtraButtons, 100);
        setTimeout(hideExtraButtons, 500);
        setTimeout(hideExtraButtons, 1000);

        // Сохраняем observer для очистки
        observerRef.current = observer;

      } catch (error) {
        console.error('Failed to initialize VKID button:', error);
        onError?.(error);
      }
    };

    initWidget();

    // Очистка при размонтировании
    return () => {
      // Отключаем observer
      if (observerRef.current) {
        try {
          observerRef.current.disconnect();
        } catch (error) {
          console.error('Error disconnecting observer:', error);
        }
        observerRef.current = null;
      }

      // Уничтожаем виджет
      if (oneTapRef.current) {
        try {
          // Проверяем наличие метода destroy
          if (typeof oneTapRef.current.destroy === 'function') {
            oneTapRef.current.destroy();
          } else if (typeof oneTapRef.current.unmount === 'function') {
            oneTapRef.current.unmount();
          } else {
            // Если методов нет, просто очищаем контейнер
            if (containerRef.current) {
              containerRef.current.innerHTML = '';
            }
          }
        } catch (error) {
          console.error('Error destroying VKID widget:', error);
          // В случае ошибки просто очищаем контейнер
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }
        }
        oneTapRef.current = null;
      }
    };
  }, [onSuccess, onError, scheme]);

  return <div ref={containerRef} className="vkid-button-container" />;
}

