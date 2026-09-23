---
id: GEAS-04-01
title: "Ecosystems and Energy Flow"
part: "03_GEAS"
area: "04_Environmental_Sci_and_PH_Laws"
topic: 1
tier: 3
depth: full
problem_count: 0
prereqs: []
tags: ["ece", "geas", "environmental_sci_and_ph_laws"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Ecosystems and Energy Flow

> [!abstract] Scope
> Recall the vocabulary, laws and thresholds of ecology that the board asks directly: trophic levels, productivity, pyramids, succession, carrying capacity, biodiversity and the Philippine hotspot picture.

## Core Concept

> [!tip] Intuition
> An ecosystem is an energy pipeline with a leak at every joint: sunlight enters at the producers, roughly nine-tenths of the energy is lost as heat at each transfer, so only a few links can be supported before there is too little energy left to feed another level.

**Producers, consumers, decomposers.** Autotrophs (plants, algae, cyanobacteria) fix light or chemical energy into biomass; heterotrophs consume it. Herbivores are primary consumers, carnivores that eat them are secondary consumers, and so on. Decomposers (bacteria, fungi) and detritivores close the loop by returning nutrients to the soil. A **food chain** is one linear path; a **food web** is the realistic network of overlapping chains, and it is the food web — not a chain — that determines how a disturbance propagates.

**Energy flow is one-way; matter cycles.** Energy enters as solar radiation and leaves as heat, so an ecosystem is an open thermodynamic system. Only about 1% of incident solar energy is captured by photosynthesis. Gross primary productivity (GPP) is total fixation; net primary productivity (NPP = GPP - respiration) is what remains as new plant biomass and is what the rest of the food web actually lives on. Tropical rainforests and coral reefs have the highest NPP per unit area; open ocean is low per unit area but vast in total. The **10% law** (Lindeman) is the exam rule of thumb: only about 10% of the energy at one trophic level is assimilated into the next, so biomass and energy shrink roughly tenfold per step and food chains rarely exceed four or five links.

**Ecological pyramids.** A pyramid of **numbers** can invert (one tree supports many insects); a pyramid of **biomass** can invert in the ocean (phytoplankton turn over too fast to accumulate mass); a pyramid of **energy** can never invert, because the second law of thermodynamics forbids it. This is a favourite one-line exam discriminator.

**Population growth and carrying capacity.** Exponential growth follows $\frac{dN}{dt}=rN$. Logistic growth follows:
$$\frac{dN}{dt}=rN\left(1-\frac{N}{K}\right)$$
whose maximum growth rate occurs at $N=K/2$ (the inflection point, and the basis of maximum sustainable yield). Carrying capacity $K$ is set by limiting factors — food, water, space, light, dissolved oxygen, nutrients — and can be reduced by pollution or habitat loss.

**Biodiversity and Philippine hotspots.** Biodiversity has three levels: genetic, species and ecosystem. The Philippines is one of the world's megadiverse countries and a global biodiversity hotspot, with very high endemism and very high habitat loss. Conservation instruments the examiner names: NIPAS Act (RA 7586, 1992) and its Expanded version RA 11038 (2018), the Wildlife Resources Conservation and Protection Act (RA 9147, 2001), the Ban on Commercial Logging, and the Convention on Biological Diversity (CBD, 1992; Philippine ratification 1993). Key protected areas as examples: Tubbataha Reefs Natural Park, Puerto-Princesa Subterranean River, Mount Hamiguitan, and the Banaue Rice Terraces (the last four are UNESCO World Heritage sites); the Verde Island Passage is called the centre of the centre of marine shorefish biodiversity.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Net primary productivity | $NPP = GPP - R$ | R is autotrophic (plant) respiration only. NPP, not GPP, is the energy available to consumers. Units: kcal m^-2 yr^-1 or g C m^-2 yr^-1. |
| Ten percent law (Lindeman) | $E_{n+1} \approx 0.10\,E_n$ | Rule of thumb for trophic transfer; assimilation efficiencies in nature run 5-20%. Energy, not biomass, is what shrinks by this factor. |
| Energy after n transfers | $E_n = E_0 (0.10)^n$ | n counts transfers, not levels: producer -> primary consumer is one transfer. A 4-level chain leaves about 0.1% of the producer energy. |
| Ecological (trophic) efficiency | $\eta = \frac{E_{n+1}}{E_n}\times 100\%$ | Reported as a percentage. If a problem quotes 15%, use 0.15, not 0.10. |
| Exponential growth | $\frac{dN}{dt} = rN$ | Unlimited resources, early colonisation phase. r is the intrinsic rate of increase (per capita per unit time). |
| Logistic growth | $\frac{dN}{dt} = rN\left(1-\frac{N}{K}\right)$ | S-shaped curve. dN/dt is fastest at N = K/2; dN/dt = 0 at N = K. |
| Carrying capacity | $K = \mathrm{maximum\ sustainable\ population}$ | Set by the most limiting resource (Liebig); not a constant when habitat is degraded. |
| Species-area relationship | $S = cA^{z}$ | S species, A area; z is typically 0.2-0.35 for island/isolated habitats. Doubling area raises species by roughly 15-25%, not 100%. |
| Simpson's diversity index | $D = 1 - \sum p_i^{2}$ | p_i is the proportional abundance of species i. D near 0 = one species dominates; near 1 = even community. |
| Shannon-Wiener index | $H' = -\sum p_i \ln p_i$ | Uses natural logs unless stated. H' is not a percentage and has no fixed maximum. |
| NIPAS Act | $RA 7586\ (1992);\ expanded\ by\ RA\ 11038\ (2018)$ | Establishes and manages the National Integrated Protected Areas System. Administered by DENR-BMB with Protected Area Management Boards. |
| Wildlife protection law | $RA 9147\ (2001)$ | Wildlife Resources Conservation and Protection Act. Penalties escalate with the conservation status of the species (critically endangered highest). |
| Convention on Biological Diversity | $Rio\ Earth\ Summit\ 1992;\ entered\ into\ force\ 1993$ | Three objectives: conservation, sustainable use, and fair and equitable sharing of benefits. Philippines is a party. |

## Traps & Exam Notes

- Treating the 10% law as biomass transfer instead of usable energy transfer. The pyramid of **energy** can never invert, but pyramids of numbers and of biomass can — the exam asks which, and 'numbers' is the usual correct answer.
- Adding respiration to NPP to get GPP when the question asks for GPP. The relation is GPP = NPP + R; a plant fixing 1,200 kcal and respiring 450 kcal has GPP 1,200 kcal and NPP 750 kcal, not 1,650 kcal.
- Confusing NIPAS (RA 7586, protected areas) with the Wildlife Act (RA 9147, species). RA 7586 is areas; RA 9147 is flora and fauna.
- Calling the Philippines' protected areas 'national parks' only. The NIPAS categories include natural parks, protected landscapes and seascapes, natural monuments, wildlife sanctuaries, marine reserves, wilderness areas and resource reserves.
- Using $K$ (carrying capacity) as the point of maximum growth. Maximum population growth rate is at $K/2$; at $K$ the growth rate is zero.
- Assuming the food chain with the most links is the most stable. Longer chains lose more energy and are more vulnerable to disruption at any one link; food webs with redundancy are the stable ones.

## See Also

- [[02_Biogeochemical_Cycles]]
- [[03_Air_Pollution_and_Criteria_Pollutants]]
- [[05_Water_Quality_BOD,_COD,_DO,_TDS]]

---

⬅ *start* · [[_MOC_Environmental_Sci_and_PH_Laws|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Biogeochemical_Cycles|02 ➡]]
