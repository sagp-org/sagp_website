# Governance Ontology Roadmap

## Purpose

This roadmap describes the next phase of the SAGP platform: representing the
Society as an institution, not only as a set of events and calls.

## Core Distinction

The existing site combines two different concepts under "Who We Are":

1. Identity
2. Governance

These should be separated.

## Identity

Identity describes the public character of the Society.

Examples:

- mission
- history
- purpose
- scholarly community
- international orientation

## Governance

Governance describes how the Society is organized and operated.

Examples:

- bylaws
- officers
- board members
- committees
- policies
- elections
- minutes

## Proposed Navigation

Current:

~~~text
Home
Who We Are
Events
Membership
Contact
~~~

Proposed:

~~~text
Home
Society
Events
Calls
Membership
Governance
Contact
~~~

## Proposed Content Domains

~~~text
content/
  governance/
    bylaws/
    officers/
    board/
    committees/
  people/
  organizations/
~~~

## Initial Goals

1. Add Governance as a first-class website section.
2. Move officers and board information out of "Who We Are."
3. Add bylaws as canonical governance content.
4. Create a Governance landing page.
5. Preserve "Who We Are" as an identity/mission page.

## Design Rule

If a fact describes how SAGP is organized, it belongs in Governance.

If a fact describes what SAGP is and why it exists, it belongs in Society /
Identity.

