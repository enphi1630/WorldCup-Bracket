# 🏆 FIFA World Cup 2026 — Knockout Bracket Pool

An interactive, auto-scoring bracket for the **2026 FIFA World Cup knockout stage**
(32 teams, Round of 32 → Final, **June 28 – July 19, 2026**).

Four players each drafted 8 countries. Every time one of a player's teams **wins**
a knockout match, that player earns points. **Results update automatically** — the
page pulls completed matches from ESPN's public World Cup feed and recomputes the
standings on its own as matches go final. (Winners can be cross-checked at
**[fifa.com](https://www.fifa.com/)**.)

---

## ▶️ Open it

Open **`index.html`** in any web browser (no install/server needed).

- **Nothing to click** — the bracket fetches completed results automatically on
  load and every 90 seconds, advances winners through every round, and updates
  the standings and rosters by itself.
- A **status bar** at the top shows the connection (green "● Live — last checked…",
  or red if it can't reach the feed), plus a **↻ Refresh now** button.
- Matches in progress show a red **● LIVE** badge with the running score.
- If the live feed is ever unreachable, it falls back to the last-known standings
  so the page is never blank.

> Needs an internet connection for live updates. The data source is ESPN's public
> scoreboard for the men's World Cup (`fifa.world`) — no API key, works directly
> from a browser.

A rendered snapshot lives at **`assets/bracket-screenshot.png`**.

---

## 🧮 Scoring

A player scores each time one of their teams **wins** a match in a round:

| Round | Points per win |
|---|---|
| Round of 32 | **1** |
| Round of 16 | **2** |
| Quarterfinals | **4** |
| Semifinals | **8** |
| Championship (wins the Final) | **16** |

Max possible for a single team that wins it all: 1 + 2 + 4 + 8 + 16 = **31**.
Total points distributed across the whole tournament: **80**.

---

## 👥 Players & drafted teams

| Player | Teams |
|---|---|
| 🔵 **Brett** | Spain, Netherlands, Mexico, Croatia, Japan, DR Congo, Paraguay, Ivory Coast |
| 🟢 **Luke** | Argentina, Sweden, Morocco, Canada, Belgium, Ecuador, Austria, Bosnia & Herzegovina |
| 🔴 **Cole** | Germany, Brazil, Norway, Portugal, Egypt, Ghana, Senegal, Algeria |
| 🟣 **Cooper** | France, England, Switzerland, Colombia, USA, Cape Verde, Australia, South Africa |

> All 32 knockout teams are owned — every match awards points to someone.

---

## 📊 Current Standings  *(as of June 29, 2026)*

Sorted by Total Score (descending). Updates as matches finalize.

| Team Name | Round of 32 | Round of 16 | Quarterfinals | Semifinals | Championship | **Total Score** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| 🟢 Luke | 1 | 0 | 0 | 0 | 0 | **1** |
| 🔵 Brett | 0 | 0 | 0 | 0 | 0 | **0** |
| 🔴 Cole | 0 | 0 | 0 | 0 | 0 | **0** |
| 🟣 Cooper | 0 | 0 | 0 | 0 | 0 | **0** |

*Only one knockout match has gone final so far: **South Africa 0–1 Canada** (June 28),
so Luke leads with 1 point. The rest of the Round of 32 is scheduled June 29 – July 3.*

---

## 🗺️ The Bracket

### Round of 32 (16 matches)

**Left half** (feeds Semifinal 1):

| # | Match |
|---|---|
| 1 | 🇩🇪 Germany vs Paraguay 🇵🇾 |
| 2 | 🇸🇪 Sweden vs France 🇫🇷 |
| 3 | 🇿🇦 South Africa vs **Canada** 🇨🇦 — *0–1 (FT, Jun 28)* ✅ |
| 4 | 🇳🇱 Netherlands vs Morocco 🇲🇦 |
| 5 | 🇵🇹 Portugal vs Croatia 🇭🇷 |
| 6 | 🇦🇹 Austria vs Spain 🇪🇸 |
| 7 | 🇺🇸 USA vs Bosnia & Herzegovina 🇧🇦 |
| 8 | 🇧🇪 Belgium vs Senegal 🇸🇳 |

**Right half** (feeds Semifinal 2):

| # | Match |
|---|---|
| 9 | 🇧🇷 Brazil vs Japan 🇯🇵 |
| 10 | 🇳🇴 Norway vs Ivory Coast 🇨🇮 |
| 11 | 🇲🇽 Mexico vs Ecuador 🇪🇨 |
| 12 | 🏴 England vs DR Congo 🇨🇩 |
| 13 | 🇦🇷 Argentina vs Cape Verde 🇨🇻 |
| 14 | 🇦🇺 Australia vs Egypt 🇪🇬 |
| 15 | 🇩🇿 Algeria vs Switzerland 🇨🇭 |
| 16 | 🇨🇴 Colombia vs Ghana 🇬🇭 |

### How the bracket flows

```
Round of 16
  R16-1: W(R32-1) vs W(R32-2)        R16-5: W(R32-9)  vs W(R32-10)
  R16-2: W(R32-3) vs W(R32-4)        R16-6: W(R32-11) vs W(R32-12)
  R16-3: W(R32-5) vs W(R32-6)        R16-7: W(R32-13) vs W(R32-14)
  R16-4: W(R32-7) vs W(R32-8)        R16-8: W(R32-15) vs W(R32-16)

Quarterfinals
  QF-1: W(R16-1) vs W(R16-2)         QF-3: W(R16-5) vs W(R16-6)
  QF-2: W(R16-3) vs W(R16-4)         QF-4: W(R16-7) vs W(R16-8)

Semifinals
  SF-1: W(QF-1) vs W(QF-2)           SF-2: W(QF-3) vs W(QF-4)

Final
  W(SF-1) vs W(SF-2)   →  🏆 Champion
```

This is the real, fixed CMA-2026 knockout bracket — no redraws.

---

## 🔄 How results update

**Automatically.** The page reads completed matches from ESPN's public World Cup
scoreboard (configured in `LIVE_CONFIG` in [`bracket-data.js`](bracket-data.js))
and maps each real match to its bracket slot by the two teams playing, so winners
advance through every round with no manual input. It refreshes every 90 seconds
(adjustable via `LIVE_CONFIG.refreshSeconds`) and on every page load.

### Manual fallback (optional)

If you ever want to hard-code a result (e.g. the live feed is down, or to seed a
known score), add it to `INITIAL_RESULTS` in [`bracket-data.js`](bracket-data.js):

```js
const INITIAL_RESULTS = {
  "r32-3": { winner: "Canada", score: "1–0" },   // baseline result
  // "r32-1": { winner: "Germany", score: "2–0" }, // example
};
```

Match ids are `r32-1`…`r32-16`, `r16-1`…`r16-8`, `qf-1`…`qf-4`, `sf-1`, `sf-2`, `final`.
Live results override these as matches go final.

---

## 📁 Files

| File | Purpose |
|---|---|
| `index.html` | The interactive bracket + standings UI (open this) |
| `bracket-data.js` | Players, teams, bracket wiring, scoring rules, known results |
| `assets/bracket-screenshot.png` | Rendered snapshot of the bracket |

---

## 🔗 Sources

Bracket structure and results verified against:

- [2026 FIFA World Cup knockout stage — Wikipedia](https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_knockout_stage)
- [FIFA — Knockout stage match schedule / bracket](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/knockout-stage-match-schedule-bracket)
- [Olympics.com — World Cup 2026 Round of 32 full schedule](https://www.olympics.com/en/news/fifa-world-cup-2026-bracket-round-32-full-schedule-live-updates)
- [CBS Sports — 2026 World Cup bracket / knockout stage](https://www.cbssports.com/soccer/news/2026-fifa-world-cup-bracket-knockout-stage/)
- [Sky Sports — World Cup 2026 bracket & route to the final](https://www.skysports.com/football/news/12098/13556636/world-cup-2026-bracket-and-knockout-fixtures-whos-facing-who-in-the-last-32-and-route-to-final)
- [Canada 1–0 South Africa — CBC](https://www.cbc.ca/sports/livestory/canada-vs-south-africa-june-28-live-updates-fifa-world-cup-2026-9.7249028)
