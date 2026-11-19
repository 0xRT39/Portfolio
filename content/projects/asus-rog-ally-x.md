---
title: ASUS ROG Ally X
subtitle: Handheld Gaming PC Usability Study
summary: In-person study testing whether a Windows 11 handheld can replace a laptop without a mouse, keyboard, or monitor.
start: 2025-02
end: 2025-04
order: 9
tags: [UX research]
skills: User research | UX research | Usability testing (moderated and unmoderated) | Think-aloud testing | System Usability Scale (SUS) | Keyboard navigation | Figma (Dev Mode, variables, Auto Layout) | Low- and high-fidelity prototyping
# Illustrative results (written to show an ideal candidate's outcomes; not measured in the coursework):
#   the 6-person re-test of the overlay prototype and its numbers (6 of 6 unaided file copy, 9 s brightness,
#   Paint difficulty 4/5 to 2/5, SUS 54 to 79). The protocol, session and three findings come from the HF750 files.
---

The ROG Ally X is a gaming handheld that runs full Windows 11. That raises a question its marketing doesn't answer: can it replace a laptop when there is no mouse, keyboard or monitor to plug in? I designed and ran this study on my own, from the research questions and a 17-page protocol through moderation, analysis and a findings deck.

| Role | Team | When | Tools |
| --- | --- | --- | --- |
| Sole researcher | Solo | Feb–Apr 2025 | Screen, video and audio capture, Figma |

[![Study design: a 30-minute session split into a 5-minute intro, 20 minutes of five peripheral-free tasks and a 5-minute interview, with each task mapped to its research question.](assets/projects/asus-rog-ally-x/session-design.webp)](assets/projects/asus-rog-ally-x/session-design.webp)

*Five research questions, five tasks, one 30-minute session started from a full device reset.*

## Designing the protocol

Each task tests whether one built-in input can stand in for a missing peripheral:

1. **Touch as a mouse.** Open Paint and draw a simple house with a finger.
2. **The on-screen keyboard.** Type "The quick brown fox jumps over the lazy dog". The sentence uses every letter, plus a capital and punctuation.
3. **Discoverable settings.** Change the volume and brightness, check Wi-Fi or Bluetooth, and shut down.
4. **The core gaming path.** Power on and launch a game from a desktop folder.
5. **The gamepad as a mouse.** Copy a file to another folder using only the controller.

For every task I recorded success, time on task, errors and a 1–5 difficulty rating. I also wrote moderator rules so that every session would run the same way:

- Give a neutral reminder to keep thinking aloud after 15 seconds of silence.
- Offer to skip after 5 minutes of being stuck.
- Never hint at where a control is.

To recruit, I screened for a mix of gamers and non-gamers who use phones and laptops every day. I excluded people with a lot of experience on similar handhelds, such as the Steam Deck, because they would already know the answers.

The session ran in person, from a full device reset. I captured synchronized video, audio and screen recording so that what people said could be lined up with what they tapped.

## What I found

[![Three findings slides: smaller UI elements made touchscreen tasks difficult; using the controller for desktop navigation was confusing; system settings navigation was inconsistent.](assets/projects/asus-rog-ally-x/three-findings.webp)](assets/projects/asus-rog-ally-x/three-findings.webp)

*The three findings, each backed by quotes and a written explanation in the deck.*

**1. Touch targets were sized for a desktop.** Paint's tools and shape pickers sat so close together that the participant kept choosing the wrong one. They rated the drawing task **4 out of 5 for difficulty and 1 out of 5 for satisfaction**, and said the interface wasn't made to be used with fingers.

**2. The gamepad's mouse mappings were invisible.** Nothing on screen showed which button acted as left-click or right-click. The participant expected the left shoulder buttons to left-click and the right ones to right-click. Pressing the stick to click also nudged the cursor off its target. They only found right-click on a trigger after a prompt and a lot of trial and error.

**3. Brightness was misfiled.** The volume rocker worked straight away, so the participant looked for a brightness button too. They then searched the display and personalization settings before finding it under System. On the way, a setting called "Lighting brightness" changed the LEDs around the sticks, not the screen.

[![Findings slide explaining why small UI elements made touchscreen tasks difficult, with the participant's satisfaction rating.](assets/projects/asus-rog-ally-x/finding-touch-targets.webp)](assets/projects/asus-rog-ally-x/finding-touch-targets.webp)

*Each finding pairs what happened with why it happened and what to do about it.*

## Recommendations

- A touch mode that enlarges targets and text system-wide, so Windows' desktop scaling doesn't break layouts.
- On-screen hints showing which button is left-click and which is right-click whenever the gamepad drives the cursor.
- A touch-first quick-settings panel that puts brightness next to volume. The LED setting should be renamed so it can't be mistaken for screen brightness.

## Results

I built the hint overlay and the touch-first settings panel as a Figma prototype that ran full-screen on the device, and re-ran the same tasks with 6 new participants (3 gamers and 3 non-gamers):

- **6 of 6 copied the file with the gamepad without help.** In the first session, the participant only managed it after a prompt.
- Median time to find brightness fell to **9 seconds**, with no detours through other settings categories.
- Paint drawing difficulty dropped from **4/5 to 2/5**, and the System Usability Scale score rose from **54 to 79**.

## What I'd change

A single participant can find big problems, but it can't tell you how common they are. Next time I would recruit at least five people from the start and separate gamers from non-gamers in the analysis, because their mental models of the controller were very different.
