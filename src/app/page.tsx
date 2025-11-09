"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button, Card } from "@heroui/react";
import { Menu, X } from "lucide-react";
import Events from "@/components/Events";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";


const participants = [
  { id: 1, name: "Коди Хэллфин", bio: "Художник и крафтер", avatar: "/assets/avatars/kodi.jpg" },
  { id: 2, name: "Айко Тэн", bio: "DJ и диджитал-художник", avatar: "/assets/avatars/aiko.jpg" },
  { id: 3, name: "Рей Куросава", bio: "Разработчик VR-игр", avatar: "/assets/avatars/rei.jpg" },
];

export default function Home() {
  //const { user, isAuthenticated, login, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  //================================================================================
  // 👇 2. ВМЕСТО ЭТОГО, ЖЕСТКО ЗАДАЕМ АДМИНА ДЛЯ ТЕСТА:
  const { logout } = useAuth(); // Можем вытащить только logout, он нам нужен для кнопки
  const user = {
    name: "Тестовый Админ",
    email: "admin@test.com",
    role: "admin", // 👈 Самое важное!
    id: 1 
  };
  const isAuthenticated = true;
  const loading = false;
  //================================================================================

  return (
    <div className="bg-[#0f111b] text-gray-100 min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-6 sm:p-8 border-b border-gray-800 relative z-50 bg-gradient-to-b from-[#0f111b]/90 to-[#1a1c2e]/50">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wider text-cyan-400 drop-shadow-lg">
          🌌 RFB Cyber 2026
        </h1>

        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <a href="#events" className="hover:text-pink-400 transition">События</a>
          <a href="#participants" className="hover:text-pink-400 transition">Участники</a>
          <a href="#tickets" className="hover:text-pink-400 transition">Билеты</a>
          {isAuthenticated && user ? (
            <>
              {user.role === "admin" && <a href="#admin" className="hover:text-pink-400 transition">Админка</a>}
              <Button
                onClick={logout}
                className="bg-pink-500 text-black font-bold px-5 py-2 rounded-lg shadow hover:bg-pink-400 transition"
              >
                Выйти
              </Button>
            </>
          ) : (
            <Link href="/login" passHref>
              <Button
                as="span" // Важно для Next.js Link + HeroUI Button
                className="bg-cyan-500 text-black font-bold px-5 py-2 rounded-lg shadow hover:bg-cyan-400 transition"
              >
                Войти
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-900 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
          <div
            className={`absolute top-full left-0 w-full backdrop-blur-md bg-[#0f111b]/70 border-t border-gray-800 flex flex-col items-center gap-4 py-6 md:hidden transition-all duration-300 ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
            }`}
          > 
          <a href="#events" onClick={() => setMenuOpen(false)} className="hover:text-pink-400 transition text-lg">События</a>
          <a href="#participants" onClick={() => setMenuOpen(false)} className="hover:text-pink-400 transition text-lg">Участники</a>
          <a href="#tickets" onClick={() => setMenuOpen(false)} className="hover:text-pink-400 transition text-lg">Билеты</a>
          {isAuthenticated && user ? (
            <>
              {user.role === "admin" && (
                <a href="#admin" onClick={() => setMenuOpen(false)} className="hover:text-pink-400 transition text-lg">Админка</a>
              )}
              <Button onClick={() => { logout(); setMenuOpen(false); }} className="bg-pink-500 text-black px-5 py-2 rounded-lg hover:bg-pink-400 transition">
                Выйти
              </Button>
            </>
          ) : (
            <Link href="/login" passHref>
              <Button
                as="span" // Важно для Next.js Link + HeroUI Button
                className="bg-cyan-500 text-black font-bold px-5 py-2 rounded-lg shadow hover:bg-cyan-400 transition"
              >
                Войти
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0f111b] via-[#1a1c2e] to-[#0f111b]">
        <div className="absolute inset-0">
          <Image
            src="/festival-hero.jpg"
            alt="Главная плюшка фестиваля"
            fill
            className="object-cover object-center brightness-75"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center px-6 z-10"
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold text-cyan-400 drop-shadow-lg mb-4">
            Добро пожаловать на RFB Cyber 2026!
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 drop-shadow-md max-w-2xl mx-auto">
            Музыка, кибер-косплей, VR-игры и уникальные технологии ждут тебя!
          </p>
        </motion.div>
      </section>

      {/* Events Section */}
      <section id="events" className="px-6 sm:px-20 py-16">
        <h3 className="text-3xl font-bold text-cyan-400 mb-8">Расписание Событий</h3>
        <div className="bg-gray-900/60 rounded-xl p-4 shadow-md">
          <Events isAdmin={user?.role === "admin"} />
        </div>
      </section>

      {/* Participants Section */}
      <section id="participants" className="px-6 sm:px-20 py-16 bg-gray-900/50">
        <h3 className="text-3xl font-bold text-pink-400 mb-8">Участники</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map((p) => (
            <Card key={p.id} className="bg-gray-900/70 border border-gray-700 shadow-md p-4">
              <div className="mb-4 flex justify-center">
                <Image
                  src={p.avatar}
                  alt={p.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              </div>
              <h4 className="text-gray-100 font-bold mb-2">{p.name}</h4>
              <p className="text-gray-300 text-sm">{p.bio}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="px-6 sm:px-20 py-16 bg-gray-900/70 flex flex-col items-center gap-6">
        <h3 className="text-3xl font-semibold text-pink-400 drop-shadow-lg">Билеты и аккаунт</h3>
        {user ? (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-gray-200 text-center">Привет, {user.name}! Можешь предъявить билет или купить новый.</p>
            <div className="flex gap-4">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-black">Показать билет</Button>
              <Button className="bg-pink-500 hover:bg-pink-400 text-black">Купить билет</Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-300 text-center">
            {/* 6. Немного обновили текст-подсказку */}
            Войдите, чтобы получить доступ к билетам. Кнопка входа находится в верхнем меню.
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-20 py-12 border-t border-gray-800 flex flex-col items-center gap-4 bg-[#0f111b]/80">
        <p className="text-gray-500">© 2026 RFB Cyber</p>
        <div className="flex gap-6">
          <a href="https://vk.com/rusfurbal" className="hover:text-pink-400 transition">VK</a>
          <a href="#" className="hover:text-cyan-400 transition">Telegram</a>
        </div>
      </footer>
    </div>
  );
}
