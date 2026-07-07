# Society for Ancient Greek Philosophy Website

This repository contains the official website and digital publishing platform
for the **Society for Ancient Greek Philosophy (SAGP)**.

The project has two complementary goals:

1. Present the public face of the Society through a modern, accessible website.
2. Preserve and publish the scholarly life of the Society using a structured,
   implementation-independent knowledge model.

Although the current implementation uses Astro and GitHub Pages, the project is
designed so that its underlying knowledge remains independent of any
particular technology.

---

# Project Philosophy

The repository is organized around three foundational documents.

## Constitution

The Constitution defines the governing principles of the digital platform.

It answers the question:

> **Why does this platform exist?**

---

## Ontology

The Ontology defines the conceptual structure of the Society.

It answers the question:

> **What does the platform know?**

Rather than describing webpages, it defines scholarly entities such as:

- Society
- Person
- Event
- Session
- Presentation

---

## Implementation

The Implementation describes the current realization of the Constitution and
Ontology.

It answers the question:

> **How is the platform currently implemented?**

Unlike the Constitution and Ontology, this document is expected to evolve as
technology changes.

---

# Repository Structure

```
docs/
    Constitution.md
    Ontology.md
    Implementation.md

src/
    components/
    layouts/
    pages/
    styles/
    icons/

public/

```

---

# Development Philosophy

The project follows a simple hierarchy.

```
Constitution
      ↓
Ontology
      ↓
Implementation
      ↓
Software
      ↓
Rendered Artifacts
```

Software should always be viewed as an implementation of the Ontology rather
than the definition of it.

---

# Future Vision

The long-term goal is to support AI-assisted publishing.

Rather than generating webpages directly, artificial intelligence systems
should construct structured scholarly knowledge objects that conform to the
Ontology.

These knowledge objects may then be rendered into multiple forms, including:

- website pages
- conference programs
- schedule posters
- email announcements
- archival collections
- future digital applications

---

# Current Status

The website is currently under active development.

The present implementation focuses on:

- public website
- conference archive
- events
- membership information
- AI-assisted publishing workflow

