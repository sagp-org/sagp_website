import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

function loadCall(id) {
  const file = path.resolve(`content/calls/${id}.yaml`);
  return yaml.load(fs.readFileSync(file, "utf8")).call;
}

function formatDate(value) {
  const d = value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function renderCallEmail(call) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${call.title}</title>
</head>
<body style="margin:0;padding:0;background:#f6f1e8;font-family:Georgia,serif;color:#2d251b;">
  <div style="max-width:720px;margin:0 auto;padding:40px 24px;">
    <div style="background:#fffaf0;border:1px solid #d8c6a3;border-radius:18px;padding:36px;">
      <p style="text-transform:uppercase;letter-spacing:.14em;color:#9a6a1f;font-size:13px;margin:0 0 12px;">
        ${call.hero.kicker}
      </p>

      <h1 style="font-size:34px;line-height:1.15;margin:0 0 16px;">
        ${call.hero.title}
      </h1>

      <p style="font-size:19px;line-height:1.5;margin:0 0 28px;">
        ${call.summary}
      </p>

      <h2 style="font-size:22px;margin:32px 0 12px;">Deadlines</h2>

      <ul style="font-size:17px;line-height:1.6;padding-left:22px;">
        ${call.deadlines.map(d => `
          <li>
            <strong>${d.label}:</strong> ${formatDate(d.date)}
            ${d.note ? ` — ${d.note}` : ""}
          </li>
        `).join("")}
      </ul>

      <h2 style="font-size:22px;margin:32px 0 12px;">Submission</h2>

      <p style="font-size:17px;line-height:1.6;">
        Email submissions to
        <a href="mailto:${call.submission.contact.email}" style="color:#8a5a13;">
          ${call.submission.contact.name}
        </a>.
      </p>

      <ul style="font-size:17px;line-height:1.6;padding-left:22px;">
        ${call.submission.instructions.map(i => `<li>${i}</li>`).join("")}
      </ul>

      <div style="background:#f3ead8;border-left:4px solid #9a6a1f;padding:18px;margin-top:28px;font-size:16px;line-height:1.5;">
        Attach a blind-review paper in
        ${call.submission.attachment.formats.map(f => `.${f}`).join(", ")} format.
        Maximum length: ${call.submission.attachment.max_words} words.
        <br><br>
        ${call.submission.attachment.note}
      </div>
    </div>
  </div>
</body>
</html>`;
}

const [kind, id] = process.argv.slice(2);

if (kind !== "call" || !id) {
  console.error("Usage: node scripts/render_email.js call <call_id>");
  process.exit(1);
}

const call = loadCall(id);
console.log(renderCallEmail(call));
