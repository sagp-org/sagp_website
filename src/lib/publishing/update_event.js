export const EVENT_UPDATE_FIELDS = [
  { key: "title", label: "Title", type: "text" },
  { key: "subtitle", label: "Subtitle", type: "text" },
  { key: "status", label: "Status", type: "text" },

  { key: "dates.start", label: "Start Date", type: "date" },
  { key: "dates.end", label: "End Date", type: "date" },
  { key: "dates.timezone", label: "Time Zone", type: "text" },
  { key: "dates.timezone_iana", label: "IANA Time Zone", type: "text" },

  { key: "location.mode", label: "Mode", type: "text" },
  { key: "location.venue", label: "Venue", type: "text" },
  { key: "location.city", label: "City", type: "text" },
  { key: "location.region", label: "Region", type: "text" },
  { key: "location.country", label: "Country", type: "text" },
  { key: "location.url", label: "Location URL", type: "text" },

  { key: "attendance.contact_email", label: "Attendance Contact", type: "email" },
  { key: "attendance.instructions", label: "Attendance Instructions", type: "textarea" },

  { key: "hero.kicker", label: "Hero Kicker", type: "text" },
  { key: "hero.title", label: "Hero Title", type: "text" },
  { key: "hero.subtitle", label: "Hero Subtitle", type: "text" },

  { key: "description", label: "Description", type: "textarea" },
];

export function getNestedValue(object, path) {
  return path.split(".").reduce((current, part) => {
    if (!current) return "";
    return current[part] ?? "";
  }, object);
}

export function setNestedValue(object, path, value) {
  const parts = path.split(".");
  let current = object;

  for (const part of parts.slice(0, -1)) {
    current[part] ??= {};
    current = current[part];
  }

  current[parts.at(-1)] = value;
}

export function collectEventForm() {
  const values = {};

  for (const field of EVENT_UPDATE_FIELDS) {
    const element = document.querySelector(`[data-event-field="${field.key}"]`);
    if (!element) continue;

    setNestedValue(values, field.key, element.value.trim());
  }

  return values;
}

export function collectEventChanges(originalEvent) {
  const changes = {};

  for (const field of EVENT_UPDATE_FIELDS) {
    const element = document.querySelector(`[data-event-field="${field.key}"]`);
    if (!element) continue;

    const original = String(getNestedValue(originalEvent, field.key) ?? "").trim();
    const current = element.value.trim();

    if (current !== original) {
      changes[field.key] = current;
    }
  }

  return changes;
}

export function validateEventForm() {
  const errors = [];

  const title = document.querySelector(`[data-event-field="title"]`)?.value.trim();
  const startDate = document.querySelector(`[data-event-field="dates.start"]`)?.value.trim();

  if (!title) errors.push("Title is required.");
  if (!startDate) errors.push("Start date is required.");

  return errors;
}
