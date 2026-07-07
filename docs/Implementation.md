# SAGP Knowledge Platform Implementation

## Purpose

This document describes how the ontology is implemented in software.

The implementation exists to publish canonical institutional knowledge while
maintaining a strict separation between knowledge and presentation.

---

# Overall Architecture

~~~text
Canonical Knowledge Objects
        │
        ▼
Content Loaders
        │
        ▼
Queries
        │
        ▼
Renderers
        │
        ▼
Pages
~~~

Each layer has one responsibility.

---

# Repository Layout

~~~text
content/
    events/
    calls/
    governance/
    people/
    organizations/

src/
    components/
    layouts/
    lib/
        content/
    pages/
~~~

---

# Canonical Knowledge

Canonical knowledge lives under:

~~~text
content/
~~~

Knowledge is represented as structured YAML.

Knowledge objects are authoritative.

No other location should become an independent source of truth.

---

# Content Loaders

Content loaders live in:

~~~text
src/lib/content/
~~~

Examples:

- events.js
- calls.js
- current.js

Responsibilities include:

- reading YAML
- parsing YAML
- normalization
- sorting
- simple validation

Loaders do not render presentation.

---

# Queries

Queries answer questions about the knowledge base.

Examples:

- loadEvents()
- loadLatestEvent()
- loadUpcomingEvents()
- loadLastEvent()
- loadCurrentItem()

Queries represent reusable institutional questions rather than webpage logic.

---

# Renderers

Renderers present ontology objects.

Examples include:

- EventRenderer
- EventCollection
- CallRenderer
- CurrentItem

Renderers know how to display knowledge.

They do not create knowledge.

---

# Pages

Pages compose renderers.

A page should contain as little factual information as possible.

Instead, pages ask questions such as:

- What is the current event?
- What is the current call?
- What conferences exist?
- What lectures exist?

Pages should rarely contain hardcoded institutional facts.

---

# AI Publishing Pipeline

The intended publishing workflow is:

~~~text
Word Document
PDF
Email
Announcement
        │
        ▼
AI Knowledge Extraction
        │
        ▼
Canonical YAML
        │
        ▼
Validation
        │
        ▼
Git Commit
        │
        ▼
Automatic Deployment
~~~

The AI should operate primarily on canonical knowledge objects.

---

# Single Source of Truth

The implementation is designed around one engineering principle:

**Every institutional fact should have exactly one authoritative
representation.**

Presentation is derived.

Knowledge is canonical.

---

# Extensibility

Future ontology domains should be added by:

1. defining the ontology object;
2. creating canonical YAML;
3. implementing a loader;
4. implementing a renderer;
5. composing the renderer into pages.

The architecture should become simpler—not more complex—as the repository grows.

---

Architecture Version: 2.0

July 2026

Knowledge-Centric Architecture

