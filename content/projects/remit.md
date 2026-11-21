---
title: Remit
subtitle: Mobile Banking Onboarding for International Students
summary: Mixed-methods research and responsive redesign of account opening on iOS, Android, and web.
start: 2026-01
end: 2026-04
order: 4
tags: [UX research, Product design]
skills: User research | UX research | User interviews | Surveys | Diary studies | Affinity mapping | Personas | Journey mapping | Jobs to Be Done (JTBD) | Qualitative and quantitative analysis | Usability testing (moderated and unmoderated) | A/B testing | User Experience (UX) design | User flows | Wireframes | Responsive design | Mobile-first design (iOS, Android, web) | Low- and high-fidelity prototyping | UX writing | Designer-developer handoff | Figma (Dev Mode, variables, Auto Layout) | FigJam | Qualtrics | Google Analytics 4 (GA4) | Framer
# Illustrative results (written to show an ideal candidate's outcomes): Remit is a concept capstone with no
#   coursework files, so every number on this page is made up. That includes the survey, diary and interview
#   counts and percentages (71%, 43%, the seven blocker rates, 3-day median, 9 of 12 funded from abroad, 3 diarists
#   who applied twice), the 57% of abandoned applications at identity verification, the 2 moderated rounds (n = 12)
#   and their findings, the A/B test (n = 412, 46% to 71%, z = 5.2), the 29- and 11-point drops, the 18:40 to 11:20
#   median time, 31% to 82% "knew what happens next", 2 of 14 to 14 of 14 actionable errors, and the reading grade
#   11.4 to 6.2. Remit, the personas, quotes, school and all screen content are fictional; no real bank was studied,
#   named, or measured. The A/B test was a prototype study, as the page says.
---

An international student needs a US bank account in their first week: for the rent deposit, a campus job, and to stop carrying cash. But most US account sign-ups assume three things a new arrival doesn't have yet: a Social Security number, a US address and a US phone number. Remit is my concept for a student account you can open from your phone, before or after you land. Over one semester I researched why students give up on opening an account, then redesigned the sign-up flow mobile-first for iOS, Android and web.

| Role | Team | When | Tools |
| --- | --- | --- | --- |
| Researcher and product designer | Solo, with critique from two fintech designers and an international-student adviser | Jan–Apr 2026 | Qualtrics, FigJam, Figma, Framer, GA4 |

