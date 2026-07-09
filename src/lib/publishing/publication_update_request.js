function randomId() {
  return Math.random().toString(16).slice(2, 14);
}

function getNestedValue(object, path) {
  return path.split(".").reduce((current, part) => {
    if (!current) return "";
    return current[part] ?? "";
  }, object);
}

export function buildPublicationUpdateRequest({
  publicationType,
  publicationId,
  originalObject,
  changes,
  reason,
  requestedBy = "edward",
}) {
  const normalizedChanges = {};

  for (const [field, after] of Object.entries(changes)) {
    normalizedChanges[field] = {
      before: getNestedValue(originalObject, field),
      after,
    };
  }

  return {
    request_type: "publication_update",
    request_id: `pur_${randomId()}`,

    publication_type: publicationType,
    publication_id: publicationId,
    publication_title: originalObject.title,

    requested_at: new Date().toISOString(),
    requested_by: requestedBy,

    reason,

    context: {
      title: originalObject.title,
      status: originalObject.status,
      source_yaml: originalObject.source_yaml,
    },

    changes: normalizedChanges,
  };
}

export function downloadPublicationUpdate(request) {
  const filename =
    `publication_update_${request.publication_type}_` +
    `${request.publication_id.replace(/[\\/]/g, "_")}_` +
    `${request.request_id}.json`;

  const blob = new Blob(
    [JSON.stringify(request, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
