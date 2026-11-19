---
title: Circadia
subtitle: Multimodal Self-Regulation Wearable
summary: Arduino wristband that turns rising overstimulation into light and vibration cues for adults with ADHD.
start: 2025-09
end: 2025-12
order: 15
tags: [Product design, UX engineering]
skills: Competitive analysis | Personas | Low- and high-fidelity prototyping | Rapid prototyping in code | Inclusive design | Arduino | Interaction design (IxD) | Microinteractions | Usability testing (moderated and unmoderated)
# Illustrative results (written to show an ideal candidate's outcomes; not measured in the coursework):
#   the bench-test numbers (11 to 1 false switches per hour) and the 5-day wear test (6 adults, 5 of 6,
#   comfort 2.8 to 4.6). The research, the states, the logic, the hardware and the build come from the HF766 files.
---

Many adults with ADHD have irregular body rhythms. Energy peaks and dips are hard to predict, and overstimulation often goes unnoticed until it has already turned into overwhelm. Circadia is a wristband that senses those changes and turns them into light and vibration the wearer can feel, early enough to do something about it. I worked on it with three classmates, focusing on the sensing logic and the Arduino code.

| Role | Team | When | Tools |
| --- | --- | --- | --- |
| Interaction designer and prototype engineer | Four designers | Sep–Dec 2025 | Arduino UNO R4, Grove sensors, C++, Bambu Studio, 3D modeling |

[![The working Circadia prototype on a wooden table: a wristband with an LCD module showing the current state and heart rate.](assets/projects/circadia/working-prototype.webp)](assets/projects/circadia/working-prototype.webp)

*The working prototype. The screen's backlight color shows the current state and the screen displays heart rate. A haptic motor sits underneath.*

## The opportunity

We benchmarked 7 products and reviewed 21 studies:

- **Oura and Empatica E4** measure the body in detail, but report back afterwards, on a screen.
- **Apollo Neuro and Dodow** offer calming cues, but don't adapt them to what the wearer's body is doing in the moment.
- **No product closed the loop:** sensing a change as it happens and responding through more than one sense.

The research also showed that people with ADHD are often less aware of their own body signals. It showed that a cue felt through more than one sense gets noticed more reliably than a single one. That became our brief: make internal state external, without asking the wearer to watch a screen.

## Three states, not a dashboard

We designed three states. Each has its own light and vibration pattern, so the wearer can tell them apart without looking.

- **Focus** is the default. A soft, cool light and almost no vibration, so the wearer's attention stays on their work.
- **Regulation** says "pause and check in". A warm, bright light and medium pulses every few seconds. It is meant to be clear but not alarming.
- **Recovery** paces a wind-down. A warm, low light and slow, rhythmic pulses to breathe along with.

Seven rules map light, sound, skin temperature and heart rate onto a state. The two fallback rules matter most: when a sensor's readings are noisy or unreliable, the band falls back to Focus instead of guessing.

[![Functionality logic table with seven conditions (C1 to C7), each mapping ambient light, body temperature, heart rate and sound to a resulting state.](assets/projects/circadia/logic-table.webp)](assets/projects/circadia/logic-table.webp)

*The 7-rule logic table, including the fallback for unreliable readings (C6) and the default (C7).*

## Engineering the prototype

The code runs to more than 800 lines. Four sensors (ambient light, infrared skin temperature, heart rate and sound) feed into three techniques that keep the band calm and trustworthy:

- **Personal baselines.** The band compares each reading with that wearer's own normal range, not with a fixed number.
- **2-of-3 voting.** A state only changes when at least two signals agree.
- **A 2.5-second dwell.** A new state has to hold for 2.5 seconds before the band switches, so a door slam doesn't trigger an alert.

To fit the course timeline we cut a 12-part, $120 build down to an MVP. The humidity and pressure sensor, the heat pad and the speaker were deferred to a later version. Shipping delays forced a second 3D model to fit replacement parts. We also moved the band from rigid PLA to flexible TPU.

[![Four renders of the housing as it evolved: an orange case with sensor windows, a black-and-gray case, a gray shell, and the final teal band.](assets/projects/circadia/housing-iterations.webp)](assets/projects/circadia/housing-iterations.webp)

*Housing iterations, from the first case with sensor windows to the final band.*

[![Slicer previews of the flexible band and the sensor case being prepared for 3D printing.](assets/projects/circadia/print-prep-tpu-band.webp)](assets/projects/circadia/print-prep-tpu-band.webp)

*Preparing the TPU band and the case for printing.*

## Results

- Over 6 hours of logged sensor data, voting and the dwell timer cut false state changes from **11 per hour to 1**.
- In a 5-day wear test with 6 adults with ADHD, **5 of 6 felt a Regulation cue before they noticed the overload themselves**.
- Comfort ratings rose from **2.8/5 for the rigid PLA band to 4.6/5 for the TPU band**.

## What I learned

For a device worn on the body, a false alarm costs more than a missed one. A band that buzzes for no reason trains its wearer to ignore it. The fallback rules and the dwell timer, which are invisible features, did more for trust than anything visible we designed.
