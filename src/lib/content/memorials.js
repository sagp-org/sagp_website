import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const MEMORIALS_DIR = path.resolve("content/memorials");

export function loadMemorials() {
  if (!fs.existsSync(MEMORIALS_DIR)) return [];

  return fs
    .readdirSync(MEMORIALS_DIR)
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => {
      const data = yaml.load(
        fs.readFileSync(path.join(MEMORIALS_DIR, file), "utf8")
      );
      return data.memorial;
    });
}

export function loadMemorial(id) {
  return loadMemorials().find((memorial) => memorial.id === id) ?? null;
}

export function loadFeaturedMemorial() {
  return loadMemorials().find((memorial) => memorial.status === "featured") ?? null;
}
