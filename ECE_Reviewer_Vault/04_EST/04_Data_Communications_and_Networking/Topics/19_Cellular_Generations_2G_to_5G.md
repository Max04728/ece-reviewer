---
id: EST-04-19
title: "Cellular Generations 2G to 5G"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 19
tier: 3
depth: full
problem_count: 0
prereqs: ["[[18_Cellular_Fundamentals,_Reuse_and_Handoff]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 19 — Cellular Generations 2G to 5G

> [!abstract] Scope
> Recall the technology, multiple-access scheme, peak data rate and defining feature of each cellular generation from 1G through 5G.

## Core Concept

> [!tip] Intuition
> Each generation answers the previous generation's bottleneck: 1G was analog and insecure, 2G made it digital, 3G made it fast enough for data, 4G made it all-IP and flat, and 5G made it fast enough for machines as well as people.

**1G — analog voice.** First-generation systems (AMPS in North America, TACS in the UK, NMT in Scandinavia) carried analog FM voice over FDMA channels of 30 kHz, with no encryption, no data service and no roaming standard. Capacity was limited by the channelisation and by the reuse cluster size, and calls could be intercepted with a scanner. 1G established the cellular architecture — cells, frequency reuse, handoff, the mobile telephone switching office — that every later generation inherits.

**2G — digital voice and the first data.** Second-generation systems digitised the air interface and introduced multiple-access schemes that increased capacity roughly threefold over analog. GSM used TDMA with 8 slots on a 200 kHz carrier, plus a SIM card, encryption, SMS and international roaming; IS-136 in North America was a TDMA variant, and IS-95 introduced CDMA with its soft-capacity and soft-handoff advantages. Voice was encoded at 9.6 to 14.4 kbps and circuit-switched data ran at similar rates. 2.5G followed with GPRS (packet data over the existing air interface, roughly 40–170 kbps) and EDGE (a new modulation scheme on the same 200 kHz carrier, up to about 384 kbps), neither of which met the ITU's 3G requirements.

**3G — mobile broadband.** IMT-2000 set the goal of 144 kbps for vehicular, 384 kbps for pedestrian and 2 Mbps for indoor or fixed use. UMTS/WCDMA (Europe and Japan), CDMA2000 (North America and Korea) and TD-SCDMA (China) delivered it, all based on CDMA with 5 MHz carriers. 3G introduced video calling, mobile internet and the app economy, and HSDPA/HSUPA added higher-order modulation and fast scheduling to push peak rates toward 14.4 Mbps and beyond. The key architectural shift was that data became a first-class service rather than a circuit-switched afterthought.

**4G — all-IP and flat architecture.** LTE was designed without a circuit-switched domain at all: voice is carried as VoIP over the packet core (VoLTE). It replaced CDMA with OFDMA on the downlink and SC-FDMA on the uplink, adopted MIMO and flexible channel bandwidths of 1.4 to 20 MHz, and flattened the core into an all-IP evolved packet core so that latency fell to the tens of milliseconds. Peak rates were specified at 100 Mbps for high mobility and 1 Gbps for low mobility; LTE-Advanced added carrier aggregation, higher-order MIMO and relay nodes to reach those targets. 4G is the generation that made mobile video practical.

**5G — three service classes.** 5G NR is specified around three use cases rather than a single peak rate: enhanced mobile broadband (eMBB, peak rates of 20 Gbps downlink and 10 Gbps uplink), ultra-reliable low-latency communications (URLLC, 1 ms radio latency and 99.999% reliability) and massive machine-type communications (mMTC, up to one million devices per square kilometre). Technically it extends OFDMA with flexible numerology (subcarrier spacings of 15, 30, 60 and 120 kHz), massive MIMO with beamforming, millimetre-wave bands above 24 GHz for bandwidth and sub-6 GHz bands for coverage, and network slicing to partition one physical network into logically independent ones. The important conceptual point is that 5G's novelty is not only speed — it is the ability to serve a latency- and reliability-critical service and a low-power sensor service on the same infrastructure.

**The pattern across generations.** Each transition changed the multiple-access scheme first and the architecture second. 1G used FDMA, 2G used TDMA or CDMA, 3G used CDMA with wider carriers, 4G used OFDMA, and 5G uses scalable OFDMA. Peak rate grew roughly an order of magnitude per generation, while latency fell from hundreds of milliseconds to a target of 1 ms. In an exam, the reliable discriminators are: analog versus digital (1G/2G boundary), circuit versus packet voice (3G/4G boundary), and service-class diversity rather than raw speed (4G/5G boundary).

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| 1G access and rate | $\mathrm{FDMA},\ 30\ \mathrm{kHz\ channels},\ \mathrm{analog\ FM\ voice}$ | AMPS/TACS/NMT. No data service and no encryption. |
| 2G access and rate | $\mathrm{TDMA\ (GSM,\ 8\ slots/200\ kHz)}\ \mathrm{or\ CDMA\ (IS{-}95)}$ | Voice at 9.6-14.4 kbps. Digital, encrypted, SMS and roaming. |
| 2.5G packet data | $\mathrm{GPRS} \approx 40{-}170\ \mathrm{kbps}; \quad \mathrm{EDGE} \approx 384\ \mathrm{kbps}$ | Packet overlay on the 2G air interface. Below the IMT-2000 requirement, hence 2.5G rather than 3G. |
| 3G IMT-2000 targets | $144\ \mathrm{kbps\ vehicular},\ 384\ \mathrm{kbps\ pedestrian},\ 2\ \mathrm{Mbps\ indoor}$ | Delivered by UMTS/WCDMA, CDMA2000 and TD-SCDMA on 5 MHz CDMA carriers. |
| 3G evolution | $\mathrm{HSDPA} \approx 14.4\ \mathrm{Mbps\ peak}$ | Adds higher-order modulation and fast scheduling to WCDMA. |
| 4G peak rates | $100\ \mathrm{Mbps\ high\ mobility},\ 1\ \mathrm{Gbps\ low\ mobility}$ | LTE requirements. All-IP, flattened core, no circuit-switched domain. |
| 4G access scheme | $\mathrm{OFDMA\ downlink},\ \mathrm{SC{-}FDMA\ uplink}$ | SC-FDMA on the uplink keeps the handset's peak-to-average power ratio low. |
| 4G channel bandwidths | $1.4,\ 3,\ 5,\ 10,\ 15,\ 20\ \mathrm{MHz}$ | Carrier aggregation in LTE-Advanced combines up to five of these. |
| 5G peak rates | $20\ \mathrm{Gbps\ downlink},\ 10\ \mathrm{Gbps\ uplink}$ | eMBB target for 5G NR. URLLC targets 1 ms radio latency and 99.999% reliability. |
| 5G device density | $10^6\ \mathrm{devices/km^2}\ (\mathrm{mMTC})$ | The massive machine-type communication requirement. |
| 5G numerology | $\Delta f = 15,\ 30,\ 60,\ 120\ \mathrm{kHz}$ | Scalable subcarrier spacing. Higher spacing suits millimetre-wave and low-latency use. |
| Latency by generation | $2G \approx 300{-}1000\ \mathrm{ms}; \quad 4G \approx 20{-}50\ \mathrm{ms}; \quad 5G\ \mathrm{URLLC} \approx 1\ \mathrm{ms}$ | Round-trip user-plane latency. The order-of-magnitude drop from 4G to 5G is what enables remote control applications. |

## Traps & Exam Notes

- **Calling GPRS and EDGE 3G.** They are 2.5G: packet-data overlays on the 2G air interface that do not meet the IMT-2000 requirement of 144 kbps vehicular / 384 kbps pedestrian. EDGE's nominal 384 kbps is a peak, not a mobility guarantee.
- **Assuming 4G uses CDMA because 3G did.** LTE replaced CDMA entirely with OFDMA (downlink) and SC-FDMA (uplink). Confusing the 3G and 4G access schemes is the most common generation-mapping error.
- **Describing 5G only by its peak rate.** The defining feature is the three service classes — eMBB, URLLC and mMTC — served on one infrastructure through network slicing and flexible numerology. A question that mentions 1 ms latency or a million devices per square kilometre is testing URLLC or mMTC, not peak throughput.
- **Believing 4G dropped voice.** LTE has no circuit-switched domain, but voice is still carried — as VoIP over the packet core (VoLTE). Saying 4G has no voice service confuses the architecture with the service.
- **Treating millimetre wave as the whole of 5G.** mmWave (above 24 GHz) provides bandwidth but poor propagation and coverage; sub-6 GHz provides coverage. 5G NR uses both, and a network described as mmWave-only would be unusable indoors.
- **Assuming each generation is backward incompatible by design.** Real deployments are layered: 5G hands off to LTE, which hands off to 3G or 2G, and multi-mode handsets support all of them. The generational boundary is a specification milestone, not a hard network partition.

## See Also

- [[18_Cellular_Fundamentals,_Reuse_and_Handoff]]
- [[16_Multiple_Access_FDMA,_TDMA,_CDMA]]
- [[17_OFDMA_and_Spread_Spectrum]]
- [[14_Multiplexing_FDM,_TDM,_T1_and_E1]]

---

[[18_Cellular_Fundamentals,_Reuse_and_Handoff|⬅ 18]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
