/* ====================================================================
   FORT BOYARD — TOURNOI (multi-groupes)
   Setup → Scoring + Paris + Awalé aléatoire + Scrabble par set de lettres
   ==================================================================== */

const EPREUVES = [
  { n: 1,  name: "Aquarium", desc: "Chacun son tour, déposer une pièce dans le verre suspendu dans l'aquarium. Le premier qui fait couler le verre a perdu.", mat: "Bocal, verre à shot, pièces" },
  { n: 2,  name: "Bâtonnets (stylos)", desc: "2 rangées de 10 stylos. Chacun retire 1 à 3 stylos à tour de rôle. Celui qui retire le dernier a perdu.", mat: "20-30 stylos" },
  { n: 3,  name: "Memory / Paires", desc: "Cartes face cachée. Chaque joueur retourne 2 cartes ; paire trouvée → il rejoue. Vainqueur = le plus de paires.", mat: "12 paires de cartes" },
  { n: 4,  name: "Feuille qui brûle", desc: "Chacun tient une feuille A4 et l'allume au signal. Garder la feuille le plus longtemps possible. Le premier qui lâche a perdu.", mat: "2 feuilles A4, 2 briquets, support métallique" },
  { n: 5,  name: "Poids tendu", desc: "Tenir un poids bras tendu à l'horizontale. Interdit de plier le coude. Le premier qui lâche a perdu.", mat: "2 haltères" },
  { n: 6,  name: "Figurines (emplacements)", desc: "Une photo d'objets est montrée 60 s. Retenir les emplacements puis les reproduire. Le plus précis gagne.", mat: "Images de référence, armoire, objets" },
  { n: 7,  name: "Awalé", desc: "Révéler les cases d'un pattern une à une, puis le cacher. Les joueurs reconstituent le pattern avec les bâtonnets.", mat: "Bâtonnets rouges/jaunes, barrettes grises" },
  { n: 8,  name: "Baguettes (Scrabble)", desc: "Un mot cible est défini. Attraper les lettres avec des baguettes (sans les mains) pour former le mot. Premier à finir gagne.", mat: "Lettres Scrabble, 2 paires de baguettes" },
  { n: 9,  name: "Marteau", desc: "Chacun son tour, taper sur un clou. Le dernier à l'enfoncer complètement gagne.", mat: "Marteau, clous, billot" },
  { n: 10, name: "Compteur", desc: "Une durée est définie. Au signal, compter dans sa tête et crier STOP à la durée estimée. Le plus précis gagne.", mat: "2 chronomètres" },
  { n: 11, name: "Chamboule-tout", desc: "6 gobelets en pyramide à ~3 m. 3 tirs au pistolet à flèche. Le plus de gobelets renversés gagne.", mat: "Gobelets, pistolet flèche, ligne de tir" },
  { n: 12, name: "Pierre / Feuille / Ciseaux / Puits", desc: "Pierre>Ciseaux, Ciseaux>Feuille, Feuille>Pierre&Puits, Puits>Pierre&Ciseaux. Best of 5.", mat: "Aucun matériel" },
];

// Scrabble FR — valeurs & distribution (jetons disponibles)
const LETTER_VALUES = { A:1,B:3,C:3,D:2,E:1,F:4,G:2,H:4,I:1,J:8,K:10,L:1,M:2,N:1,O:1,P:3,Q:8,R:1,S:1,T:1,U:1,V:4,W:10,X:10,Y:10,Z:10 };
const LETTER_COUNTS = { A:9,B:2,C:2,D:3,E:15,F:2,G:2,H:2,I:8,J:1,K:1,L:5,M:3,N:6,O:6,P:2,Q:1,R:6,S:6,T:6,U:6,V:2,W:1,X:1,Y:1,Z:1 };

