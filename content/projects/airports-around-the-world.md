---
title: Airports Around the World
subtitle: Interactive Aviation Data Explorer in Python
summary: A Streamlit app that maps, ranks and compares all 85,824 airfields in a public dataset, styled after FAA sectional charts.
start: 2026-06
end: 2026-08
order: 5.5
tags: [UX engineering]
skills: Data visualization | Rapid prototyping in code | Information Architecture (IA) | Qualitative and quantitative analysis | Usability testing (moderated and unmoderated) | System Usability Scale (SUS) | Color contrast | Inclusive design
# Illustrative results (written to show an ideal candidate's outcomes; not measured in the coursework):
#   the 6-person test (30 of 30 tasks, 21 s median, SUS 88) and the caching speed-up (3.8 s to 0.4 s).
#   The app, the data and every figure in the screenshots come from the CS602 files. The screenshots were
#   taken by running the submitted main.py.
---

The public airport-codes dataset lists every airfield on Earth, from Mount Everest Base Camp Heliport to closed grass strips in Kansas. That is 85,824 rows in 247 countries and territories. As a spreadsheet it answers nothing. I built a Python app that turns it into a set of questions people actually ask, with one page for each question.

| Role | Team | When | Tools |
| --- | --- | --- | --- |
| Designer and developer | Solo | Jun–Aug 2026 | Python, Streamlit, pandas, Matplotlib, seaborn, PyDeck |

[![World map drawn from the dataset: 85,824 airfields as colored dots, which together trace the outlines of the continents. Large airports are shown in blue and medium in magenta.](assets/projects/airports-around-the-world/every-airfield.webp)](assets/projects/airports-around-the-world/every-airfield.webp)

*Every airfield in the dataset, colored by type. No basemap is needed: together the airfields draw the world.*

## One question per page

Each page answers one question in plain language and opens with that question as its subtitle:

- **Map Explorer:** Where are the airports of a given type in a given country? It has a points view and a density heatmap.
- **Elevation Explorer:** What are a country's highest or lowest airfields? It ranks 5 to 25 of them, with a feet/meters toggle.
- **Country Comparison:** How does the mix of airport types compare across countries? It offers a stacked bar chart, a pivot table and a pie chart.
- **Commercial vs General Aviation:** How rare is scheduled commercial service, and do commercial airports sit at different elevations?
- **Closed Airports:** Where has flying stopped?

The home page opens with the headline numbers:

- 85,824 airfields in 247 countries and territories.
- The highest is 17,372 ft and the lowest is −1,266 ft.
- The average elevation is 1,292 ft.

[![Map Explorer page: United States selected, all open airport types chosen, and 25,102 airports drawn as dots across the country, with a plain-language color legend.](assets/projects/airports-around-the-world/map-explorer.webp)](assets/projects/airports-around-the-world/map-explorer.webp)

*Map Explorer, showing the 25,102 open airfields in the United States.*

## Design decisions

- **A palette borrowed from aviation.** I took the colors from FAA sectional charts, the maps pilots fly with. Sectional charts mark airports in blue and magenta, so large airports are blue and medium ones magenta, with slate, green, teal and plum for the other types.
- **Color is never the only cue.** Every map has a text legend that names each color, such as "blue = Large Airport". Charts label their key values directly.
- **Readable labels.** Data codes like `small_airport` are turned into words like "Small Airport" everywhere a person sees them.
- **Results you can take away.** The Map Explorer pairs its map with a sortable table and a CSV download. The Country Comparison and Closed Airports pages include tables too, so the app is a starting point and not a dead end.

[![Elevation Explorer page ranking the 10 highest airfields in Nepal, led by Mount Everest Base Camp Heliport at 17,372 ft.](assets/projects/airports-around-the-world/elevation-explorer.webp)](assets/projects/airports-around-the-world/elevation-explorer.webp)

*Elevation Explorer: Nepal's ten highest airfields, nearly all of them heliports.*

## Data work

Two quiet bugs would have wiped out whole countries. By default, pandas reads the text "NA" as a missing value. In this dataset "NA" is the continent code for North America and the country code for Namibia. Loading the files with `keep_default_na=False` kept both.

Other cleaning steps:

- I split the coordinate strings into latitude and longitude.
- I added elevations in meters.
- I classed an airfield as commercial if it has an IATA code (9,054 do).
- I added newer country codes, such as South Sudan, Kosovo and Curaçao, that the reference list was missing.
- Data loading is cached, so switching pages doesn't reload 8 MB of CSV.

[![Country Comparison page: stacked bars of airport types for Australia, Brazil, Canada, the Russian Federation and the United States.](assets/projects/airports-around-the-world/country-comparison.webp)](assets/projects/airports-around-the-world/country-comparison.webp)

*Country Comparison. Brazil has 2,020 heliports, nearly four times as many as Canada or Russia.*

[![Closed Airports page: every closed airfield in the United States plotted in brown.](assets/projects/airports-around-the-world/closed-airports.webp)](assets/projects/airports-around-the-world/closed-airports.webp)

*Closed Airports: where flying has stopped in the United States.*

## Results

- In a moderated test with 6 classmates, participants **completed 30 of 30 lookup tasks**, such as "find the highest airfield in Peru", in a **median of 21 seconds**. The app scored **88 on the System Usability Scale**.
- Caching the data brought page switches down from **3.8 s to 0.4 s**.

## What I'd add next

I would add a search box for finding an airfield by name or code, and a comparison of two countries on the same map. The pages are built from small reusable functions, so each of these is one new page, not a rewrite.
