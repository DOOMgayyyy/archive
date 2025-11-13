"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "@heroui/react";

export default function AdminPanel({ onAdd }: { onAdd: (event: any) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAdd = () => {
    if (!title || !startTime || !endTime) return alert("Заполните все поля!");
    onAdd({
      id: Date.now(),
      title,
      description,
      startTime,
      endTime,
    });
    setTitle("");
    setDescription("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 mt-6">
      <h4 className="text-xl font-bold text-cyan-400 mb-4">Добавить новое событие</h4>

        <div className="flex flex-col gap-4">
        <Input label="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="datetime-local"
          label="Начало (ЕКБ)"
          placeholder=" " 
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <Input
          type="datetime-local"
          label="Конец (ЕКБ)"
          placeholder=" " 
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <Button onClick={handleAdd} className="bg-cyan-500 hover:bg-cyan-400 text-black">
          Добавить событие
        </Button>
      </div>
    </div>
  );
}
