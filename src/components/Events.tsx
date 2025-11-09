"use client";

import { useState, useEffect } from "react";
import { Accordion, AccordionItem, Badge, Button, Input, Textarea } from "@heroui/react";
import { motion } from "framer-motion";

export type Event = {
  id: number;
  title: string;
  timeStart: string;
  timeEnd: string;
  description: string;
  status?: "queued" | "active" | "finished";
};

interface EventsProps {
  isAdmin?: boolean;
}

// 🕒 Функция определения статуса по Екатеринбургу (UTC+5)
function getEventStatus(startTime: string, endTime: string): "queued" | "active" | "finished" {
  const now = new Date();
  const ekbOffset = 5 * 60; // UTC+5
  const nowEkb = new Date(now.getTime() + (ekbOffset - now.getTimezoneOffset()) * 60000);

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (nowEkb < start) return "queued";
  if (nowEkb >= start && nowEkb <= end) return "active";
  return "finished";
}

export default function Events({ isAdmin = false }: EventsProps) {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Косплей-шоу",
      timeStart: "2026-07-20T12:00",
      timeEnd: "2026-07-20T13:00",
      description: "Главное косплей-шоу фестиваля",
    },
    {
      id: 2,
      title: "VR-турнир",
      timeStart: "2026-07-20T14:00",
      timeEnd: "2026-07-20T15:30",
      description: "Сражение на киберполях",
    },
    {
      id: 3,
      title: "Мастер-класс по робототехнике",
      timeStart: "2026-07-20T16:00",
      timeEnd: "2026-07-20T17:00",
      description: "Собери своего робота!",
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    timeStart: "",
    timeEnd: "",
  });

  // 💡 Автообновление статусов каждые 30 секунд
  useEffect(() => {
    const updateStatuses = () => {
      setEvents((prev) =>
        prev.map((ev) => ({
          ...ev,
          status: getEventStatus(ev.timeStart, ev.timeEnd),
        }))
      );
    };
    updateStatuses();
    const interval = setInterval(updateStatuses, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = (status: Event["status"]) => {
    switch (status) {
      case "queued": return "warning";
      case "active": return "success";
      case "finished": return "danger";
      default: return "default";
    }
  };

  const statusLabel = (status: Event["status"]) => {
    switch (status) {
      case "queued": return "Ожидает";
      case "active": return "Идёт";
      case "finished": return "Завершено";
      default: return "Неизвестно";
    }
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.timeStart || !newEvent.timeEnd)
      return alert("Заполни все поля: название и время!");

    const newEv: Event = {
      id: Date.now(),
      ...newEvent,
      status: getEventStatus(newEvent.timeStart, newEvent.timeEnd),
    };

    setEvents((prev) => [...prev, newEv]);
    setNewEvent({ title: "", description: "", timeStart: "", timeEnd: "" });
  };

  const updateEvent = (id: number, field: keyof Event, value: string) => {
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, [field]: value } : ev)));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 rounded-lg border border-gray-700 bg-gray-900/50 flex flex-col gap-3"
        >
          <h3 className="text-lg font-bold text-cyan-400">Добавить событие</h3>
          <Input
            label="Название"
            placeholder="Введите название"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <Textarea
            label="Описание"
            placeholder="Краткое описание события"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <Input
            label="Начало"
            type="datetime-local"
            value={newEvent.timeStart}
            onChange={(e) => setNewEvent({ ...newEvent, timeStart: e.target.value })}
          />
          <Input
            label="Окончание"
            type="datetime-local"
            value={newEvent.timeEnd}
            onChange={(e) => setNewEvent({ ...newEvent, timeEnd: e.target.value })}
          />
          <Button onClick={addEvent} className="bg-cyan-500 text-black font-semibold hover:bg-cyan-400">
            Добавить
          </Button>
        </motion.div>
      )}

      <Accordion variant="bordered" className="w-full">
        {events.map((ev) => (
          <AccordionItem
            key={ev.id}
            aria-label={ev.title}
            title={
              <div className="flex justify-between items-center w-full pr-4">
                <span className="font-bold text-gray-100">
                  {ev.title} — {new Date(ev.timeStart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <Badge color={statusColor(ev.status)} variant="flat">
                  {statusLabel(ev.status)}
                </Badge>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <p className="text-gray-300">{ev.description}</p>

              {isAdmin && (
                <div className="flex flex-col gap-2 border-t border-gray-700 pt-2">
                  <Input
                    value={ev.title}
                    onChange={(e) => updateEvent(ev.id, "title", e.target.value)}
                    label="Редактировать название"
                  />
                  <Textarea
                    value={ev.description}
                    onChange={(e) => updateEvent(ev.id, "description", e.target.value)}
                    label="Редактировать описание"
                  />
                </div>
              )}
            </motion.div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
