import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

function normalizeDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function loadEvent(type, year) {
  const file = path.resolve(`content/events/${type}/${year}.yaml`);
  const data = yaml.load(fs.readFileSync(file, "utf8"));
  return data.event;
}

export function loadEvents(type) {
  const dir = path.resolve(`content/events/${type}`);

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => {
      const data = yaml.load(fs.readFileSync(path.join(dir, file), "utf8"));
      return data.event;
    })
    .sort((a, b) => {
      const ad = normalizeDate(a.dates?.start);
      const bd = normalizeDate(b.dates?.start);
      return bd.localeCompare(ad);
    });
}

export function loadLatestEvent(type) {
  return loadEvents(type)[0] ?? null;
}

export function loadUpcomingEvents() {
  const types = [
    "annual_conference",
    "distinguished_lectureship",
  ];

  const today = todayIso();

  return types
    .flatMap((type) => loadEvents(type))
    .filter((event) => normalizeDate(event.dates?.end ?? event.dates?.start) >= today)
    .sort((a, b) => {
      const ad = normalizeDate(a.dates?.start);
      const bd = normalizeDate(b.dates?.start);
      return ad.localeCompare(bd);
    });
}

export function loadAllEvents() {
  const types = [
    "annual_conference",
    "distinguished_lectureship",
  ];

  return types.flatMap((type) => loadEvents(type));
}

export function loadLastEvent() {
  const today = todayIso();

  return loadAllEvents()
    .filter((event) => normalizeDate(event.dates?.start) < today)
    .sort((a, b) => {
      const ad = normalizeDate(a.dates?.start);
      const bd = normalizeDate(b.dates?.start);
      return bd.localeCompare(ad);
    })[0] ?? null;
}
