import type { Event } from "@/components/Events";

export function getEventStatus(time: string): Event["status"] {
  const [hours, minutes] = time.split(":").map(Number);

  const now = new Date();
  const ekbNow = new Date(now.getTime() + (5 - now.getTimezoneOffset() / 60) * 60 * 60 * 1000);

  const eventTime = new Date(ekbNow);
  eventTime.setHours(hours);
  eventTime.setMinutes(minutes);
  eventTime.setSeconds(0);

  const diffMs = ekbNow.getTime() - eventTime.getTime();

  if (diffMs < 0) return "queued"; // ещё не началось
  if (diffMs >= 0 && diffMs <= 60 * 60 * 1000) return "active"; // идёт час
  return "finished";
}
