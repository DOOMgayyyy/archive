export type EventStatus = "ожидает" | "идет" | "завершено";

export function getEventStatus(startTime: string, endTime: string): EventStatus {
  const now = new Date();
  // Екатеринбург: UTC+5
  const nowEkaterinburg = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Yekaterinburg" }));
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (nowEkaterinburg < start) return "ожидает";
  if (nowEkaterinburg >= start && nowEkaterinburg <= end) return "идет";
  return "завершено";
}

export function getStatusColor(status: EventStatus) {
  switch (status) {
    case "ожидает":
      return "text-yellow-400";
    case "идет":
      return "text-green-400";
    case "завершено":
      return "text-red-500";
    default:
      return "text-gray-400";
  }
}
