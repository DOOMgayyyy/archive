"use client"; 
import Image from "next/image";
import Link from "next/link";
import { Card } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { participants } from "../lib/data"; // Импортируем наших участников

export default function ParticipantsPage() {
  return (
    <div className="bg-[#0f111b] text-gray-100 min-h-screen font-sans">
      {/* Мы можем добавить простой хэдер или использовать 
        общий <Layout>, если он у вас есть. 
        Пока сделаем простой вариант с навигацией.
      */}
      <div className="px-6 sm:px-20 py-16">
        <header className="mb-12">
          {/* Ссылка для возврата на главную */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition mb-4"
          >
            <ArrowLeft size={20} />
            Назад на главную
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-pink-400">
            Участники Фестиваля
          </h1>
        </header>
        
        {/* Тот же самый код для отображения карточек, что был на главной */}
        <main>
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
        </main>
      </div>

      {/* Вы можете также добавить футер, импортировав его */}
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