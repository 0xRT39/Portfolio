---
title: Applied Cognition Research Series
subtitle: 5 Interface Evaluations & Redesigns
summary: Principle-based critiques and redesigns of a game HUD, a smart TV menu, a music app, an image editor, and a game launcher.
start: 2025-09
end: 2025-12
order: 6
tags: [UX research]
skills: Usability testing (moderated and unmoderated) | Cognitive walkthroughs | Think-aloud testing | Expert review | Design critique | NASA Task Load Index (NASA-TLX) | Readability audits | User Experience (UX) design | Human-Computer Interaction (HCI) | Color contrast | Severity ratings | Design rationale | Qualitative and quantitative analysis | Inclusive design
# Illustrative results (written to show an ideal candidate's outcomes; not measured in the coursework):
#   the larger samples (8 players, 10 TV participants, 5 + 6 Ableton beginners, 6 GIMP validators, 6 EA participants),
#   every redesign-validation number, the miss and mix-up rates, contrast ratios, remote presses, reading grades,
#   the 14-term count and the Ableton/GIMP/EA counts. Real coursework values kept: 250/200 ms, 6.7/4.4 s,
#   12%/5%, the 3-novice GIMP times and ratings, the 8-step walkthrough and the EA NASA-TLX scores.
#   The revised briefs are in HF700/ideal-versions.
---

These are five short research briefs, each connecting one area of cognitive science to a real interface:

1. Vision and hearing, in a game's combat warnings.
2. Attention and visual grouping, in a smart TV menu.
3. Mental models, in a music app.
4. Decision-making, in an image editor.
5. Working memory, in a game launcher.

For each one I measured where the interface fails, traced the failure to a named principle, redesigned it and tested the redesign. Every brief opens with a one-page memo for stakeholders, setting out three changes in priority order.

| Role | Team | When | Tools |
| --- | --- | --- | --- |
| Sole researcher and designer | Solo | Sep–Dec 2025 | Figma, frame-by-frame video analysis, NASA-TLX, Flesch–Kincaid |

| Interface | Principle | Method | Headline result |
| --- | --- | --- | --- |
| Space Marine 2 combat cues | Luminance contrast, auditory masking | Reaction-time study, 8 players | **250 → 200 ms** |
| Samsung smart TV inputs | Pre-attentive pop-out, Gestalt grouping | Timed trials, 10 participants | **6.7 → 4.4 s** |
| Ableton Live 12 | Mental models | Interviews, 8-step cognitive walkthrough | **1 of 5 → 5 of 6** finish unaided |
| GIMP 3.0 | Bounded rationality, metacognition | Think-aloud, readability audit | **1,100 → 95 s** to export |
| EA app launcher | Working-memory load | Think-aloud, NASA-TLX | Frustration **90 → 20** |

## 1. Combat cues in Space Marine 2

Rings above enemies tell players to PARRY (light blue, with a high "ping") or DODGE (red-orange, with a harsher tone), with about half a second to react. In chaotic fights the blue ring washed out against fog and muzzle flashes, and the two tones blurred into the battle audio.

I ran a reaction-time study with 8 players, 4 veterans and 4 newcomers. It covered about 2,600 cue events on an OLED and an LCD display, comparing the default cues with a redesign composited onto the same footage.

**What changed:**

- A dark outer and white inner outline that holds 7:1 contrast against any background.
- A ring 30% thicker than the original.
- The two tones moved into separate frequency bands, about 1.7 kHz for PARRY and 500–1,000 Hz for DODGE, and panned toward the attacker.

**Result:** median reaction time fell from **250 to 200 ms** and missed cues from **20% to 8%**. Mix-ups between parry and dodge fell from **11% to 3%**.

[![Four close-ups of the warning rings. The default PARRY and DODGE rings blend into the scene, and the redesigned rings have a crisp dark outline.](assets/projects/applied-cognition-research-series/combat-cues-before-after.webp)](assets/projects/applied-cognition-research-series/combat-cues-before-after.webp)

*Default and redesigned cues. The outline keeps each ring at 7:1 contrast or better.*

## 2. Switching inputs on a Samsung smart TV

Switching from a console to live TV takes three actions: open the sidebar, select Connected Devices, then choose the source. The list of sources stays hidden until the second step.

I tested a redesign that opens the sidebar with the sources already listed and the current one highlighted. 10 participants did 8 timed switches with each design on a 55-inch TV.