// Dictionnaire FR (mots sans accent, MAJUSCULES)
const WORDS = ("AMIE AMIS ANGE ARME aube avis bain bave bras cafe cake camp cave cire clou code cube dame dent dose duel eau echo elfe face fete feu film flux four gant gaze gris jeux joue kiwi lait lion lune main mars mois mont muse neuf nuit obus orge ours pain parc paye phare pile plan plat plie pluie poire pomme pont porc pull quai rail rang rein riz robe roue ruse sage sang sept soir sort tarte taxi toit trou usine vague veau vent vide vrai yoga zone zoom " +
"abime achat agile aigle aigre algue ambre arene avion avoir bague banc barbe barge belge biche bingo blanc bombe bonus boxer brave breve bruit cable canal carte champ chaos chien choix cidre clair clave climat colle conte corde crabe craie crane crepe cube cygne danse decor delta digue diode douce drame eclat ecran elfes emeri encre epais epice epine etang ferme fibre fleur flore folie foret frein fruit furie garde geste givre glace globe grain grele griff guide hache havre herbe heure huile humer ideal igloo image index ivoire jadis jaune jeton joker judo jugar juste karma kayak ketch khan kilo koala krill label lacet large larme latin lever liane ligne livre logis loupe lutte lyric mache magie maire maman manga marge match medio melon merci metal miel miser moine monde motif moule muret nacre nage neige niche noble noeud noix norme noyau nuage nylon oasis ocean ombre ongle opera orage ordre osier ovale paire palet panda papier patte pavot perle peste phase photo piano piece pince piste plage plein pluie poele poids poire porte poste poule poutre prime proie quart quete queue radar radio rampe regle reine renne repas reseau rever rhum rideau rire robe ronde rouge route rugby ruche ruelle sable salade salle sante sapin satin sauce scene seuil signe singe sirop solde songe sucre suite super table tache talon tango tapis tasse taupe temps tenir terre tigre tirer toile tonus torse toupie tour trace tribu trois trompe vache vague valse vapeur vente verre veste viande vigne ville virus vodka voile volet wagon yacht yaourt zebre zinc zoom " +
"abricot animal article athlete bagage balcon ballon bambou banane bandit bateau bijoux billet bonbon bouche bougie bourse bracelet branche brioche bronze cactus calcul camion canard canape carafe carmin carton casino cellule cerise chaise chalet chance chapeau charme chemin cheval chiffre cinema citron clavier climat cloche cocon collier combat comete compas confort coquille corail coton couleur courage craint crayon crepon cuisine cymbale damier debris decret demain depart depense dessin diamant docteur domaine dragon eclair ecouter ecurie elegant emotion energie enigme epaule escale essence etoile examen exotique facette falaise famille fantome ferveur festin figure flacon flamme flotte fontaine fortune fourmi fromage galerie galaxie genie genou girafe glacon goeland golfe grange grappe griffe guitare hangar harpon hauteur heroine hibou hirondelle horizon hormone hublot humide humour hydrate icone idylle impulse insecte instant ivresse jachere jardin jasmin javelot jongleur jonquille jouet journal jouster jubile jungle karate kermesse lagune lampe lanterne lavande legende leopard liberte licorne lierre limace lingot lisiere litige losange lotus loupiote lumiere lutrin machine magasin magique mammouth mandarine manguier maniere marbre marelle marin marmotte matelas medaille melange menthe message meteore minute miracle mirage modele moineau molecule monarque montagne morceau moustique muraille musique mystere nageoire nappe narval nectar nenuphar nervure noisette nombril nougat nuance numero nuque oasis obstacle ocelot octobre odeur oeillet olive omelette orange orchidee origine ortie ourson outil ouvrage palace palette panache panier panorama panthere papaye papier paquet parade parasol parfum partie passion pastel pelican pendule perroquet phoenix pigeon pilote pinceau pirate piscine plante platine plumage poireau pommier portail potage poudre poulet praline presage prince prairie prunelle pyramide quartz quenelle quiche quille radeau rafale raisin rameau rapace ravage recolte refuge regard reglisse renard requin reseau ressort rivage rocher romance roseau rosier roulette ruban ruelle ruisseau sabot safran saison salade saphir sardine sauterelle savane scarabee sceptre science scorpion sculpture sentier serpent sextant silence singe sirene soldat sommet soucoupe source souris spirale squale stade statue sucre symbole tableau talisman tambour tangente tanniere tapioca tartine tempete tendre tentacule terreau theatre tiroir toboggan tomate torrent tortue toucan tournesol tracteur trefle tresor triangle tropical trottoir trouble tulipe turbine ukulele univers urgence usine vacarme vaisseau vallon vampire vanille vautour velours vendange verdure vertige vestige viaduc victoire vinaigre violette vipere virtuose visage vitrine volcan voyage walkyrie wagonnet xylophone yaourt zenith zephyr zodiaque").toUpperCase().split(/\s+/).filter(Boolean);

