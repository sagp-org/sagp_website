import { renderSAGPEmailLayout } from "../../layouts/email/SAGPEmailLayout.js";

function normalizeDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function formatDate(value) {
  const [year, month, day] = normalizeDate(value).split("-").map(Number);
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

function normalizeParagraphs(value) {
  if (!value) return [];

  if (typeof value === "string") return [value];

  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeParagraphs(item));
  }

  if (typeof value === "object") {
    return normalizeParagraphs(
      value.paragraphs ??
      value.content ??
      value.body ??
      value.text
    );
  }

  return [];
}

function abstractParagraphs(event) {
  const section =
    event.sections?.find((section) =>
      /abstract/i.test(section.title ?? section.heading ?? "")
    );

  const presentationAbstract =
    event.sessions
      ?.flatMap((session) => session.presentations ?? [])
      ?.find((presentation) => presentation.abstract)
      ?.abstract;

  return normalizeParagraphs(
    event.abstract ??
    event.abstract_paragraphs ??
    event.details?.abstract ??
    event.content?.abstract ??
    presentationAbstract ??
    section
  );
}

export function renderEventSubject(event) {
  return `SAGP | ${event.title}`;
}

export function renderEventText(event) {
  return `====================================================

SAGP
Society for Ancient Greek Philosophy

====================================================

${event.title}

${event.description ?? event.hero?.subtitle ?? ""}

${abstractParagraphs(event).length ? `Abstract:
${abstractParagraphs(event).join("\n\n")}

` : ""}Date:
${formatDate(event.dates.start)}${event.dates.end && normalizeDate(event.dates.end) !== normalizeDate(event.dates.start) ? ` - ${formatDate(event.dates.end)}` : ""}

Location:
${event.location?.venue ?? "Online"}${event.dates?.timezone ? ` (${event.dates.timezone})` : ""}

Sessions:
${event.sessions?.map((session) => `- ${session.title}${session.date ? `, ${formatDate(session.date)}` : ""}${session.start_time ? ` at ${session.start_time}` : ""}`).join("\n") ?? ""}

Visit the SAGP website for full details.

====================================================

Society for Ancient Greek Philosophy
https://societyforancientgreekphilosophy.org
`;
}

export function renderEventHtml(event) {
  const subject = renderEventSubject(event);
  const abstract = abstractParagraphs(event);

  const body = `
      <div style="padding:40px 42px 30px;border-bottom:1px solid #e4d4b8;">
        <p style="text-transform:uppercase;letter-spacing:.16em;color:#9a6a1f;font-size:13px;margin:0 0 14px;font-family:Arial,sans-serif;">
          SAGP Event
        </p>

        <h1 style="font-size:38px;line-height:1.12;margin:0 0 18px;font-weight:500;">
          ${escapeHtml(event.title)}
        </h1>

        <p style="font-size:20px;line-height:1.5;margin:0;color:#5d5144;">
          ${escapeHtml(event.description ?? event.hero?.subtitle ?? "")}
        </p>
      </div>

      <div style="padding:36px 42px;">
        ${abstract.length ? `
          <h2 style="font-size:23px;margin:0 0 14px;font-weight:500;">
            Abstract
          </h2>

          ${abstract.map((paragraph) => `
            <p style="font-size:17px;line-height:1.65;margin:0 0 18px;">
              ${escapeHtml(paragraph)}
            </p>
          `).join("")}
        ` : ""}

        <h2 style="font-size:23px;margin:${abstract.length ? "34px" : "0"} 0 14px;font-weight:500;">
          Event Details
        </h2>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 28px;">
          <tr>
            <td style="padding:13px 0;border-bottom:1px solid #eadcc4;font-size:17px;"><strong>Date</strong></td>
            <td style="padding:13px 0;border-bottom:1px solid #eadcc4;text-align:right;font-size:17px;">
              ${escapeHtml(formatDate(event.dates.start))}
              ${event.dates.end && normalizeDate(event.dates.end) !== normalizeDate(event.dates.start) ? ` - ${escapeHtml(formatDate(event.dates.end))}` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding:13px 0;border-bottom:1px solid #eadcc4;font-size:17px;"><strong>Location</strong></td>
            <td style="padding:13px 0;border-bottom:1px solid #eadcc4;text-align:right;font-size:17px;">
              ${escapeHtml(event.location?.venue ?? "Online")}
              ${event.dates?.timezone ? `<br><span style="font-size:14px;color:#8a6d43;">${escapeHtml(event.dates.timezone)}</span>` : ""}
            </td>
          </tr>
        </table>

        ${event.sessions?.length ? `
          <h2 style="font-size:23px;margin:34px 0 14px;font-weight:500;">
            Program
          </h2>

          ${event.sessions.map((session) => `
            <div style="padding:18px 0;border-bottom:1px solid #eadcc4;">
              <h3 style="font-size:20px;margin:0 0 6px;font-weight:500;">
                ${escapeHtml(session.title)}
              </h3>

              <p style="margin:0 0 10px;color:#6b5a45;font-size:15px;">
                ${session.date ? escapeHtml(formatDate(session.date)) : ""}
                ${session.start_time ? ` · ${escapeHtml(session.start_time)}` : ""}
                ${session.timezone ? ` ${escapeHtml(session.timezone)}` : ""}
              </p>

              ${session.presentations?.length ? `
                <ul style="font-size:16px;line-height:1.55;padding-left:22px;margin:0;">
                  ${session.presentations.map((p) => `
                    <li>
                      <strong>${escapeHtml(p.title)}</strong>
                      ${p.presenters?.length ? `<br><span style="color:#6b5a45;">${escapeHtml(p.presenters.map((x) => x.name).join(", "))}</span>` : ""}
                    </li>
                  `).join("")}
                </ul>
              ` : ""}
            </div>
          `).join("")}
        ` : ""}

        <p style="margin-top:34px;">
          <a href="https://societyforancientgreekphilosophy.org" style="display:inline-block;background:#8a5a13;color:#fff;text-decoration:none;padding:13px 20px;border-radius:999px;font-family:Arial,sans-serif;font-size:15px;">
            Visit the SAGP website
          </a>
        </p>
      </div>`;

  return renderSAGPEmailLayout({
    title: subject,
    preheader: event.description ?? event.hero?.subtitle ?? "",
    body,
  });
}
