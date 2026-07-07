import { loadUpcomingEvents, loadLastEvent } from "./events.js";
import { loadActiveCalls } from "./calls.js";

function normalizeDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function firstFutureDeadline(call) {
  const today = new Date().toISOString().slice(0, 10);

  return call.deadlines
    ?.map((deadline) => normalizeDate(deadline.date))
    .filter((date) => date >= today)
    .sort()[0] ?? "";
}

export function loadCurrentItem() {
  const activeCall = loadActiveCalls()
    .sort((a, b) => firstFutureDeadline(a).localeCompare(firstFutureDeadline(b)))[0];

  if (activeCall) {
    return {
      kind: "call",
      label: "Current Call",
      item: activeCall,
    };
  }

  const upcomingEvent = loadUpcomingEvents()[0];

  if (upcomingEvent) {
    return {
      kind: "event",
      label: "Upcoming Event",
      item: upcomingEvent,
    };
  }

  const lastEvent = loadLastEvent();

  if (lastEvent) {
    return {
      kind: "event",
      label: "Last Event",
      item: lastEvent,
    };
  }

  return null;
}
