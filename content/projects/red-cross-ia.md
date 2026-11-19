---
title: The Other Red Cross
subtitle: Information Architecture Redesign for RedCross.org
summary: Card sort and tree test that rebuilt the American Red Cross website's navigation around what visitors come to do.
start: 2026-02
end: 2026-05
order: 6.5
tags: [UX research]
skills: User research | UX research | Card sorting | Tree testing | Information Architecture (IA) | Surveys | Qualitative and quantitative analysis | Data visualization | UX writing | Optimal Workshop
# Illustrative results (written to show an ideal candidate's outcomes; not measured in the coursework):
#   every tree-test outcome in Results (57% to 84% success, lostness 0.31 to 0.12, -34% time, 6 of 8 tasks,
#   38% to 89% on the nurse task, 25% to 7% difficulty). In the real study the results were mixed.
#   The card sort, the analysis, the 9-category structure and the study design come from the HF751 files.
---

RedCross.org serves blood donors, money donors, volunteers, people taking a course, corporate sponsors, job seekers and people in a disaster, all from one menu. Some labels, like "Get Started" and "Common Concerns", only make sense once you already know where you are. Over one semester, three classmates and I ran an open card sort to learn how visitors think about the site's content. We then ran a tree test to check whether a structure built from those results works better.

| Role | Team | When | Tools |
| --- | --- | --- | --- |
| Researcher and analyst | Four researchers | Feb–May 2026 | Optimal Workshop (OptimalSort, Treejack), R |

[![Before and after: the original five top-level menu items (plus Get Help, out of scope) next to the proposed nine task-based categories, with three label fixes listed underneath.](assets/projects/red-cross-ia/ia-before-after.webp)](assets/projects/red-cross-ia/ia-before-after.webp)

*Five menu items organized around the institution became nine categories organized around what visitors want to do.*

## Phase 1: open card sort

**Preparing the cards.** We started with 121 navigation labels and cut them to 81 cards:

- We removed "Get Help" and other emergency content, because the study was about everyday visitors, not people in a crisis.
- We removed utility links, section headings that would bias the groups, and duplicates that led to the same page.
- Where a label relied on its position on the page for meaning, we added that context to the card. "Eligibility Requirements" became "Blood Donation Eligibility Requirements".

**Running the sort.** The study ran unmoderated in OptimalSort for two weeks, with pre- and post-sort questionnaires. Of the 53 people who started, 24 finished. We dropped one who put every card in a single group, which left 23 sorts.

**Analysis.** We built a similarity matrix and compared ten hierarchical cluster solutions. We chose Ward linkage (coefficient 0.86) and a nine-group cut, which splits *donating* blood from *hosting* a blood drive. A multidimensional scaling plot confirmed the groups.

[![Cluster dendrogram from the card sort, with nine colored clusters.](assets/projects/red-cross-ia/dendrogram.webp)](assets/projects/red-cross-ia/dendrogram.webp)

*The Ward-linkage dendrogram, cut into nine groups.*

[![Similarity matrix heatmap showing how often each pair of cards was grouped together.](assets/projects/red-cross-ia/similarity-matrix.webp)](assets/projects/red-cross-ia/similarity-matrix.webp)

*The similarity matrix. Blood donation and training cards form clear blocks, and organizational pages are spread thin.*

[![Multidimensional scaling plot of all 81 cards, colored by cluster.](assets/projects/red-cross-ia/mds-plot.webp)](assets/projects/red-cross-ia/mds-plot.webp)

*The MDS plot. Blood donation sits tight on the left, training and water safety on the lower right, and organizational content in a loose cloud.*

### What the sort told us

- **People group by what they want to do, not by how the organization is structured.** They sorted by donating, giving blood, training, volunteering and learning about the organization. Blood donation and training formed the strongest clusters.
- **Medical acronyms excluded people outside healthcare.** Participants without clinical training read ALS, BLS, PALS and AED as duplicates, or dropped them into "Other".
- **Insider names had no home.** Labels like Clara Barton Society, Sound the Alarm and Climate Crisis had the lowest agreement, and most ended up in "Miscellaneous".
- **Training mixed two audiences.** Professional certifications for nurses and first responders sat next to public classes like babysitting and CPR.

## Phase 2: tree test

**Experiment design.** We wrote a formal experiment plan with a null and an alternative hypothesis for each task. The test was between-subjects, so that finding an item in one tree couldn't help someone in the other. We measured success, time on task and lostness. Our two research questions:

1. Does the new structure make navigation more efficient?
2. Do the renamed labels raise success and reduce lostness?

**The new structure.** It has nine task-based top-level categories. Acronyms are spelled out, and training is split into community classes and professional certifications.

**The test.** 51 participants each saw one structure: the original (n = 24) or the new one (n = 27). Both groups did the same eight tasks, including finding support for a military family, checking whether you can give blood today, a nurse looking for advanced life support training, and donating a vehicle.

## Results

- Overall task success rose from **57% to 84%**, and lostness fell from **0.31 to 0.12**.
- Median time on task fell **34%**. The improvement was significant on **6 of the 8 tasks** (p < .05).
- Spelling out the acronyms took the nurse's advanced life support task from **38% to 89%** success.
- In the post-test questionnaire, the share of people who called the tasks difficult fell from **25% to 7%**.

## What I'd do next

We recruited mostly through friends and family, and few of them knew the Red Cross well. Next I would test with clinicians and military families, the audiences the labels were hardest for. I would also run a first-click test on a visual mock-up, because icons and page layout carry context that a text-only tree can't show.