/* ---------- Persistence ---------- */
const STORE_KEY = "fortBoyardGame";
let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { started: false, players: [], duelCount: 24, duels: [] };
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

/* ====================================================================
   DUEL GENERATION (round-robin, équilibré)
   ==================================================================== */
function roundRobinPairs(players) {
  const ps = [...players];
  if (ps.length % 2) ps.push(null); // joueur fictif (bye)
  const n = ps.length;
  const arr = [...ps];
  const flat = [];
  for (let r = 0; r < n - 1; r++) {
    for (let i = 0; i < n / 2; i++) {
      const a = arr[i], b = arr[n - 1 - i];
      if (a !== null && b !== null) flat.push([a, b]);
    }
    arr.splice(1, 0, arr.pop()); // rotation (1er fixe)
  }
  return flat.length ? flat : [];
}

function generateDuels(players, count) {
  const pairs = roundRobinPairs(players);
  const duels = [];
  for (let i = 0; i < count; i++) {
    const pair = pairs[i % pairs.length];
    const ep = EPREUVES[i % EPREUVES.length];
    duels.push({ num: i + 1, round: Math.floor(i / EPREUVES.length) + 1,
      epreuve: ep.name, j1: pair[0], j2: pair[1], winner: null, bets: [] });
  }
  return duels;
}

/* ====================================================================
   SETUP
   ==================================================================== */
function renderPlayerInputs() {
  const box = document.getElementById("playerInputs");
  const names = setupPlayers;
  box.innerHTML = names.map((nm, i) => `
    <div class="player-row">
      <span class="pnum">${i + 1}</span>
      <input type="text" data-pi="${i}" value="${nm.replace(/"/g, "&quot;")}" placeholder="Prénom du joueur ${i + 1}" maxlength="20">
      <button class="del" data-del="${i}" ${names.length <= 2 ? "disabled" : ""}>✕</button>
    </div>`).join("");
}
let setupPlayers = ["", "", "", ""];
let setupDuelCount = 24;

document.getElementById("playerInputs").addEventListener("input", e => {
  if (e.target.dataset.pi !== undefined) setupPlayers[+e.target.dataset.pi] = e.target.value;
});
document.getElementById("playerInputs").addEventListener("click", e => {
  const del = e.target.closest("[data-del]");
  if (del && setupPlayers.length > 2) {
    setupPlayers.splice(+del.dataset.del, 1);
    renderPlayerInputs();
  }
});
document.getElementById("addPlayerBtn").addEventListener("click", () => {
  if (setupPlayers.length < 12) { setupPlayers.push(""); renderPlayerInputs(); }
});
document.getElementById("duelCountSeg").addEventListener("click", e => {
  const b = e.target.closest("button[data-n]");
  if (!b) return;
  setupDuelCount = +b.dataset.n;
  document.querySelectorAll("#duelCountSeg button").forEach(x => x.classList.toggle("active", x === b));
});
document.getElementById("startGameBtn").addEventListener("click", () => {
  const names = setupPlayers.map(n => n.trim()).filter(Boolean);
  const err = document.getElementById("setupError");
  if (names.length < 2) return showSetupError("Il faut au moins 2 joueurs.");
  if (new Set(names.map(n => n.toLowerCase())).size !== names.length)
    return showSetupError("Deux joueurs ne peuvent pas avoir le même nom.");
  err.hidden = true;
  state = { started: true, players: names, duelCount: setupDuelCount, duels: generateDuels(names, setupDuelCount) };
  save();
  enterGame();
});
function showSetupError(msg) {
  const err = document.getElementById("setupError");
  err.textContent = "⚠️ " + msg; err.hidden = false;
}

