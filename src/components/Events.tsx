"use client";

import { useState, useEffect } from "react";
import { Card } from "@heroui/react";
import AdminPanel from "./AdminPanel";
import { getEventStatus, getStatusColor } from "./EventStatus";

type EventType = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

export default function Events({ isAdmin }: { isAdmin: boolean }) {
  const [events, setEvents] = useState<EventType[]>([]);

  const addEvent = (event: EventType) => {
    setEvents((prev) => [...prev, event]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => [...prev]); // триггер обновления
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {events.length === 0 && (
        <p className="text-gray-400 text-center">Пока нет событий.</p>
      )}

      {events.map((event) => {
        const status = getEventStatus(event.startTime, event.endTime);
        const color = getStatusColor(status);

        return (
          <Card
            key={event.id}
            className="bg-gray-800/70 border border-gray-700 p-6 shadow-md"
          >
            <h4 className="text-2xl font-bold text-cyan-400">{event.title}</h4>
            <p className="text-gray-300 mb-3">{event.description}</p>
            <p className={`${color} font-semibold`}>Статус: {status}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.startTime).toLocaleString("ru-RU", {
                timeZone: "Asia/Yekaterinburg",
              })}{" "}
              –{" "}
              {new Date(event.endTime).toLocaleString("ru-RU", {
                timeZone: "Asia/Yekaterinburg",
              })}
            </p>
          </Card>
        );
      })}

      {isAdmin && <AdminPanel onAdd={addEvent} />}
    </div>
  );
}
