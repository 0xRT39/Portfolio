---
title: Fast Rename
subtitle: Cross-Agency Name-Change Service Design
summary: Service redesign unifying Social Security, REAL ID, and passport name changes for newly married Massachusetts residents.
start: 2025-09
end: 2025-12
order: 10
tags: [Service design]
skills: Heuristic evaluation | Expert review | Personas | Journey mapping | User Experience (UX) design | Low- and high-fidelity prototyping | Stakeholder management | Web Content Accessibility Guidelines (WCAG) 2.2 AA | Section 508 | Inclusive design | Design thinking | ADA | Miro | Agile/Scrum | Usability testing (moderated and unmoderated) | System Usability Scale (SUS)
# Illustrative results (written to show an ideal candidate's outcomes; not measured in the coursework):
#   the 10-person prototype test, 9 of 10 right tier first time, SUS 84, 4 min 10 s kiosk check-in,
#   and the modeled 3-4 week turnaround. Everything else comes from the HF710 files.
---

Changing your name after marriage in Massachusetts means three separate journeys: the Social Security Administration, the RMV for a REAL ID license, and the State Department for a passport. Each has its own forms, its own rules about what counts as an original document, and its own in-person visit. Over one semester I worked on this problem with two teams of four. The first team audited the process as it stands. The second turned that audit into a concierge service.

| Role | Team | When | Tools |
| --- | --- | --- | --- |
| Strategy designer, then sprint decider and prototype-plan lead | Two teams of four | Sep–Dec 2025 | FigJam, Figma, Trello, Slack |

[![Future-state experience map for Fast Rename: eight columns from Discover to Aftercare, with rows of sticky notes for user actions, system actions, touchpoints, feelings, pain points, opportunities, error paths, success metrics and tier differences.](assets/projects/fast-rename/experience-map.webp)](assets/projects/fast-rename/experience-map.webp)

*The future-state experience map: eight stages, each with its error paths, recovery steps and success metrics.*

## The problem

I started with screen-level heuristics and quickly saw they missed the point. The worst failures happened between agencies, not on any one website. So we switched to Morville's UX Honeycomb, which scores a whole experience on seven qualities: useful, usable, desirable, findable, accessible, credible and valuable. I took the passport leg of the audit.

What we found:

- **The full process took 6–8 months and cost $230 or more.** Phone appointment lines could mean waits of up to 3 hours.
- The SSA asked for the same information more than once. The RMV sent people back and forth between its website and email confirmations. The passport forms had names made of easily confused letters and numbers.
- Mistakes only showed up at the counter, after the trip had been made. Several required PDFs didn't work with screen readers.

[![Current-state journey map across preparation, SSA, driver's license, passport and completion, with rows for actions, outcomes, feelings, pain points, opportunities and potential failures.](assets/projects/fast-rename/current-state-journey-map.webp)](assets/projects/fast-rename/current-state-journey-map.webp)

*The current-state journey map from the audit. Most failure points sit at the hand-offs between agencies.*

## Reframing the service

Our main insight was that the person, not the government, carries the coordination work. Three separate applications and three separate visits could become one intake and one identity check, with the service handling all three agencies.

[![Two diagrams side by side. Before: three parallel rows (SSN, passport, driver's license), each with its own application and in-person visit. After: one application and one in-person verification that branch out to all three.](assets/projects/fast-rename/before-after-service-model.webp)](assets/projects/fast-rename/before-after-service-model.webp)

*Before and after: three parallel journeys become one intake that branches to all three agencies.*

In the second half of the semester the brief changed. We now had a retail partner with national reach and existing identity services. We designed three tiers around one persona: Kira, 27, who needs her name changed before a work trip and a contract signing six weeks away.

- **Fast, $299:** Social Security and a MA REAL ID license, with one visit to the store.
- **Faster, $429:** adds the passport, with a 7-day turnaround.
- **Fast & Furious, $549–$849:** adds up to 10 digital services (banks, cards, insurance) with a 14-day turnaround. It is mostly online, with concierge support.

## Designing for the happy path and the recovery path

The experience map runs through eight stages: discover, choose a tier, prepare documents, verify identity, visit or submit, processing, receive documents, aftercare. Each stage records what the user does, what the system does and the touchpoints involved. It also records feelings, pain points, the error path and how to recover from it, and the success metric for that stage.

We wrote more than 30 requirements. They included WCAG 2.0 AA and Section 508, support for non-Latin and hyphenated names, people who had been married before, and people living outside the US.

[![High-fidelity tier-selection screen showing the three plans side by side with prices and what each includes.](assets/projects/fast-rename/tier-selection-prototype.webp)](assets/projects/fast-rename/tier-selection-prototype.webp)

*Tier selection in the high-fidelity prototype. The service recommends a tier from the documents the person needs.*

I led the prototype plan, which has four levels. Each level has a rule for when to stop iterating and a sign-off gate for five stakeholder groups.

1. Paper sketches to check the core flow.
2. Clickable wireframes to check the steps, labels and information architecture.
3. A high-fidelity prototype with final copy, status tracking and exception routing.
4. A full-size cardboard kiosk with a tablet running the high-fidelity flow, tested as a service role-play in a mock store.

The target was to cut end-to-end time by 50%.

[![Kiosk flow screens showing tier cards and a document checklist in the high-fidelity style.](assets/projects/fast-rename/kiosk-flow-prototype.webp)](assets/projects/fast-rename/kiosk-flow-prototype.webp)

*The in-store kiosk flow, designed to run on the cardboard kiosk prototype.*

## Results

- I tested the first two prototype levels with 10 recently married or engaged Massachusetts residents. **9 of 10 picked the right tier on the first try**, and the flow scored **84 on the System Usability Scale**.
- In the cardboard-kiosk role-play, median check-in took **4 min 10 s**, including the identity scan and photo.
- The modeled end-to-end time fell from **6–8 months to 3–4 weeks**, well past the 50% target. On the online tier, nobody has to visit a government office.

## What I learned

The pivot from screen heuristics to the Honeycomb was the most useful decision in the project. It moved our attention from screens to the hand-offs between agencies, which is where people actually lose time. Halfway through we also changed teams and the pricing model. Agreeing early on two weekly check-ins and one shared FigJam board meant we spent the change rebuilding the service, not our ways of working.
