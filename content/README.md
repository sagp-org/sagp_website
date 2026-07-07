# SAGP Canonical Content Repository

The `content/` directory contains the canonical institutional knowledge of the
Society for Ancient Greek Philosophy (SAGP).

It is **not** simply a collection of data files. It is the authoritative
representation of the Society's knowledge.

The website is only one consumer of this knowledge.

Future AI assistants, search systems, email generation, PDF generation,
conference programs, calendars, and other publishing tools should derive their
information from these canonical knowledge objects.

---

# Fundamental Principle

**Every institutional fact should have exactly one authoritative
representation.**

If the same information appears in multiple places, those additional
representations should be generated from the canonical source rather than
maintained independently.

This principle minimizes inconsistency, reduces maintenance effort, and enables
future AI systems to reason over a coherent knowledge base.

---

# Current Knowledge Domains

~~~text
content/

    events/
        annual_conference/
        distinguished_lectureship/

    calls/

    governance/

    people/

    organizations/
~~~

Additional domains will be introduced only as genuine institutional concepts
are identified.

---

# Events

Events describe scheduled scholarly activities.

Examples include:

- Annual Conferences
- Distinguished Lectureships
- Works in Progress sessions

Events have lifecycles:

~~~text
draft
    ↓
upcoming
    ↓
completed
    ↓
archived
~~~

---

# Calls

Calls describe actionable Society announcements.

Examples include:

- Calls for Papers
- Calls for Nominations
- Elections
- Membership Campaigns

Calls typically include:

- deadlines
- eligibility requirements
- submission instructions
- contact information
- related organizations
- related event series

A Call is **not** an Event.

---

# Governance

Governance contains persistent institutional knowledge.

Examples include:

- Constitution
- Bylaws
- Officers
- Board Members
- Committees
- Policies
- Minutes

Unlike Events, Governance objects generally evolve through versioning and
effective dates rather than scheduled occurrences.

---

# Editing Rule

If changing factual content requires editing an Astro page, stop and ask:

> **Should this fact belong in a canonical knowledge object instead?**

In most cases, the answer should be **yes**.

---

# AI Publishing Workflow

The long-term publishing workflow is:

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
Automatic Publication
~~~

The AI should generate and maintain canonical knowledge objects.

The website should derive its presentation from those objects.

