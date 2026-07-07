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

export function loadCalls() {
  const dir = path.resolve("content/calls");

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => {
      const data = yaml.load(fs.readFileSync(path.join(dir, file), "utf8"));
      return data.call;
    })
    .sort((a, b) => {
      const ad = normalizeDate(a.deadlines?.[0]?.date);
      const bd = normalizeDate(b.deadlines?.[0]?.date);
      return ad.localeCompare(bd);
    });
}

export function loadActiveCalls() {
  const today = todayIso();

  return loadCalls().filter((call) =>
    call.status === "active" &&
    call.deadlines?.some((deadline) => normalizeDate(deadline.date) >= today)
  );
}
