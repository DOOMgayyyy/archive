"use client";

import { useState } from "react";
import { Accordion, AccordionItem, Badge, Button, Input, Textarea } from "@heroui/react";
import { motion } from "framer-motion";

export type Event = {
  id: number;
  title: string;
  time: string;
  description: string;
  status: "queued" | "active" | "finished";
};

const initialEvents: Event[] = [
  { id: 1, title: "Косплей-шоу", time: "12:00", description: "Главное косплей-шоу фестиваля", status: "queued" },
  { id: 2, title: "VR-турнир", time: "14:00", description: "Сражение на киберполях", status: "active" },
  { id: 3, title: "Мастер-класс по робототехнике", time: "16:00", description: "Собери своего робота!", status: "finished" },
];

interface EventsProps {
  isAdmin?: boolean;
}

export default function Events({ isAdmin = false }: EventsProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const statusColor = (status: Event["status"]) => {
    switch (status) {
      case "queued": return "default";
      case "active": return "primary";
      case "finished": return "secondary";
    }
  };

  const statusLabel = (status: Event["status"]) => {
    switch (status) {
      case "queued": return "Ожидает";
      case "active": return "Идёт";
      case "finished": return "Завершено";
    }
  };

  const updateEvent = (id: number, field: keyof Event, value: string | Event["status"]) => {
    setEvents(prev =>
      prev.map(ev => (ev.id === id ? { ...ev, [field]: value } : ev))
    );
  };

  return (
    <Accordion variant="bordered" className="w-full">
      {events.map(ev => (
        <AccordionItem
          key={ev.id}
          aria-label={ev.title}
          title={
            <div className="flex justify-between items-center w-full pr-4">
              <span className="font-bold text-gray-100">{ev.title} — {ev.time}</span>
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
                  onChange={e => updateEvent(ev.id, "title", e.target.value)}
                  placeholder="Название события"
                  label="Редактировать название"
                  className="text-gray-100"
                />
                <Input
                  value={ev.time}
                  onChange={e => updateEvent(ev.id, "time", e.target.value)}
                  placeholder="Время начала"
                  label="Редактировать время"
                />
                <Textarea
                  value={ev.description}
                  onChange={e => updateEvent(ev.id, "description", e.target.value)}
                  placeholder="Описание события"
                  label="Редактировать описание"
                />
                <div className="flex gap-2">
                  {(["queued","active","finished"] as const).map(status => (
                    <Button
                      key={status}
                      size="sm"
                      className={`${
                        ev.status === status ? "bg-cyan-500 text-black" : "bg-gray-700 text-gray-200"
                      }`}
                      onClick={() => updateEvent(ev.id, "status", status)}
                    >
                      {statusLabel(status)}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
