# SAGP Executive Portal Architecture

## Core Idea

The SAGP Executive Portal is an operating environment for the Society's work.

It does not replace specialized tools. Instead, it organizes and orchestrates them.

---

## Architecture

Executive Portal
    ↓
Workspace
    ↓
Workflow
    ↓
Engine
    ↓
Canonical Data

---

## Canonical Knowledge

Canonical objects are the authoritative records of the Society.

Examples:

- Members
- Calls
- Events
- Officers
- Board Members
- Bylaws

Canonical knowledge should be edited in exactly one place.

---

## Derived Objects

Derived objects are automatically generated from canonical knowledge.

Examples:

- Website pages
- Publishing workspaces
- Messages
- Audiences
- Communications
- PDFs
- CSV exports

Derived objects should never be edited directly.

---

## Engines

### Publishing Engine

Produces Messages from canonical Calls and Events.

Outputs:

- Subject
- Rich HTML
- Plain Text
- (Future) PDF

### Membership Engine

Produces Audiences from canonical membership data.

Outputs:

- Recipient lists
- Audience previews
- CSV exports
- Membership reports

---

## Workspaces

Workspaces organize related institutional work.

Current workspaces:

- Publishing
- Membership
- Communications
- Governance
- Administration

---

## Communication Algebra

Communication = Audience ⊕ Message

where

Audience = who

Message = what

Communication = a packaged combination of the two.

A Communication Package contains

- recipients
- subject
- rich HTML
- plain text

Future versions may also include

- attachments
- personalization
- delivery metadata

---

## Connectors

Connectors interface with external systems.

Examples:

- Google Forms
- Payment Processor
- Gmail
- Outlook
- Mailchimp
- Zoom
- Google Calendar

Connectors never own canonical knowledge.

---

## Guiding Principle

The Executive Portal should expose institutional workflows rather than implementation details.

The user should think

"I need to communicate with current members."

not

"I need to query the database, export a mailing list, generate HTML, and paste everything into my email client."

The Portal exists to coordinate specialized engines into a coherent workflow.
