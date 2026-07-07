# SAGP Knowledge Platform Constitution

## Purpose

The purpose of this repository is to preserve, organize, and publish the
institutional knowledge of the Society for Ancient Greek Philosophy.

The website is one presentation of this knowledge. Future AI systems,
search engines, document generators, calendars, email systems, and
institutional tools are additional presentations.

The repository models the Society—not merely its website.

---

# I. Canonical Knowledge

Institutional knowledge shall exist exactly once.

Every fact about the Society should have one authoritative representation.

Presentation systems must derive their information from canonical
knowledge objects rather than duplicating facts.

---

# II. Derived Presentation

Pages, archives, summaries, homepages, schedules, PDFs, announcements,
and AI assistants are derived views.

Presentation should never become an independent source of truth.

---

# III. Ontology Before Implementation

When new Society activities are discovered, they should first be modeled
as ontology objects.

Software should be written only after the ontology is understood.

---

# IV. Observation Before Generalization

The ontology grows through observation.

New primitives are introduced because the Society possesses genuine new
institutional concepts—not because they appear theoretically elegant.

Examples:

- Events
- Calls

Future examples may include:

- Governance
- Awards
- Elections

---

# V. Separation of Responsibilities

Canonical knowledge contains institutional facts.

Loaders retrieve canonical knowledge.

Queries answer questions over canonical knowledge.

Renderers present ontology objects.

Pages compose renderers.

Each layer has one responsibility.

---

# VI. AI-Centered Publishing

Artificial intelligence should operate primarily on canonical knowledge
objects.

The preferred AI workflow is:

~~~text
Source Document
        ↓
Knowledge Extraction
        ↓
Canonical YAML
        ↓
Validation
        ↓
Publication
~~~

AI systems should modify knowledge rather than webpages.

---

# VII. Repository Philosophy

The repository should become easier to maintain as additional knowledge is
added.

Adding a new Annual Conference should primarily consist of adding one
canonical knowledge object.

Adding a new Distinguished Lecture should primarily consist of adding one
canonical knowledge object.

The architecture should eliminate duplication rather than manage it.

