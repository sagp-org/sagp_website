export function platformUrl(path) {
  const base = "/sagp_website";
  const clean = String(path).replace(/^\//, "");
  return `${base}/${clean}`;
}

export async function loadPublishingIndex() {
  const response =
    await fetch(`${platformUrl("/platform/publishing_index.json")}?v=${Date.now()}`);

  if (!response.ok)
    throw new Error(`Could not load publishing index (${response.status})`);

  return response.json();
}

export function display(value) {
  return value ?? "";
}