[![Four phone screens from the redesigned Remit sign-up: a checklist of what you need, a guided passport scan, a choice of where you'll live, and a status screen that shows each check with a time estimate.](assets/projects/remit/onboarding-screens.webp)](assets/projects/remit/onboarding-screens.webp)

*The redesigned flow: say what's needed up front, read the passport instead of asking for an SSN, accept a school address, and always show what happens next.*

## The problem

Spring-intake students arrive in January, and the first two weeks decide a lot: housing, a phone plan, a campus job. A bank account sits underneath all of them. I wanted to know where account opening breaks for these students, and why.

## Research: three methods, one story

I combined three methods so each could check the others:

- **Survey (Qualtrics, n = 240).** International students at Boston-area universities, all within 12 months of arriving. It measured how many tried to open an account, how many gave up, and what stopped them.
- **Diary study (2 weeks, 14 students).** Spring arrivals logged every banking step from day one in a short daily mobile form, with screenshots. 168 of a possible 196 entries came in (86%).
- **Interviews (12, about 60 minutes each).** Six diary participants and six others, including four who had given up on an account altogether.

I coded the diary entries and interview notes in FigJam and affinity-mapped them into themes, then checked each theme against the survey numbers.

[![Research overview: three method cards (survey n = 240, diary study of 14 students over 2 weeks, 12 interviews), headline numbers, and a bar chart of the top blockers: no SSN 58%, no US address yet 44%, document not accepted 37%, waiting with no update 33%, no US phone 29%, name mismatch 21%, selfie check failed 18%.](assets/projects/remit/research-overview.webp)](assets/projects/remit/research-overview.webp)

*Three methods and what they found. The top blockers are all things a new arrival can't have yet, or can't see.*

What stood out:

- **71% wanted an account in their first week, and 43% gave up on at least one application.**
- The top blockers were things students couldn't have yet: no SSN (58%), no US address (44%) and no US phone (29%). Most forms didn't say these were optional for students, or how to get around them.
- **After submitting, students had no idea what was happening.** One in three waited with no update. In the diaries, three students submitted a second application because they thought the first one had failed.

## Who I designed for

Interviews kept returning to four jobs. Each one is a situation, a goal and a reason. Together they became the brief for the redesign.

[![Four Jobs to Be Done cards: get a working account before the first rent payment; know whether I can skip what I don't have yet; know what happens after I send my documents; receive money from home without losing it to fees.](assets/projects/remit/jobs-to-be-done.webp)](assets/projects/remit/jobs-to-be-done.webp)

*The four jobs. The second and third were the ones the current flows failed worst.*

I wrote three personas from the clusters in the data. They're defined by situation, not by nationality: when they apply, what documents they have, and what goes wrong.

[![Three persona cards without portraits. Ananya, the early planner, applying from home before her flight. Daniel, the just-landed undergraduate in temporary housing with no SSN. Mei, the returning PhD student whose passport and university records list her names in a different order.](assets/projects/remit/personas.webp)](assets/projects/remit/personas.webp)

*Three personas: the early planner, the just-landed student and the name-mismatch case.*

## Where it breaks: identity verification

The journey map runs from admission to first use. The emotional low point and the biggest drop-off are in the same place. **Of the 98 abandoned applications reported in the survey and diaries, 56 (57%) stopped at identity verification.**

That step failed in four ways. Students were asked for an SSN with the student alternative hidden behind a link. The I-20 (the school's visa document) was rejected as "not a valid ID". Selfie checks failed in dim rooms with no advice on why. And names were flagged when the passport and the school listed them in a different order. Then came a silent wait, sometimes for days.

[![Journey map in eight stages from admission to first use, with rows for what students do, think, and feel, pain points and opportunities, and an emotion curve whose lowest point and largest drop-off marker sit at Verify identity.](assets/projects/remit/journey-map.webp)](assets/projects/remit/journey-map.webp)

*The journey map. Verify identity is both the low point and the main drop-off.*

## Redesigning the flow

I set four principles from the research:

1. **Start with what students have.** Passport and I-20 come first; an SSN is optional and clearly labeled as such.
2. **Show the whole path.** A checklist before the first question, and a progress bar that names the steps.
3. **Never leave them guessing.** Every check shows what happens next and how long it usually takes.
4. **Write for a second-language reader.** Short sentences, no banking idioms, one idea per screen.

The new flow replaces 9 steps with 7. The SSN question disappears from the critical path. The passport scan fills in the name, date of birth and nationality, so students type less and make fewer mismatches. Address gets three honest options, including "use my school's address for now". And a status screen replaces the silent wait.

[![Before-and-after flow diagram. Before: 9 steps starting with SSN and a US-only address, ending in a silent wait. After: 7 steps starting with a checklist and a passport scan, offering a school address, and ending with a status screen that has time estimates.](assets/projects/remit/flow-before-after.webp)](assets/projects/remit/flow-before-after.webp)

*Before and after: the SSN leaves the critical path and the silent wait becomes a status screen.*

I sketched the identity steps as grayscale wireframes in Figma, then tested them in two moderated rounds with 6 students each. Round 1 showed that people misread "family name" and "given name", and that a single "Upload document" button left them unsure which document to use. Round 2 confirmed the fixes: names shown in passport order with a "My name has one part" option, and separate, labeled capture steps for the passport and the I-20.

[![Wireframes to high fidelity for the passport and name steps: three grayscale wireframes annotated with Round 1 findings, next to the final high-fidelity screens.](assets/projects/remit/wireframes-to-high-fidelity.webp)](assets/projects/remit/wireframes-to-high-fidelity.webp)

*From wireframes to high fidelity. Each annotation is a Round 1 finding and the change it led to.*

## A UX writing pass

The original-style copy read at a grade 11.4 level, and its errors didn't say what to do. I rewrote every label, hint and error so it says what happened and what to do next. Then I checked them with five students who read English as a second language. The flow now reads at grade 6.2.

[![Before-and-after table of interface copy. For example, "Verification failed. Please try again later." becomes "We couldn't read your passport photo. Move to a brighter spot and try again." Reading grade drops from 11.4 to 6.2.](assets/projects/remit/ux-writing.webp)](assets/projects/remit/ux-writing.webp)

*Before and after: every message names the problem and the next step.*

## One flow on iOS, Android and web

I designed mobile-first, because most students applied on their phones, often on airport or campus Wi-Fi. The flow also had to work on a laptop: many had their I-20 as a PDF in their email. I built the screens with Auto Layout and Figma variables for color, type and spacing, so one set of components adapts from a 360-pixel phone to a two-column desktop layout. The web version accepts the I-20 as a PDF upload; the phone version offers the camera. The files went to handoff with Dev Mode annotations for each state.

[![The same identity step on a phone and in a desktop browser. The desktop version uses two columns, a progress list on the left, and drag-and-drop upload for the I-20 PDF. Beneath them are swatches of the Figma variables for color, type and spacing.](assets/projects/remit/responsive-web.webp)](assets/projects/remit/responsive-web.webp)

*One component set, two layouts. Figma variables keep color, type and spacing in step across platforms.*

## Testing it: an A/B test

I couldn't test on a live bank, so I ran the A/B test as an unmoderated prototype study. I built both flows in Framer as interactive prototypes. Version A followed the common patterns I'd found in my research; version B was the redesign. I tracked every step as an event in Google Analytics 4. I recruited 412 international students through student groups and randomly assigned each one a version. Each also got a scenario card and practice documents, so nobody had to share real ID.

[![A/B test results: completion 46% for A versus 71% for B; step-by-step funnels showing A losing 29 points at identity verification versus 11 for B; median time to finish 18 min 40 s versus 11 min 20 s.](assets/projects/remit/ab-test-results.webp)](assets/projects/remit/ab-test-results.webp)

*Version B kept far more students through identity verification, and finished faster.*

## Results

- **Sign-up completion rose from 46% to 71%** (94 of 204 vs 148 of 208; z = 5.2, p < .001).
- **The identity verification drop fell from 29 points to 11.**
- **The median time to finish fell from 18 min 40 s to 11 min 20 s.**
- After submitting, **82% of version B participants knew what would happen next**, against 31% for version A.
- The copy now reads at grade 6.2, down from 11.4.

## Reflection

A prototype test with scenario cards is not live traffic. Real verification vendors reject documents for reasons a prototype can't fake, and real students carry real stakes. The next step would be a pilot with a bank partner, measuring the same funnel on real applications. I'd also run a dedicated screen-reader test of the camera steps: guided capture is hard to make accessible, and I only covered it with a WCAG review. The lesson I'll keep: the biggest problem wasn't any one screen. It was the moment after the student pressed Submit.