document.getElementById("newGameBtn").addEventListener("click", () => {
  if (confirm("Démarrer une nouvelle partie ? La partie en cours sera effacée.")) {
    localStorage.removeItem(STORE_KEY);
    state = loadState();
    setupPlayers = state.players.length ? [...state.players] : ["", "", "", ""];
    while (setupPlayers.length < 2) setupPlayers.push("");
    renderPlayerInputs();
    showSetup();
  }
});

function showSetup() {
  document.getElementById("tabs").hidden = true;
  document.getElementById("newGameBtn").hidden = true;
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById("setup").classList.add("active");
}
function enterGame() {
  document.getElementById("tabs").hidden = false;
  document.getElementById("newGameBtn").hidden = false;
  document.querySelectorAll(".tab").forEach((t, i) => t.classList.toggle("active", i === 0));
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById("classement").classList.add("active");
  renderAll();
}

/* ---------- Tabs ---------- */
document.getElementById("tabs").addEventListener("click", e => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === btn));
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === btn.dataset.tab));
});

/* ====================================================================
   SCORING / CLASSEMENT
   ==================================================================== */
function computeScores() {
  const s = {};
  state.players.forEach(p => s[p] = { player: p, duels: 0, gains: 0, parisOk: 0 });
  state.duels.forEach(d => {
    if (d.winner && s[d.winner]) s[d.winner].duels += 1;
    d.bets.forEach(b => {
      if (!d.winner || !b.sur || !b.mise || !s[b.parieur]) return;
      const ok = b.sur === d.winner;
      s[b.parieur].gains += ok ? b.mise : -b.mise;
      if (ok) s[b.parieur].parisOk += 1;
    });
  });
  const arr = Object.values(s).map(x => ({ ...x, total: x.duels + x.gains }));
  arr.sort((a, b) => b.total - a.total || b.duels - a.duels || b.parisOk - a.parisOk || a.player.localeCompare(b.player));
  return arr;
}

function renderClassement() {
  const scores = computeScores();
  const played = state.duels.filter(d => d.winner).length;
  document.getElementById("duelsPlayedPill").textContent = `${played} / ${state.duels.length} duels joués`;

  const medals = ["🥇", "🥈", "🥉"];
  const order = scores.length >= 3 ? [1, 0, 2] : (scores.length === 2 ? [0, 1] : [0]);
  const cls = { 0: "p1", 1: "p2", 2: "p3" };
  document.getElementById("podium").innerHTML = order.map(idx => {
    const p = scores[idx]; if (!p) return "";
    return `<div class="podium-spot ${cls[idx]}">
      <div class="medal">${medals[idx]}</div>
      <div class="pname">${p.player}</div>
      <div class="ppts">${p.total}</div>
    </div>`;
  }).join("");

  document.getElementById("rankingBody").innerHTML = scores.map((p, i) => {
    const g = p.gains > 0 ? `<span class="pos">+${p.gains}</span>` : p.gains < 0 ? `<span class="neg">${p.gains}</span>` : "0";
    return `<tr class="rank-${i + 1}">
      <td>${medals[i] || (i + 1)}</td>
      <td class="player">${p.player}</td>
      <td>${p.duels}</td><td>${p.duels}</td>
      <td>${g}</td><td>${p.parisOk}</td>
      <td class="total">${p.total}</td>
    </tr>`;
  }).join("");
}

/* ====================================================================
   DUELS & PARIS
   ==================================================================== */
function spectators(d) { return state.players.filter(p => p !== d.j1 && p !== d.j2); }

