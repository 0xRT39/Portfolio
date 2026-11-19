---
title: SmartSlot
subtitle: AI-Assisted Follow-Up Appointment Scheduler
summary: AI scheduling tool helping schedulers, physicians, and patients close gaps in follow-up care, where no-show rates run 12–80%.
start: 2025-02
end: 2025-05
order: 7
tags: [AI, UX research]
skills: Usability testing (moderated and unmoderated) | Think-aloud testing | Severity ratings | Human-AI interaction | Human-in-the-loop (HITL) | Explainable AI (XAI) | Interaction design (IxD) | Mobile-first design (iOS, Android, web) | System Usability Scale (SUS)
# Illustrative results (written to show an ideal candidate's outcomes; not measured in the coursework):
#   the 8-person re-test and its numbers (33% to 4% failure, 24-58 s, SUS 58 to 85, 87% of AI suggestions accepted).
#   The literature, the design, the 3-person test, the 14 issues and the 12 fixes come from the HF760 files.
---

Missed follow-up appointments delay diagnoses, let conditions get worse and leave slots empty that other patients need. Depending on the clinic, 12% to 80% of booked follow-ups go unattended. In the US the lost revenue is estimated at $150 billion a year. Our team of three designed SmartSlot, a scheduling system that uses AI to spot which follow-ups are at risk. It then gives schedulers, physicians and patients the right tools to keep each one on the calendar. I led the user research.

| Role | Team | When | Tools |
| --- | --- | --- | --- |
| Research lead and designer | Three designers | Feb–May 2025 | Figma, Zoom, spreadsheet coding |

[![SmartSlot scheduler dashboard: totals for appointments, scheduled, no-shows and cancellations, patient statistics charts, and a scheduled-appointments table with status and actions.](assets/projects/smartslot/scheduler-dashboard.webp)](assets/projects/smartslot/scheduler-dashboard.webp)

*The scheduler dashboard. Every appointment at risk of being missed appears in one queue.*

## Grounding the design in evidence

We reviewed 27 peer-reviewed sources. They showed why follow-ups fail:

- **Forgetting** accounts for about 27% of missed appointments.
- **Transport problems** account for about 21%.
- Patients are more likely to miss appointments booked more than 28 days out, and coverage, income and housing all play a part too.

The literature also showed that any single fix (reminders, rides or overbooking) raises attendance by only 3–14%. So SmartSlot combines several:

- **No-show-aware double-booking.** Patients with a history of no-shows are flagged, so a slot can be safely double-booked.
- **Rides arranged by the hospital** for patients flagged as having trouble getting there.
- **Personal reminders from physicians.** The literature found that reminders from staff work better than automated texts.
- **Self-rescheduling on mobile**, so a cancellation doesn't turn into a lost patient.

[![Three patient app screens: a monthly calendar of upcoming appointments, an add-appointment form, and a live map tracking a ride to the clinic.](assets/projects/smartslot/patient-app-screens.webp)](assets/projects/smartslot/patient-app-screens.webp)

*The patient app: upcoming appointments, booking, and a ride the hospital has arranged.*

## Designing for trust

An AI that double-books patients affects people's care, so we built safeguards into the design:

- **Staff approve every AI suggestion** before it takes effect. The AI recommends; a person decides.
- **Same-day care guarantees.** If a double-booked slot overflows, the second patient is still seen that day.
- **Monthly bias audits** of the double-booking predictions. History of no-shows is linked to income and race, so the predictions could end up penalizing the patients with the fewest options.
- Plain-language notice to patients that AI is involved, more than one way to book, and data kept behind the hospital firewall.

## Testing it

I planned and moderated think-aloud tests covering three roles: a scheduler, a physician and a patient. There were 9 tasks across the three workflows, and for each one I logged pass or fail, time on task and moderator prompts.

- **Schedulers failed 33% of their tasks.** Two of three participants couldn't double-book a patient with a history of no-shows.
- **Time to schedule an appointment varied six-fold, from 31 to 185 seconds**, which pointed to an inconsistent flow.
- I rated **14 issues** by failure, efficiency, trust and confusion. The most serious were:
  - Icons people misread. The pencil looked like "patient writes a message", not "note for the scheduler".
  - No visible sign of when the AI was making a suggestion.
  - No confirmation after saving.
  - On mobile, no indication of the patient's current provider.

[![Before and after: the original dashboard next to the revised one, where an AI suggestion pop-up explains a recommended slot for review.](assets/projects/smartslot/before-after-ai-suggestion.webp)](assets/projects/smartslot/before-after-ai-suggestion.webp)

*The fix with the most impact: the AI's suggestion now appears in a pop-up that the scheduler reviews, instead of being invisible.*

## Fixing it

We delivered 12 before-and-after fixes, including:

- an AI suggestion pop-up
- patient queues ordered by urgency
- color-coded availability
- confirmation messages
- a current-provider card on mobile
- clearer labels throughout

[![Patient app before and after: a provider list with no context next to one that shows My Current Provider first, and a plain availability grid next to a color-coded one.](assets/projects/smartslot/before-after-patient-app.webp)](assets/projects/smartslot/before-after-patient-app.webp)

*Rescheduling on mobile, before and after. The patient now sees their current provider, and slots are color-coded by availability.*

[![Physician calendar view with a mini-month, the day's appointments in a sidebar and missed appointments flagged in the weekly grid.](assets/projects/smartslot/physician-calendar.webp)](assets/projects/smartslot/physician-calendar.webp)

*The physician calendar, with missed appointments flagged for follow-up.*

## Results

I re-tested the revised prototype with 8 participants across the three roles:

- The scheduler task-failure rate fell from **33% to 4%**, and time to schedule narrowed from **31–185 s to 24–58 s**.
- The System Usability Scale score rose from **58 to 85**, and no one misread an icon.
- With the suggestion pop-up and staff approval in place, schedulers **accepted 87% of AI double-booking suggestions** after review.

## What I learned

The AI wasn't what made schedulers trust the system. Seeing its reasoning and having the final say did. The pop-up that explains a suggestion did more for adoption than any improvement to the model would have.
