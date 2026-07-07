# SAGP Knowledge Platform Ontology

## Purpose

The ontology defines the concepts that exist within the Society for Ancient
Greek Philosophy and the relationships among them.

Unlike the implementation, the ontology is independent of Astro, YAML,
JavaScript, or any particular software framework.

It answers one question:

> **What does the Society know?**

---

# Top-Level Knowledge Domains

~~~text
Society
│
├── Events
│
├── Calls
│
├── Governance
│
├── Membership
│
├── People
│
├── Organizations
│
└── Publications
~~~

These domains represent distinct categories of institutional knowledge.

---

# Events

Events are scheduled scholarly activities organized or sponsored by the Society.

Current event types include:

- Annual Conference
- Distinguished Lectureship
- Works in Progress

Typical Event properties include:

- title
- description
- hero information
- dates
- location
- sessions
- presentations
- presenters
- moderators
- related organizations

Events generally follow a lifecycle:

~~~text
draft
    ↓
upcoming
    ↓
active
    ↓
completed
    ↓
archived
~~~

---

# Sessions

Some Events contain one or more Sessions.

Examples:

- Annual Conference morning session
- Annual Conference afternoon session
- Distinguished Lecture (single session)

Sessions contain:

- title
- start time
- end time
- moderator
- presentations

---

# Presentations

Presentations are scholarly contributions within Sessions.

Typical properties include:

- title
- presenter(s)
- affiliation(s)
- abstract (optional)

Presentations belong to exactly one Session.

---

# Calls

Calls are actionable Society announcements.

Examples include:

- Call for Papers
- Call for Nominations
- Elections
- Membership Campaigns

Typical properties include:

- title
- summary
- deadlines
- eligibility
- submission instructions
- contact
- related organizations
- related event series

Calls are not Events.

Calls often precede Events but are independent institutional objects.

---

# Governance

Governance represents persistent institutional knowledge.

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

# Membership

Membership represents the Society's community.

Future ontology objects may include:

- member
- membership category
- membership status
- renewal history

---

# People

People represent individuals who interact with the Society.

Examples include:

- speakers
- moderators
- officers
- committee members
- authors

People may participate in multiple Events and Calls.

---

# Organizations

Organizations represent institutions connected with Society activities.

Examples include:

- universities
- scholarly societies
- publishers

Organizations may be associated with People, Events, Calls, or Publications.

---

# Publications

Future publication objects may include:

- newsletters
- proceedings
- announcements
- journal partnerships

---

# Relationships

~~~text
Society

    owns

        Events
        Calls
        Governance
        Membership
        Publications

Events

    contain

        Sessions

Sessions

    contain

        Presentations

Presentations

    involve

        People

People

    belong to

        Organizations
~~~

---

# Guiding Principle

The ontology models the Society.

The implementation models the ontology.

The website renders the implementation.