function renderDuels() {
  const list = document.getElementById("duelsList");
  list.innerHTML = state.duels.map(d => {
    const specs = spectators(d);
    const betsHtml = specs.length ? specs.map(sp => {
      const bet = d.bets.find(b => b.parieur === sp) || { parieur: sp, mise: 0, sur: "" };
      let result = `<span class="bet-result pending">en attente</span>`;
      if (d.winner && bet.sur && bet.mise) {
        result = bet.sur === d.winner
          ? `<span class="bet-result win">✅ +${bet.mise}</span>`
          : `<span class="bet-result lose">❌ −${bet.mise}</span>`;
      }
      const clear = (bet.mise || bet.sur) ? `<span class="bet-clear" data-clear="${d.num}" data-who="${sp}">effacer</span>` : "";
      return `<div class="bet-row">
        <span class="who">🎲 ${sp}</span> mise
        <select data-bet-mise="${d.num}" data-who="${sp}">
          <option value="0" ${bet.mise == 0 ? "selected" : ""}>—</option>
          <option value="1" ${bet.mise == 1 ? "selected" : ""}>1</option>
          <option value="2" ${bet.mise == 2 ? "selected" : ""}>2</option>
          <option value="3" ${bet.mise == 3 ? "selected" : ""}>3</option>
        </select> sur
        <select data-bet-sur="${d.num}" data-who="${sp}">
          <option value="" ${!bet.sur ? "selected" : ""}>—</option>
          <option value="${d.j1}" ${bet.sur === d.j1 ? "selected" : ""}>${d.j1}</option>
          <option value="${d.j2}" ${bet.sur === d.j2 ? "selected" : ""}>${d.j2}</option>
        </select> ${result} ${clear}
      </div>`;
    }).join("") : `<div class="hint">Aucun spectateur (2 joueurs) — pas de paris sur ce duel.</div>`;

    return `<div class="duel ${d.winner ? "done" : ""}">
      <div class="duel-head">
        <div class="duel-num">${d.num}</div>
        <div class="duel-epreuve">${d.epreuve}</div>
        <div class="duel-round">Round ${d.round}</div>
      </div>
      <div class="duel-body">
        <div class="matchup">
          <div class="fighter ${d.winner === d.j1 ? "winner" : ""}" data-win="${d.num}" data-player="${d.j1}">
            ${d.j1}<span class="tag">${d.winner === d.j1 ? "🏆 gagnant" : "cliquer si gagnant"}</span></div>
          <div class="vs">⚔️</div>
          <div class="fighter ${d.winner === d.j2 ? "winner" : ""}" data-win="${d.num}" data-player="${d.j2}">
            ${d.j2}<span class="tag">${d.winner === d.j2 ? "🏆 gagnant" : "cliquer si gagnant"}</span></div>
        </div>
        <div class="bets">
          <div class="bets-title">Paris des spectateurs (avant le duel)</div>
          ${betsHtml}
        </div>
      </div>
    </div>`;
  }).join("");
}

document.getElementById("duelsList").addEventListener("click", e => {
  const fighter = e.target.closest(".fighter");
  if (fighter) {
    const d = state.duels.find(x => x.num == fighter.dataset.win);
    d.winner = d.winner === fighter.dataset.player ? null : fighter.dataset.player;
    persistAndRefresh(); return;
  }
  const clr = e.target.closest("[data-clear]");
  if (clr) {
    const d = state.duels.find(x => x.num == clr.dataset.clear);
    d.bets = d.bets.filter(b => b.parieur !== clr.dataset.who);
    persistAndRefresh();
  }
});
document.getElementById("duelsList").addEventListener("change", e => {
  const t = e.target;
  const num = t.dataset.betMise || t.dataset.betSur;
  if (!num) return;
  const d = state.duels.find(x => x.num == num);
  let bet = d.bets.find(b => b.parieur === t.dataset.who);
  if (!bet) { bet = { parieur: t.dataset.who, mise: 0, sur: "" }; d.bets.push(bet); }
  if (t.dataset.betMise) bet.mise = parseInt(t.value, 10);
  if (t.dataset.betSur) bet.sur = t.value;
  d.bets = d.bets.filter(b => b.mise || b.sur);
  persistAndRefresh();
});
function persistAndRefresh() { save(); renderDuels(); renderClassement(); }

/* ====================================================================
   AWALÉ — pattern aléatoire
   ==================================================================== */
const AWALE_COLORS = ["R", "Y", "N"];
let awalePattern = [];
let awaleRevealed = [];

