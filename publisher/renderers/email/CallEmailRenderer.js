import { renderSAGPEmailLayout } from "../../layouts/email/SAGPEmailLayout.js";

function normalizeDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function formatDate(value) {
  const dateString = normalizeDate(value);
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderCallSubject(call) {
  return `SAGP | ${call.hero?.title ?? call.title}`;
}

export function renderCallText(call) {
  return `====================================================

SAGP
Society for Ancient Greek Philosophy

====================================================

${call.hero?.kicker?.toUpperCase() ?? "CALL"}

${call.hero?.title ?? call.title}

${call.summary}

Deadlines:
${call.deadlines.map((d) => `- ${d.label}: ${formatDate(d.date)}${d.note ? ` (${d.note})` : ""}`).join("\n")}

Submission:
Email submissions to ${call.submission.contact.name} at ${call.submission.contact.email}.

Please include:
${call.submission.instructions.map((i) => `- ${i}`).join("\n")}

Attachment:
Blind-review paper in ${call.submission.attachment.formats.map((f) => `.${f}`).join(", ")} format.
Maximum length: ${call.submission.attachment.max_words} words.

${call.submission.attachment.note}

====================================================

Society for Ancient Greek Philosophy
https://societyforancientgreekphilosophy.org
`;
}

export function renderCallHtml(call) {
  const subject = renderCallSubject(call);

  const body = `
      <div style="padding:40px 42px 30px;border-bottom:1px solid #e4d4b8;">
        <p style="text-transform:uppercase;letter-spacing:.16em;color:#9a6a1f;font-size:13px;margin:0 0 14px;font-family:Arial,sans-serif;">
          ${escapeHtml(call.hero?.kicker ?? "SAGP")}
        </p>

        <h1 style="font-size:38px;line-height:1.12;margin:0 0 18px;font-weight:500;">
          ${escapeHtml(call.hero?.title ?? call.title)}
        </h1>

        <p style="font-size:20px;line-height:1.5;margin:0;color:#5d5144;">
          ${escapeHtml(call.hero?.subtitle ?? call.summary)}
        </p>
      </div>

      <div style="padding:36px 42px;">
        <p style="font-size:18px;line-height:1.6;margin:0 0 30px;">
          ${escapeHtml(call.summary)}
        </p>

        <h2 style="font-size:23px;margin:34px 0 14px;font-weight:500;">
          Deadlines
        </h2>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 28px;">
          ${call.deadlines.map((d) => `
          <tr>
            <td style="padding:13px 0;border-bottom:1px solid #eadcc4;font-size:17px;">
              <strong>${escapeHtml(d.label)}</strong>
            </td>
            <td style="padding:13px 0;border-bottom:1px solid #eadcc4;text-align:right;font-size:17px;">
              ${escapeHtml(formatDate(d.date))}
              ${d.note ? `<br><span style="font-size:14px;color:#8a6d43;">${escapeHtml(d.note)}</span>` : ""}
            </td>
          </tr>`).join("")}
        </table>

        <h2 style="font-size:23px;margin:34px 0 14px;font-weight:500;">
          Submission
        </h2>

        <p style="font-size:17px;line-height:1.6;">
          Email submissions to
          <a href="mailto:${escapeHtml(call.submission.contact.email)}" style="color:#8a5a13;">
            ${escapeHtml(call.submission.contact.name)}
          </a>.
        </p>

        <ul style="font-size:17px;line-height:1.6;padding-left:22px;margin-top:10px;">
          ${call.submission.instructions.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}
        </ul>

        <div style="background:#f3ead8;border-left:4px solid #9a6a1f;padding:18px 20px;margin-top:30px;font-size:16px;line-height:1.55;">
          Attachments should be prepared for blind review and submitted as
          ${call.submission.attachment.formats.map((f) => `.${escapeHtml(f)}`).join(", ")}.
          <br><br>
          Maximum length: <strong>${escapeHtml(call.submission.attachment.max_words)} words</strong>, including footnotes and bibliography.
          <br><br>
          ${escapeHtml(call.submission.attachment.note)}
        </div>

        <p style="margin-top:34px;">
          <a href="mailto:${escapeHtml(call.submission.contact.email)}" style="display:inline-block;background:#8a5a13;color:#fff;text-decoration:none;padding:13px 20px;border-radius:999px;font-family:Arial,sans-serif;font-size:15px;">
            Submit by email
          </a>
        </p>
      </div>`;

  return renderSAGPEmailLayout({
    title: subject,
    preheader: call.summary,
    body,
  });
}
