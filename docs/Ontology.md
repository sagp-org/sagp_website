# SAGP Ontology

## Purpose

The ontology defines the conceptual structure of the Society's scholarly life.

It describes what exists within the digital platform without prescribing how
those concepts are implemented in software.

---

# Core Hierarchy

Society

→ Events

→ Sessions

→ Presentations

→ People

---

# Society

The Society is the highest-level entity.

It encompasses membership, governance, history, publications, and scholarly
activities.

---

# Event

An Event represents a scholarly gathering.

Examples include:

- Annual Conference
- Distinguished Lectureship
- Works in Progress
- Symposium
- Special Meeting

An Event contains one or more Sessions.

---

# Session

A Session is a scheduled block of scholarly activity.

A Session has:

- title
- moderator
- location
- date
- time

A Session contains one or more Presentations.

---

# Presentation

A Presentation is the fundamental scholarly contribution.

Examples include:

- paper
- lecture
- keynote
- response
- panel contribution
- discussion

Presentations are created by one or more People.

---

# Person

A Person represents an individual participating in the intellectual life of
the Society.

A Person may serve many roles simultaneously, including:

- member
- presenter
- moderator
- officer
- board member
- organizer
- distinguished lecturer

The Person is represented once and participates in many relationships.

---

# Principle

The ontology is intended to remain stable even as software implementations
change.


---

# Canonical and Derived Knowledge

The Ontology records the Society's canonical knowledge.

Canonical knowledge consists of facts explicitly asserted by the Society.

Examples include:

- titles
- presenters
- moderators
- dates
- start times
- official Society time zones

Some ontology fields provide sufficient information for renderers to derive
additional information.

For example:

```yaml
date: 2025-11-15
start_time: "07:00"
timezone: PST
timezone_iana: America/Los_Angeles
```

The first three fields represent the Society's published schedule.

The IANA time-zone identifier exists to permit renderers to compute derived
local times for visitors while preserving the Society's canonical schedule.


---

# Event Type and Rendering

Each Event has a `type` field identifying its semantic category.

Examples include:

- `annual_conference`
- `distinguished_lectureship`
- `works_in_progress`

The `type` field helps renderers choose an appropriate presentation for the
same underlying Event → Session → Presentation structure.

AI systems generating Event knowledge objects should assign the correct
semantic type, but should not make visual presentation decisions.