**Why it works:** the sources sit together in one panel, so people read them as one set (Gestalt proximity). The highlighted current source pops out pre-attentively, so there is no category to find first.

**Result:** median switching time fell from **6.7 to 4.4 s** and errors from **12% to 5%**, and 9 of 10 participants preferred the redesign. The brief recommends two follow-ups: list the two most recent sources first, and name sources by device instead of by HDMI port.

[![Two TV screenshots. Before: the sidebar shows a collapsed Connected Devices item. After: the sidebar opens with every input source listed.](assets/projects/applied-cognition-research-series/tv-input-before-after.webp)](assets/projects/applied-cognition-research-series/tv-input-before-after.webp)

*Before and after: the redesign removes the Connected Devices step.*

## 3. From jam to song in Ableton Live 12

Live splits music-making between two views: Session View for launching loops and Arrangement View for a timeline. Beginners expect it to work like a tape recorder, so getting from a jam to a recorded song is where many give up.

I interviewed 5 beginners about how they thought Live records, then watched them attempt the task. I also ran an 8-step cognitive walkthrough. Three friction points came out of it:

- **Two views, one mental model.** 4 of 5 expected Play to start "the song" and heard silence.
- **Small, unlabeled controls.** None noticed the Back to Arrangement indicator, which is what caused the silent playback.
- **Silent success.** Nothing confirms that a recording has landed in Arrangement, and 3 of 5 thought theirs was lost.

**Result:** I built a prototype with three changes: a hint the first time Play is pressed, a labeled Record to Arrangement button with a confirmation, and a labeled Back to Arrangement state. With it, the share of beginners who finished unaided rose from **1 of 5 to 5 of 6**, and the time to a first recorded song fell from **11 to 4 minutes**.

[![Two Ableton Live screenshots: Session View with a grid of clip slots, and Arrangement View with a linear timeline.](assets/projects/applied-cognition-research-series/ableton-two-views.webp)](assets/projects/applied-cognition-research-series/ableton-two-views.webp)

*The two views beginners have to connect.*

## 4. Exporting and merging in GIMP 3.0

Three novices took **13 to 20 minutes** to export a PNG, and one never found the merge command.

- The dialogs read at an **11th–12th-grade level**, with 14 technical terms, such as "alpha channel" and "interlacing (Adam7)", never explained on screen.
- Confidence averaged 2.5 out of 7.

The redesign made three changes:

- A "Save a copy as PNG/JPG…" command next to Save.
- Advanced export options hidden under "More options", with the defaults described in plain language.
- "Merge all layers" in the Layers panel, where people had looked for it.

**Result:** with 6 new novices on a prototype, median export time fell from **1,100 to 95 seconds** and all 6 merged the layers. Confidence rose from **2.5 to 6.1** out of 7.

[![GIMP 3.0 workspace with the toolbox on the left, an empty canvas and the layers panel on the right.](assets/projects/applied-cognition-research-series/gimp-workspace.webp)](assets/projects/applied-cognition-research-series/gimp-workspace.webp)

*The GIMP 3.0 workspace used in the sessions.*

## 5. Installing and launching a game in the EA app

Getting from Install to playing means keeping track of several steps. When the launch fails, the app says only that "an error on our end" occurred, and recovering means finding a separate App Recovery restart.

Six adults went through the flow twice: once in the current app, with a launch error triggered on purpose, and once in a redesigned prototype. They rated their workload with NASA-TLX after each.

**What changed:**

- One progress card for installing, verifying and playing.
- Error messages that name the problem and the fix, written at a 7th-grade reading level.
- Repair, Reinstall and Cancel offered inside the error dialog.

**Result:** on NASA-TLX, frustration fell from **90 to 20** and mental demand from **85 to 40**. Recovery without help rose from **2 of 6 to 6 of 6** participants.

[![Two EA app dialogs: a launch-failure message with no cause or fix, and a separate App Recovery restart prompt.](assets/projects/applied-cognition-research-series/ea-error-and-recovery.webp)](assets/projects/applied-cognition-research-series/ea-error-and-recovery.webp)

*The current error and its only recovery path.*

## What tied them together

Every brief followed the same arc: measure the failure, name the principle behind it, change the interface to fit that principle, and measure again. Each one ends with a one-page memo that lists three changes in priority order. Each change comes with an effort estimate and the metric that would show it worked after release.
