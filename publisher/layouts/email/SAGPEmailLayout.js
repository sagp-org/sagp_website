function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderSAGPEmailLayout({
  title,
  preheader = "",
  body,
}) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f6f1e8;font-family:Georgia,'Times New Roman',serif;color:#2d251b;">
  <div style="max-width:760px;margin:0 auto;padding:42px 24px;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>

    <div style="background:#fffaf0;border:1px solid #d8c6a3;border-radius:20px;overflow:hidden;box-shadow:0 14px 40px rgba(45,37,27,.10);">

      <div style="text-align:center;padding:34px 42px 28px;border-bottom:1px solid #e4d4b8;">
        <div style="font-size:34px;line-height:1;margin-bottom:10px;">🏛️</div>

        <div style="font-size:30px;letter-spacing:.08em;font-weight:600;margin-bottom:6px;">
          SAGP
        </div>

        <div style="font-size:16px;color:#6b5a45;">
          Society for Ancient Greek Philosophy
        </div>
      </div>

      ${body}

      <div style="padding:26px 42px;background:#2d251b;color:#f8efe0;font-size:14px;line-height:1.6;text-align:center;">
        <strong>Society for Ancient Greek Philosophy</strong><br>
        <a href="https://societyforancientgreekphilosophy.org" style="color:#f8efe0;">
          societyforancientgreekphilosophy.org
        </a>
        <br><br>
        Visit the Society website for upcoming events, calls, membership information,
        and Society activities.
      </div>

    </div>
  </div>
</body>
</html>`;
}