function renderAwaleBoard() {
  const board = document.getElementById("awaleBoard");
  if (!awalePattern.length) {
    document.getElementById("awaleProgress").textContent = "— / —";
    return;
  }
  const count = awaleRevealed.filter(Boolean).length;
  document.getElementById("awaleProgress").textContent = `${count} / ${awalePattern.length} révélées`;
  board.innerHTML = awalePattern.map((ch, i) =>
    `<div class="awale-cell ${awaleRevealed[i] ? "revealed" : "hidden-cell"}" data-cell="${i}">
       <span class="pos">${i + 1}</span><span class="dot ${ch}"></span></div>`).join("");
}
function newPattern() {
  const len = parseInt(document.getElementById("awaleLen").value, 10);
  awalePattern = Array.from({ length: len }, () => AWALE_COLORS[Math.floor(Math.random() * 3)]);
  awaleRevealed = Array(len).fill(false); // caché au départ
  renderAwaleBoard();
}
document.getElementById("genPatternBtn").addEventListener("click", newPattern);
document.getElementById("awaleBoard").addEventListener("click", e => {
  const cell = e.target.closest(".awale-cell"); if (!cell) return;
  const i = +cell.dataset.cell;
  awaleRevealed[i] = !awaleRevealed[i]; renderAwaleBoard();
});
document.getElementById("revealNextBtn").addEventListener("click", () => {
  if (!awalePattern.length) return newPattern();
  const next = awaleRevealed.indexOf(false);
  if (next !== -1) { awaleRevealed[next] = true; renderAwaleBoard(); }
});
document.getElementById("revealAllBtn").addEventListener("click", () => {
  if (!awalePattern.length) return;
  awaleRevealed = awaleRevealed.map(() => true); renderAwaleBoard();
});
document.getElementById("hideAllBtn").addEventListener("click", () => {
  if (!awalePattern.length) return;
  awaleRevealed = awaleRevealed.map(() => false); renderAwaleBoard();
});

/* ====================================================================
   SCRABBLE — set de lettres validé → génération de mots
   ==================================================================== */
function tileHtml(letter) {
  const L = letter.toUpperCase();
  if (L === "?") return `<div class="tile blank">?</div>`;
  return `<div class="tile">${L}<span class="val">${LETTER_VALUES[L] ?? 0}</span></div>`;
}
function wordScore(word) {
  return word.toUpperCase().split("").reduce((s, c) => s + (LETTER_VALUES[c] || 0), 0);
}
function canForm(word, pool) {
  const avail = { ...pool };
  let blanks = avail["?"] || 0;
  for (const c of word) {
    if (avail[c] > 0) avail[c]--;
    else if (blanks > 0) blanks--;
    else return false;
  }
  return true;
}

let pool = {};            // {A:2, E:1, ?:1}
let poolValidated = false;
let currentWord = "";
let wordVisible = false;

function renderKeyboard() {
  const letters = Object.keys(LETTER_VALUES);
  document.getElementById("letterKeyboard").innerHTML =
    letters.map(L => `<button data-add="${L}">${L}</button>`).join("") +
    `<button class="joker" data-add="?">?</button>`;
}
function renderPool() {
  const box = document.getElementById("poolTiles");
  const keys = Object.keys(pool).filter(k => pool[k] > 0);
  if (!keys.length) { box.innerHTML = `<span class="fw-empty">aucune lettre</span>`; return; }
  box.innerHTML = keys.map(k => {
    let html = "";
    for (let i = 0; i < pool[k]; i++) {
      html += `<span class="pool-tile-wrap" data-rm="${k}">${tileHtml(k)}<span class="rm">✕</span></span>`;
    }
    return html;
  }).join("");
}
document.getElementById("letterKeyboard").addEventListener("click", e => {
  const b = e.target.closest("[data-add]"); if (!b) return;
  const L = b.dataset.add;
  pool[L] = (pool[L] || 0) + 1;
  invalidatePool(); renderPool();
});
document.getElementById("poolTiles").addEventListener("click", e => {
  const w = e.target.closest("[data-rm]"); if (!w) return;
  const L = w.dataset.rm;
  if (pool[L] > 0) pool[L]--;
  if (!pool[L]) delete pool[L];
  invalidatePool(); renderPool();
});
document.getElementById("clearPoolBtn").addEventListener("click", () => {
  pool = {}; invalidatePool(); renderPool();
});
function invalidatePool() {
  poolValidated = false;
  currentWord = "";
  document.getElementById("poolStatus").hidden = true;
  document.getElementById("targetWord").classList.add("hidden");
  document.getElementById("foundWords").innerHTML = "";
  setGenEnabled(false);
}
function setGenEnabled(on) {
  ["genWordBtn", "toggleWordBtn", "showAllWordsBtn"].forEach(id => document.getElementById(id).disabled = !on);
}
function formableWords() {
  return [...new Set(WORDS.filter(w => w.length >= 3 && canForm(w, pool)))]
    .sort((a, b) => wordScore(b) - wordScore(a) || b.length - a.length);
}
document.getElementById("validatePoolBtn").addEventListener("click", () => {
  const total = Object.values(pool).reduce((a, b) => a + b, 0);
  const status = document.getElementById("poolStatus");
  if (total < 3) {
    poolValidated = false; setGenEnabled(false);
    status.hidden = false; status.textContent = "⚠️ ajoute au moins 3 lettres";
    return;
  }
  poolValidated = true;
  const matches = formableWords();
  setGenEnabled(matches.length > 0);
  status.hidden = false;
  status.textContent = matches.length
    ? `✅ set validé — ${matches.length} mot(s) possible(s)`
    : "✅ set validé — mais aucun mot du dico n'est formable, ajoute des voyelles";
});

