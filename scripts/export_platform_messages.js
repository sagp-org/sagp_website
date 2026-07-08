import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import yaml from "js-yaml";

import {
  renderCallHtml,
  renderCallText,
  renderCallSubject,
} from "../publisher/renderers/email/CallEmailRenderer.js";

import {
  renderEventHtml,
  renderEventText,
  renderEventSubject,
} from "../publisher/renderers/email/EventEmailRenderer.js";

const websiteRoot = process.cwd();
const platformRoot = path.resolve(websiteRoot, "..");
const outputDir = path.join(platformRoot, "output", "messages");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function hashId(value) {
  return crypto
    .createHash("sha1")
    .update(value)
    .digest("hex")
    .slice(0, 12);
}

function nowIso() {
  return new Date().toISOString();
}

function writeMessage({ sourceId, title, subject, richHtml, plainText, sourceYaml, messageType }) {
  const messageId = `msg_${hashId(sourceId)}`;

  const message = {
    title,
    subject,
    rich_html: richHtml,
    plain_text: plainText,
    source_yaml: sourceYaml,
    message_type: messageType,
    attachments_or_links: [],
    message_id: messageId,
    generated_at: nowIso(),
    source_engine: "publishing",
  };

  const outputPath = path.join(outputDir, `${messageId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(message, null, 2), "utf8");

  console.log(`${messageId}: ${title}`);
}

function loadYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, "utf8"));
}

function exportCalls() {
  const callsDir = path.join(websiteRoot, "content", "calls");
  if (!fs.existsSync(callsDir)) return;

  for (const filename of fs.readdirSync(callsDir).sort()) {
    if (!filename.endsWith(".yaml")) continue;

    const fullPath = path.join(callsDir, filename);
    const data = loadYaml(fullPath);
    const call = data.call;
    const id = filename.replace(/\.yaml$/, "");

    writeMessage({
      sourceId: `call:${id}`,
      title: `Call: ${call.hero?.title ?? call.title ?? id}`,
      subject: renderCallSubject(call),
      richHtml: renderCallHtml(call),
      plainText: renderCallText(call),
      sourceYaml: path.relative(platformRoot, fullPath),
      messageType: "call",
    });
  }
}

function exportEvents() {
  const eventsDir = path.join(websiteRoot, "content", "events");
  if (!fs.existsSync(eventsDir)) return;

  for (const eventType of fs.readdirSync(eventsDir).sort()) {
    const typeDir = path.join(eventsDir, eventType);
    if (!fs.statSync(typeDir).isDirectory()) continue;

    for (const filename of fs.readdirSync(typeDir).sort()) {
      if (!filename.endsWith(".yaml")) continue;

      const fullPath = path.join(typeDir, filename);
      const data = loadYaml(fullPath);
      const event = data.event;
      const year = filename.replace(/\.yaml$/, "");

      writeMessage({
        sourceId: `event:${eventType}:${year}`,
        title: `Event: ${event.title}`,
        subject: renderEventSubject(event),
        richHtml: renderEventHtml(event),
        plainText: renderEventText(event),
        sourceYaml: path.relative(platformRoot, fullPath),
        messageType: `event:${eventType}`,
      });
    }
  }
}

ensureDir(outputDir);
exportCalls();
exportEvents();
