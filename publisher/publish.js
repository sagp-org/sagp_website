import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

import {
  renderCallHtml,
  renderCallText,
  renderCallSubject,
} from "./renderers/email/CallEmailRenderer.js";

import {
  renderEventHtml,
  renderEventText,
  renderEventSubject,
} from "./renderers/email/EventEmailRenderer.js";

function loadCall(id) {
  const file = path.resolve(`content/calls/${id}.yaml`);
  const data = yaml.load(fs.readFileSync(file, "utf8"));
  return data.call;
}

function loadEvent(type, year) {
  const file = path.resolve(`content/events/${type}/${year}.yaml`);
  const data = yaml.load(fs.readFileSync(file, "utf8"));
  return data.event;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

const [kind, id] = process.argv.slice(2);

if (!kind || !id) {
  console.error("Usage:");
  console.error("  node publisher/publish.js call <call_id>");
  console.error("  node publisher/publish.js event <event_type>/<year>");
  process.exit(1);
}

ensureDir("dist/email");

if (kind === "call") {
  const call = loadCall(id);

  fs.writeFileSync(`dist/email/${id}.html`, renderCallHtml(call));
  fs.writeFileSync(`dist/email/${id}.txt`, renderCallText(call));
  fs.writeFileSync(`dist/email/${id}.subject.txt`, renderCallSubject(call) + "\n");

  console.log("Published email assets:");
  console.log(`  dist/email/${id}.html`);
  console.log(`  dist/email/${id}.txt`);
  console.log(`  dist/email/${id}.subject.txt`);
  process.exit(0);
}

if (kind === "event") {
  const [type, year] = id.split("/");
  const event = loadEvent(type, year);
  const safeId = `${type}_${year}`;

  fs.writeFileSync(`dist/email/${safeId}.html`, renderEventHtml(event));
  fs.writeFileSync(`dist/email/${safeId}.txt`, renderEventText(event));
  fs.writeFileSync(`dist/email/${safeId}.subject.txt`, renderEventSubject(event) + "\n");

  console.log("Published email assets:");
  console.log(`  dist/email/${safeId}.html`);
  console.log(`  dist/email/${safeId}.txt`);
  console.log(`  dist/email/${safeId}.subject.txt`);
  process.exit(0);
}

console.error(`Unsupported kind: ${kind}`);
process.exit(1);
