/** Build a root-relative URL that works with or without an Astro base path. */
export function sitePath(value = "") {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const path = String(value).replace(/^\/+/, "");
  return `${base}/${path}`;
}
