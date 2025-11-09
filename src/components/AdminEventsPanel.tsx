"use client";

import { useState } from "react";
import { Button, Input, Textarea, Card } from "@heroui/react";
import type { Event } from "@/components/Events";

export default function AdminEventsPanel({ onAdd }: { onAdd: (event: Event) => void }) {
  const [newEvent, setNewEvent] = useState({ title: "", time: "", description: "" });

  const addEvent = () => {
    if (!newEvent.title || !newEvent.time) return alert("Заполни все поля!");

    const event: Event = {
      id: Date.now(),
      title: newEvent.title,
      time: newEvent.time,
      description: newEvent.description,
      status: "queued",
    };
    onAdd(event);
    setNewEvent({ title: "", time: "", description: "" });
  };

  return (
    <Card className="p-6 bg-gray-900/70 border border-gray-700 mt-8">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">Добавить событие</h2>
      <div className="flex flex-col gap-3">
        <Input
          label="Название"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <Input
          label="Время (чч:мм)"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
        />
        <Textarea
          label="Описание"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <Button onClick={addEvent} className="bg-cyan-500 hover:bg-cyan-400 text-black">
          Добавить
        </Button>
      </div>
    </Card>
  );
}
