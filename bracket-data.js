/* =====================================================================
   FIFA World Cup 2026 — Knockout Bracket Pool
   ---------------------------------------------------------------------
   Single source of truth for the bracket.  Edit `INITIAL_RESULTS` below
   as matches go final (or just click the winners in the web page — the
   page saves your picks to the browser automatically).

   Scoring (points awarded to a team's OWNER each time their team WINS a
   match in a given round):
       Round of 32 ....... 1
       Round of 16 ....... 2
       Quarterfinals ..... 4
       Semifinals ........ 8
       Championship ..... 16   (winning the Final)
   ===================================================================== */

/* ---- Players & their 8 drafted countries -------------------------- */
const PLAYERS = {
  Brett:  { color: "#2563eb", teams: ["Spain","Netherlands","Mexico","Croatia","Japan","DR Congo","Paraguay","Ivory Coast"] },
  Luke:   { color: "#16a34a", teams: ["Argentina","Sweden","Morocco","Canada","Belgium","Ecuador","Austria","Bosnia & Herzegovina"] },
  Cole:   { color: "#dc2626", teams: ["Germany","Brazil","Norway","Portugal","Egypt","Ghana","Senegal","Algeria"] },
  Cooper: { color: "#9333ea", teams: ["France","England","Switzerland","Colombia","USA","Cape Verde","Australia","South Africa"] },
};

/* ---- Points per round --------------------------------------------- */
const ROUND_POINTS = { R32: 1, R16: 2, QF: 4, SF: 8, FINAL: 16 };
const ROUND_LABEL  = { R32: "Round of 32", R16: "Round of 16", QF: "Quarterfinals", SF: "Semifinals", FINAL: "Championship" };
const ROUND_ORDER  = ["R32","R16","QF","SF","FINAL"];

/* ---- Country flag emojis ------------------------------------------ */
const FLAGS = {
  "Spain":"🇪🇸","Netherlands":"🇳🇱","Mexico":"🇲🇽","Croatia":"🇭🇷","Japan":"🇯🇵","DR Congo":"🇨🇩","Paraguay":"🇵🇾","Ivory Coast":"🇨🇮",
  "Argentina":"🇦🇷","Sweden":"🇸🇪","Morocco":"🇲🇦","Canada":"🇨🇦","Belgium":"🇧🇪","Ecuador":"🇪🇨","Austria":"🇦🇹","Bosnia & Herzegovina":"🇧🇦",
  "Germany":"🇩🇪","Brazil":"🇧🇷","Norway":"🇳🇴","Portugal":"🇵🇹","Egypt":"🇪🇬","Ghana":"🇬🇭","Senegal":"🇸🇳","Algeria":"🇩🇿",
  "France":"🇫🇷","England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Switzerland":"🇨🇭","Colombia":"🇨🇴","USA":"🇺🇸","Cape Verde":"🇨🇻","Australia":"🇦🇺","South Africa":"🇿🇦",
};

/* ---- The bracket --------------------------------------------------
   Each match has:
     id, round, side ("L"/"R"/"C" for layout),
     a / b  -> either {team:"X"} (a fixed seed) or {win:"matchId"} (winner of a prior match)
   The Round of 32 matchups, the Round-of-16 pairings and the
   Quarterfinal grouping are the real, fixed CMA-2026 bracket.
------------------------------------------------------------------- */
const MATCHES = [
  /* ---------------- LEFT HALF (feeds Semifinal 1) ---------------- */
  // Round of 32
  { id:"r32-1",  round:"R32", side:"L", a:{team:"Germany"},       b:{team:"Paraguay"} },
  { id:"r32-2",  round:"R32", side:"L", a:{team:"Sweden"},        b:{team:"France"} },
  { id:"r32-3",  round:"R32", side:"L", a:{team:"South Africa"},  b:{team:"Canada"} },
  { id:"r32-4",  round:"R32", side:"L", a:{team:"Netherlands"},   b:{team:"Morocco"} },
  { id:"r32-5",  round:"R32", side:"L", a:{team:"Portugal"},      b:{team:"Croatia"} },
  { id:"r32-6",  round:"R32", side:"L", a:{team:"Austria"},       b:{team:"Spain"} },
  { id:"r32-7",  round:"R32", side:"L", a:{team:"USA"},           b:{team:"Bosnia & Herzegovina"} },
  { id:"r32-8",  round:"R32", side:"L", a:{team:"Belgium"},       b:{team:"Senegal"} },
  // Round of 16
  { id:"r16-1",  round:"R16", side:"L", a:{win:"r32-1"},  b:{win:"r32-2"} },
  { id:"r16-2",  round:"R16", side:"L", a:{win:"r32-3"},  b:{win:"r32-4"} },
  { id:"r16-3",  round:"R16", side:"L", a:{win:"r32-5"},  b:{win:"r32-6"} },
  { id:"r16-4",  round:"R16", side:"L", a:{win:"r32-7"},  b:{win:"r32-8"} },
  // Quarterfinals
  { id:"qf-1",   round:"QF",  side:"L", a:{win:"r16-1"},  b:{win:"r16-2"} },
  { id:"qf-2",   round:"QF",  side:"L", a:{win:"r16-3"},  b:{win:"r16-4"} },
  // Semifinal 1
  { id:"sf-1",   round:"SF",  side:"L", a:{win:"qf-1"},   b:{win:"qf-2"} },

  /* ---------------- RIGHT HALF (feeds Semifinal 2) --------------- */
  // Round of 32
  { id:"r32-9",  round:"R32", side:"R", a:{team:"Brazil"},        b:{team:"Japan"} },
  { id:"r32-10", round:"R32", side:"R", a:{team:"Norway"},        b:{team:"Ivory Coast"} },
  { id:"r32-11", round:"R32", side:"R", a:{team:"Mexico"},        b:{team:"Ecuador"} },
  { id:"r32-12", round:"R32", side:"R", a:{team:"England"},       b:{team:"DR Congo"} },
  { id:"r32-13", round:"R32", side:"R", a:{team:"Argentina"},     b:{team:"Cape Verde"} },
  { id:"r32-14", round:"R32", side:"R", a:{team:"Australia"},     b:{team:"Egypt"} },
  { id:"r32-15", round:"R32", side:"R", a:{team:"Algeria"},       b:{team:"Switzerland"} },
  { id:"r32-16", round:"R32", side:"R", a:{team:"Colombia"},      b:{team:"Ghana"} },
  // Round of 16
  { id:"r16-5",  round:"R16", side:"R", a:{win:"r32-9"},  b:{win:"r32-10"} },
  { id:"r16-6",  round:"R16", side:"R", a:{win:"r32-11"}, b:{win:"r32-12"} },
  { id:"r16-7",  round:"R16", side:"R", a:{win:"r32-13"}, b:{win:"r32-14"} },
  { id:"r16-8",  round:"R16", side:"R", a:{win:"r32-15"}, b:{win:"r32-16"} },
  // Quarterfinals
  { id:"qf-3",   round:"QF",  side:"R", a:{win:"r16-5"},  b:{win:"r16-6"} },
  { id:"qf-4",   round:"QF",  side:"R", a:{win:"r16-7"},  b:{win:"r16-8"} },
  // Semifinal 2
  { id:"sf-2",   round:"SF",  side:"R", a:{win:"qf-3"},   b:{win:"qf-4"} },

  /* ---------------- FINAL --------------------------------------- */
  { id:"final",  round:"FINAL", side:"C", a:{win:"sf-1"}, b:{win:"sf-2"} },
];

