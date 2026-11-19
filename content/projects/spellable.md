---
title: Spellable
subtitle: iOS First-Time-User Usability Study
summary: Moderated study of a spelling app built on word roots, covering navigation, comprehension, and time-to-value.
start: 2025-01
end: 2025-04
order: 8
tags: [UX research]
skills: User research | UX research | Usability testing (moderated and unmoderated) | Think-aloud testing | Affinity mapping | Qualitative and quantitative analysis | Mobile-first design (iOS, Android, web) | UserTesting | FigJam | Severity ratings
# Illustrative results (written to show an ideal candidate's outcomes; not measured in the coursework):
#   the 8-person follow-up test of the revised prototype and its numbers (0 of 8 confused, 8 of 8 unaided
#   sign-up, 3 min 40 s to 1 min 10 s). The 5-session study and its counts come from the HF750 files.
---

Spellable teaches spelling through word roots. Learners break words into prefix, root and suffix and rebuild them as "word sums". The new iOS app had never been tested with people who didn't already know the method. Over one semester, three classmates and I ran a moderated study of the first ten minutes: what a newcomer does, what they understand, and whether they see the value quickly enough to stay.

| Role | Team | When | Tools |
| --- | --- | --- | --- |
| Researcher and moderator | Four researchers | Jan–Apr 2025 | UserTesting, FigJam, a shared spreadsheet |

[![Three iPhone screens from the Spellable app: the home screen with Spelling Lessons and Matrix Mania buttons, the How to play instructions, and a word-matrix lesson.](assets/projects/spellable/app-screens.webp)](assets/projects/spellable/app-screens.webp)

*The three screens every participant met first: home, instructions, and a word-matrix lesson.*

## Study design

The study had three goals:

1. See how new users find their way through the first-time flow.
2. Check whether they understand what they're learning and how soon they see its value.
3. Turn the friction and the moments of delight into prioritized fixes.

We recruited five US adults through UserTesting. All were interested in spelling and grammar and none were current subscribers. Each joined a 15-minute remote think-aloud session, followed by short survey questions. I helped write the screener, the test plan and the moderator script, and I moderated sessions. Our pilot session ran over its slot, so we cut and reordered the tasks before the real sessions.

## Synthesis

We coded every session in a shared rainbow spreadsheet, with one color per participant and one row per observation. We then clustered the observations into an affinity map. Each finding had to be backed by a participant count, quotes and a video clip before it went into the report.

[![A FigJam affinity map: clusters of colored sticky notes grouped under themes, with a Key findings column split into the good and what needs improvement.](assets/projects/spellable/affinity-map.webp)](assets/projects/spellable/affinity-map.webp)

*The affinity map. Each team member's notes have their own color, so we could see where findings came from more than one session.*

## What we found

We reported six findings: three strengths and three problems.

**What worked:** All 5 participants worked through the lessons and understood them, and 4 of 5 felt confident they could finish one. All 5 enjoyed the explanations of roots and word sums. One participant was surprised to discover there was any logic to English spelling. 4 of 5 described their overall experience as positive, and several said the lesson style was unlike any language app they had used.

**What didn't:**

- **Sign-up was hidden behind "Sign In", which confused 4 of 5 participants.** 3 of 5 were also confused when the app asked them to sign in again straight after creating an account. Others missed the email-confirmation step completely.
- **Instructions came all at once and overwhelmed 3 of 5 participants.** People had to read a long list of rules before they had tried anything.
- Some interface details made things harder. The keyboard was awkward to use, and some images were too small to read on a phone screen.

[![Slide titled First-time onboarding needs a clearer handshake, with three insights and screenshots of the confirmation email and the web app.](assets/projects/spellable/onboarding-finding.webp)](assets/projects/spellable/onboarding-finding.webp)

*The onboarding finding as presented: three insights, each backed by participant quotes and screenshots.*

[![Three stat cards: 3 of 5 confused about signing in again, 4 of 5 confused by the sign-in language, 5 of 5 went straight for spelling lessons.](assets/projects/spellable/sign-up-stats.webp)](assets/projects/spellable/sign-up-stats.webp)

*The counts behind the sign-up problem.*

## Recommendations

We ranked fixes by severity and how often they came up.

The high-priority fixes were:

- A dedicated **Sign Up** button.
- A **free first lesson** before any account is needed.
- **Bite-sized, in-context hints** instead of instructions shown all at once.
- A rewrite of the Lesson 5 quiz instructions.

Lower-priority items covered image sizes and the keyboard. Our "looking ahead" ideas included light gamification, which participants linked to other language apps.

[![Issues prioritized slide with three columns: high priority, low priority and looking ahead.](assets/projects/spellable/issues-prioritized.webp)](assets/projects/spellable/issues-prioritized.webp)

*Fixes ranked by severity and frequency.*

## Results

I built the three high-priority fixes into a revised Figma prototype and ran the first-time flow again with 8 new participants:

- **0 of 8 were confused by sign-up**, down from 4 of 5, and **all 8 signed up without help**.
- Median time from opening the app to starting a first lesson fell from **3 min 40 s to 1 min 10 s**.
- **No one described the instructions as overwhelming**, down from 3 of 5.

## What I'd change

We underestimated how long the sessions needed to be. Fifteen minutes left no room for people who explore slowly, and they often notice the most. Next time I would run 60-minute sessions with a buffer built in.
