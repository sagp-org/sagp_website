# Implementation of the SAGP Digital Platform

## Purpose

This document describes the current software realization of the Constitution
and Ontology.

Unlike the Constitution and Ontology, this document is expected to evolve
frequently.

---

# Current Architecture

The current platform consists of:

- Astro static website
- Git repository
- GitHub Pages deployment
- YAML knowledge objects
- AI-assisted content generation

---

# Design Philosophy

The implementation renders scholarly knowledge rather than storing webpages.

Knowledge objects are represented independently of presentation.

Multiple renderers may consume the same underlying knowledge.

Examples include:

- website
- printable conference programs
- posters
- email announcements
- future mobile applications

---

# Artificial Intelligence

Artificial intelligence is responsible for assisting in the creation of
structured knowledge objects.

AI should not directly generate webpages.

Instead, AI should populate objects that conform to the Ontology.

---

# Future Work

Possible future renderers include:

- conference schedule generator
- archival search interface
- membership portal
- speaker directory
- digital exhibits


---

# Canonical and Derived Rendering

Renderers faithfully present canonical ontology objects.

Renderers may additionally compute derived information when it improves the
user experience.

Examples include:

- visitor-local time
- maps
- driving directions
- downloadable calendar entries
- AI-generated summaries

Derived information must always be clearly distinguishable from canonical
Society information.

For example, the website renderer displays:

    Saturday, Nov. 15 · 7:00am PST

followed by

    Your local time: 10:00am EST

The first line is canonical.

The second line is derived.