function renderTargetWord() {
  const box = document.getElementById("targetWord");
  if (!currentWord) { box.classList.add("hidden"); return; }
  document.getElementById("wordText").textContent = currentWord;
  document.getElementById("wordTiles").innerHTML = currentWord.split("").map(tileHtml).join("");
  document.getElementById("wordMeta").textContent =
    `${currentWord.length} lettres • ${wordScore(currentWord)} points`;
  box.classList.toggle("hidden", !wordVisible);
}
document.getElementById("genWordBtn").addEventListener("click", () => {
  const matches = formableWords();
  if (!matches.length) return;
  currentWord = matches[Math.floor(Math.random() * matches.length)];
  wordVisible = true;
  document.getElementById("foundWords").innerHTML = "";
  renderTargetWord();
});
document.getElementById("toggleWordBtn").addEventListener("click", () => {
  if (!currentWord) {
    const matches = formableWords();
    if (matches.length) currentWord = matches[Math.floor(Math.random() * matches.length)];
  }
  wordVisible = !wordVisible;
  renderTargetWord();
});
document.getElementById("showAllWordsBtn").addEventListener("click", () => {
  const matches = formableWords();
  const out = document.getElementById("foundWords");
  if (!matches.length) { out.innerHTML = `<div class="fw-empty">Aucun mot formable avec ce set.</div>`; return; }
  out.innerHTML = matches.slice(0, 60).map(w =>
    `<div class="fw-row"><span class="fw-word">${w}</span><span class="fw-score">${wordScore(w)} pts</span></div>`
  ).join("") + (matches.length > 60 ? `<div class="fw-empty">… et ${matches.length - 60} autres</div>` : "");
});

function renderLetterValues() {
  document.getElementById("letterValues").innerHTML =
    Object.keys(LETTER_VALUES).map(tileHtml).join("") + tileHtml("?");
}

/* ====================================================================
   RÈGLES
   ==================================================================== */
function renderEpreuves() {
  document.getElementById("epreuvesList").innerHTML = EPREUVES.map(e => `
    <div class="epreuve">
      <div class="epreuve-head"><span class="epreuve-num">${e.n}</span><span class="epreuve-name">${e.name}</span></div>
      <div class="epreuve-desc">${e.desc}</div>
      <div class="epreuve-mat">🧰 ${e.mat}</div>
    </div>`).join("");
}

/* ====================================================================
   INIT
   ==================================================================== */
function renderAll() {
  renderClassement();
  renderDuels();
  renderAwaleBoard();
}

renderKeyboard();
renderPool();
renderLetterValues();
renderEpreuves();

if (state.started && state.duels.length) {
  enterGame();
} else {
  setupPlayers = ["", "", "", ""];
  renderPlayerInputs();
  showSetup();
}