/* ---- Known final results -----------------------------------------
   key = match id, value = { winner: "<team>", score: "x–y" (optional) }
   As of 2026-06-29 only the opening knockout match has gone final.
   Add entries here as matches finalize (winners verified at fifa.com).
------------------------------------------------------------------- */
const INITIAL_RESULTS = {
  "r32-3": { winner: "Canada", score: "1–0" },   // 28 Jun 2026, Los Angeles (SoFi) — Eustáquio 90'+
};

/* ---- Live results feed (ESPN public scoreboard) -------------------
   The page auto-fetches completed match results from ESPN and advances
   the bracket on its own — no clicking required. ESPN allows browser
   (cross-origin) requests and needs no API key.
------------------------------------------------------------------- */
const LIVE_CONFIG = {
  espnUrl: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard",
  start: "2026-06-28",      // first knockout date
  end:   "2026-07-19",      // Final
  refreshSeconds: 90,       // auto-refresh interval
};

/* Map each of our 32 teams to the names/codes ESPN might report.
   Matching is accent- and punctuation-insensitive, so only meaningful
   variants and the FIFA 3-letter code are listed. */
const TEAM_ALIASES = {
  "Spain":["ESP","Spain"], "Netherlands":["NED","NLD","Netherlands","Holland"],
  "Mexico":["MEX","Mexico"], "Croatia":["CRO","Croatia"], "Japan":["JPN","Japan"],
  "DR Congo":["COD","CGO","DR Congo","Congo DR","DRC","Democratic Republic of the Congo","Congo"],
  "Paraguay":["PAR","PRY","Paraguay"], "Ivory Coast":["CIV","Ivory Coast","Cote d'Ivoire","Côte d'Ivoire"],
  "Argentina":["ARG","Argentina"], "Sweden":["SWE","Sweden"], "Morocco":["MAR","Morocco"],
  "Canada":["CAN","Canada"], "Belgium":["BEL","Belgium"], "Ecuador":["ECU","Ecuador"],
  "Austria":["AUT","Austria"], "Bosnia & Herzegovina":["BIH","Bosnia & Herzegovina","Bosnia and Herzegovina","Bosnia-Herzegovina","Bosnia"],
  "Germany":["GER","DEU","Germany"], "Brazil":["BRA","Brazil"], "Norway":["NOR","Norway"],
  "Portugal":["POR","PRT","Portugal"], "Egypt":["EGY","Egypt"], "Ghana":["GHA","Ghana"],
  "Senegal":["SEN","Senegal"], "Algeria":["ALG","DZA","Algeria"],
  "France":["FRA","France"], "England":["ENG","England"], "Switzerland":["SUI","SWI","CHE","Switzerland"],
  "Colombia":["COL","Colombia"], "USA":["USA","US","United States","United States of America"],
  "Cape Verde":["CPV","Cape Verde","Cabo Verde"], "Australia":["AUS","Australia"],
  "South Africa":["RSA","ZAF","South Africa"],
};

/* expose for index.html */
window.WC = { PLAYERS, ROUND_POINTS, ROUND_LABEL, ROUND_ORDER, FLAGS, MATCHES, INITIAL_RESULTS, LIVE_CONFIG, TEAM_ALIASES };
