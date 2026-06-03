/* ====================================================================
   FORT BOYARD — TOURNOI COLOC
   Scoring + Paris + Awalé + Scrabble
   ==================================================================== */

const PLAYERS = ["Loulou", "Flo", "Livliv", "El Pet"];

const EPREUVES = [
  { n: 1,  name: "Aquarium", desc: "Chacun son tour, déposer une pièce dans le verre suspendu dans l'aquarium. Le premier qui fait couler le verre a perdu.", mat: "Bocal, verre à shot, pièces" },
  { n: 2,  name: "Bâtonnets (stylos)", desc: "2 rangées de 10 stylos. Chacun retire 1 à 3 stylos à tour de rôle. Celui qui retire le dernier a perdu.", mat: "20-30 stylos" },
  { n: 3,  name: "Memory / Paires", desc: "Cartes face cachée. Chaque joueur retourne 2 cartes ; paire trouvée → il rejoue. Vainqueur = le plus de paires.", mat: "12 paires de Citadelle" },
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

// Duels : [num, round, epreuveIndex(0-based), j1, j2]
const DUELS_DEF = [
  [1,1,0,"Loulou","Flo"],   [2,1,1,"Livliv","El Pet"], [3,1,2,"Loulou","Livliv"],
  [4,1,3,"Flo","El Pet"],   [5,1,4,"Loulou","El Pet"], [6,1,5,"Flo","Livliv"],
  [7,1,6,"Loulou","Flo"],   [8,1,7,"Livliv","El Pet"], [9,1,8,"Loulou","Livliv"],
  [10,1,9,"Flo","El Pet"],  [11,1,10,"Loulou","El Pet"],[12,1,11,"Flo","Livliv"],
  [13,2,0,"Livliv","El Pet"],[14,2,1,"Loulou","Flo"],   [15,2,2,"Flo","El Pet"],
  [16,2,3,"Loulou","Livliv"],[17,2,4,"Flo","Livliv"],   [18,2,5,"Loulou","El Pet"],
  [19,2,6,"Livliv","El Pet"],[20,2,7,"Loulou","Flo"],   [21,2,8,"Flo","El Pet"],
  [22,2,9,"Loulou","Livliv"],[23,2,10,"Flo","Livliv"],  [24,2,11,"Loulou","El Pet"],
];

// Awalé patterns : R=rouge, Y=jaune, N=neutre(grise)
const AWALE_PATTERNS = [
  "NRRNYRRRNR",
  "NNNRNYRRRR",
  "RNNRNRNNNN",
  "YRYNYRRNYY",
  "YRRYRRYRYY",
  "NYRNYNRYRN",
  "YNNYNRNRRN",
];

// Scrabble FR — valeurs & distribution (jetons disponibles)
const LETTER_VALUES = { A:1,B:3,C:3,D:2,E:1,F:4,G:2,H:4,I:1,J:8,K:10,L:1,M:2,N:1,O:1,P:3,Q:8,R:1,S:1,T:1,U:1,V:4,W:10,X:10,Y:10,Z:10 };
const LETTER_COUNTS = { A:9,B:2,C:2,D:3,E:15,F:2,G:2,H:2,I:8,J:1,K:1,L:5,M:3,N:6,O:6,P:2,Q:1,R:6,S:6,T:6,U:6,V:2,W:1,X:1,Y:1,Z:1 };

// Dictionnaire FR (mots sans accent, MAJUSCULES) pour le générateur
const WORDS = ("AMIE AMIS ANGE ARME aube avis bain bave bras cafe cake camp cave cire clou code cube dame dent dose duel eau echo elfe face fete feu film flux four gant gaze gris jeux joue kiwi lait lion lune main mars mois mont muse neuf nuit obus orge ours pain parc paye phare pile plan plat plie pluie poire pomme pont porc pull quai rail rang rein riz robe roue ruse sage sang sept soir sort tarte taxi toit trou usine vague veau vent vide vrai yoga zone zoom " +
"abime achat agile aigle aigre algue ambre arene avion avoir bague banc barbe barge belge biche bingo blanc bombe bonus boxer brave breve bruit cable canal carte champ chaos chien choix cidre clair clave climat colle conte corde crabe craie crane crepe cube cygne danse decor delta digue diode douce drame eclat ecran elfes emeri encre epais epice epine etang ferme fibre fleur flore folie foret frein fruit furie garde geste givre glace globe grain grele griff guide hache havre herbe heure huile humer ideal igloo image index ivoire jadis jaune jeton joker judo jugar juste karma kayak ketch khan kilo koala krill label lacet large larme latin lever liane ligne livre logis loupe lutte lyric mache magie maire maman manga marge match medio melon merci metal miel miser moine monde motif moule muret nacre nage neige niche noble noeud noix norme noyau nuage nylon oasis ocean ombre ongle opera orage ordre osier ovale paire palet panda papier patte pavot perle peste phase photo piano piece pince piste plage plein pluie poele poids poire porte poste poule poutre prime proie quart quete queue radar radio rampe regle reine renne repas reseau rever rhum rideau rire robe ronde rouge route rugby ruche ruelle sable salade salle sante sapin satin sauce scene seuil signe singe sirop solde songe sucre suite super table tache talon tango tapis tasse taupe temps tenir terre tigre tirer toile tonus torse toupie tour trace tribu trois trompe vache vague valse vapeur vente verre veste viande vigne ville virus vodka voile volet wagon yacht yaourt zebre zinc zoom " +
"abricot animal article athlete bagage balcon ballon bambou banane bandit bateau bijoux billet bonbon bouche bougie bourse bracelet branche brioche bronze cactus calcul camion canard canape carafe carmin carton casino cellule cerise chaise chalet chance chapeau charme chemin cheval chiffre cinema citron clavier climat cloche cocon collier combat comete compas confort coquille corail coton couleur courage craint crayon crepon cuisine cymbale damier debris decret demain depart depense dessin diamant docteur domaine dragon eclair ecouter ecurie elegant emotion energie enigme epaule escale essence etoile examen exotique facette falaise famille fantome ferveur festin figure flacon flamme flotte fontaine fortune fourmi fromage galerie galaxie genie genou girafe glacon goeland golfe grange grappe griffe guitare hangar harpon hauteur heroine hibou hirondelle horizon hormone hublot humide humour hydrate icone idylle impulse insecte instant ivresse jachere jardin jasmin javelot jongleur jonquille jouet journal jouster jubile jungle karate kermesse lagune lampe lanterne lavande legende leopard liberte licorne lierre limace lingot lisiere litige losange lotus loupiote lumiere lutrin machine magasin magique mammouth mandarine manguier maniere marbre marelle marin marmotte matelas medaille melange menthe message meteore minute miracle mirage modele moineau molecule monarque montagne morceau moustique muraille musique mystere nageoire nappe narval nectar nenuphar nervure noisette nombril nougat nuance numero nuque oasis obstacle ocelot octobre odeur oeillet olive omelette orange orchidee origine ortie ourson outil ouvrage palace palette panache panier panorama panthere papaye papier paquet parade parasol parfum partie passion pastel pelican pendule perroquet phoenix pigeon pilote pinceau pirate piscine plante platine plumage poireau pommier portail potage poudre poulet praline presage prince prairie prunelle pyramide quartz quenelle quiche quille radeau rafale raisin rameau rapace ravage recolte refuge regard reglisse renard requin reseau ressort rivage rocher romance roseau rosier roulette ruban ruelle ruisseau sabot safran saison salade saphir sardine sauterelle savane scarabee sceptre science scorpion sculpture sentier serpent sextant silence singe sirene soldat sommet soucoupe source souris spirale squale stade statue sucre symbole tableau talisman tambour tangente tanniere tapioca tartine tempete tendre tentacule terreau theatre tiroir toboggan tomate torrent tortue toucan tournesol tracteur trefle tresor triangle tropical trottoir trouble tulipe turbine ukulele univers urgence usine vacarme vaisseau vallon vampire vanille vautour velours vendange verdure vertige vestige viaduc victoire vinaigre violette vipere virtuose visage vitrine volcan voyage walkyrie wagonnet xylophone yaourt zenith zephyr zodiaque").toUpperCase().split(/\s+/).filter(Boolean);

/* ---------- State / persistence ---------- */
const STORE_KEY = "fortBoyardColoc2";
let state = load();

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { duels: DUELS_DEF.map(d => ({
    num: d[0], round: d[1], epreuve: EPREUVES[d[2]].name, j1: d[3], j2: d[4],
    winner: null, bets: []  // bets: {parieur, mise, sur}
  })) };
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

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
  PLAYERS.forEach(p => s[p] = { player: p, duels: 0, gains: 0, parisOk: 0 });
  state.duels.forEach(d => {
    if (d.winner) s[d.winner].duels += 1;
    d.bets.forEach(b => {
      if (!d.winner || !b.sur || !b.mise) return;
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
  document.getElementById("duelsPlayedPill").textContent = `${played} / 24 duels joués`;

  // Podium (top 3)
  const medals = ["🥇", "🥈", "🥉"];
  const order = [1, 0, 2]; // visual: 2nd, 1st, 3rd
  const cls = ["p2", "p1", "p3"];
  document.getElementById("podium").innerHTML = order.map((idx, i) => {
    const p = scores[idx];
    if (!p) return "";
    return `<div class="podium-spot ${cls[i]}">
      <div class="medal">${medals[idx]}</div>
      <div class="pname">${p.player}</div>
      <div class="ppts">${p.total}</div>
    </div>`;
  }).join("");

  // Table
  document.getElementById("rankingBody").innerHTML = scores.map((p, i) => {
    const g = p.gains > 0 ? `<span class="pos">+${p.gains}</span>` : p.gains < 0 ? `<span class="neg">${p.gains}</span>` : "0";
    return `<tr class="rank-${i + 1}">
      <td>${medals[i] || (i + 1)}</td>
      <td class="player">${p.player}</td>
      <td>${p.duels}</td>
      <td>${p.duels}</td>
      <td>${g}</td>
      <td>${p.parisOk}</td>
      <td class="total">${p.total}</td>
    </tr>`;
  }).join("");
}

/* ====================================================================
   DUELS & PARIS
   ==================================================================== */
function spectators(d) { return PLAYERS.filter(p => p !== d.j1 && p !== d.j2); }

function renderDuels() {
  const filter = document.getElementById("roundFilter").value;
  const list = document.getElementById("duelsList");
  const duels = state.duels.filter(d => filter === "all" || String(d.round) === filter);

  list.innerHTML = duels.map(d => {
    const specs = spectators(d);
    const betsHtml = specs.map(sp => {
      const bet = d.bets.find(b => b.parieur === sp) || { parieur: sp, mise: 0, sur: "" };
      let result = `<span class="bet-result pending">en attente</span>`;
      if (d.winner && bet.sur && bet.mise) {
        const ok = bet.sur === d.winner;
        result = ok
          ? `<span class="bet-result win">✅ +${bet.mise}</span>`
          : `<span class="bet-result lose">❌ −${bet.mise}</span>`;
      }
      const clear = (bet.mise || bet.sur)
        ? `<span class="bet-clear" data-clear="${d.num}" data-who="${sp}">effacer</span>` : "";
      return `<div class="bet-row">
        <span class="who">🎲 ${sp}</span>
        mise
        <select data-bet-mise="${d.num}" data-who="${sp}">
          <option value="0" ${bet.mise == 0 ? "selected" : ""}>—</option>
          <option value="1" ${bet.mise == 1 ? "selected" : ""}>1</option>
          <option value="2" ${bet.mise == 2 ? "selected" : ""}>2</option>
          <option value="3" ${bet.mise == 3 ? "selected" : ""}>3</option>
        </select>
        sur
        <select data-bet-sur="${d.num}" data-who="${sp}">
          <option value="" ${!bet.sur ? "selected" : ""}>—</option>
          <option value="${d.j1}" ${bet.sur === d.j1 ? "selected" : ""}>${d.j1}</option>
          <option value="${d.j2}" ${bet.sur === d.j2 ? "selected" : ""}>${d.j2}</option>
        </select>
        ${result} ${clear}
      </div>`;
    }).join("");

    return `<div class="duel ${d.winner ? "done" : ""}">
      <div class="duel-head">
        <div class="duel-num">${d.num}</div>
        <div class="duel-epreuve">${d.epreuve}</div>
        <div class="duel-round">Round ${d.round}</div>
      </div>
      <div class="duel-body">
        <div class="matchup">
          <div class="fighter ${d.winner === d.j1 ? "winner" : ""}" data-win="${d.num}" data-player="${d.j1}">
            ${d.j1}<span class="tag">${d.winner === d.j1 ? "🏆 gagnant" : "cliquer si gagnant"}</span>
          </div>
          <div class="vs">⚔️</div>
          <div class="fighter ${d.winner === d.j2 ? "winner" : ""}" data-win="${d.num}" data-player="${d.j2}">
            ${d.j2}<span class="tag">${d.winner === d.j2 ? "🏆 gagnant" : "cliquer si gagnant"}</span>
          </div>
        </div>
        <div class="bets">
          <div class="bets-title">Paris des spectateurs (avant le duel)</div>
          ${betsHtml}
        </div>
      </div>
    </div>`;
  }).join("");
}

// Duel interactions
document.getElementById("duelsList").addEventListener("click", e => {
  const fighter = e.target.closest(".fighter");
  if (fighter) {
    const d = state.duels.find(x => x.num == fighter.dataset.win);
    d.winner = d.winner === fighter.dataset.player ? null : fighter.dataset.player;
    persistAndRefresh();
    return;
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
  const who = t.dataset.who;
  let bet = d.bets.find(b => b.parieur === who);
  if (!bet) { bet = { parieur: who, mise: 0, sur: "" }; d.bets.push(bet); }
  if (t.dataset.betMise) bet.mise = parseInt(t.value, 10);
  if (t.dataset.betSur) bet.sur = t.value;
  d.bets = d.bets.filter(b => b.mise || b.sur);
  persistAndRefresh();
});
document.getElementById("roundFilter").addEventListener("change", renderDuels);

function persistAndRefresh() { save(); renderDuels(); renderClassement(); }

/* ====================================================================
   AWALÉ
   ==================================================================== */
let awaleIndex = 0;
let awaleRevealed = AWALE_PATTERNS.map(() => Array(10).fill(false));

function renderAwaleNav() {
  document.getElementById("awaleNav").innerHTML = AWALE_PATTERNS
    .map((_, i) => `<button class="${i === awaleIndex ? "active" : ""}" data-p="${i}">${i + 1}</button>`)
    .join("");
}
function renderAwaleBoard() {
  const pat = AWALE_PATTERNS[awaleIndex];
  const rev = awaleRevealed[awaleIndex];
  document.getElementById("awaleTitle").textContent = `Pattern ${awaleIndex + 1} / 7`;
  const count = rev.filter(Boolean).length;
  document.getElementById("awaleProgress").textContent = `${count} / 10 révélées`;
  document.getElementById("awaleBoard").innerHTML = pat.split("").map((ch, i) =>
    `<div class="awale-cell ${rev[i] ? "revealed" : "hidden-cell"}" data-cell="${i}">
       <span class="pos">${i + 1}</span>
       <span class="dot ${ch}"></span>
     </div>`).join("");
}
function renderAwale() { renderAwaleNav(); renderAwaleBoard(); }

document.getElementById("awaleNav").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  awaleIndex = parseInt(b.dataset.p, 10);
  renderAwale();
});
document.getElementById("awaleBoard").addEventListener("click", e => {
  const cell = e.target.closest(".awale-cell");
  if (!cell) return;
  const i = parseInt(cell.dataset.cell, 10);
  awaleRevealed[awaleIndex][i] = !awaleRevealed[awaleIndex][i];
  renderAwaleBoard();
});
document.getElementById("revealNextBtn").addEventListener("click", () => {
  const rev = awaleRevealed[awaleIndex];
  const next = rev.indexOf(false);
  if (next !== -1) { rev[next] = true; renderAwaleBoard(); }
});
document.getElementById("revealAllBtn").addEventListener("click", () => {
  awaleRevealed[awaleIndex] = Array(10).fill(true); renderAwaleBoard();
});
document.getElementById("hideAllBtn").addEventListener("click", () => {
  awaleRevealed[awaleIndex] = Array(10).fill(false); renderAwaleBoard();
});

/* ====================================================================
   SCRABBLE
   ==================================================================== */
function tileHtml(letter) {
  const L = letter.toUpperCase();
  if (L === "?") return `<div class="tile blank">?</div>`;
  return `<div class="tile">${L}<span class="val">${LETTER_VALUES[L] ?? 0}</span></div>`;
}
function wordScore(word) {
  return word.toUpperCase().split("").reduce((s, c) => s + (LETTER_VALUES[c] || 0), 0);
}

let currentWord = "";
let wordVisible = false;

function pickWord(diff) {
  let pool = WORDS;
  if (diff === "easy") pool = WORDS.filter(w => w.length >= 4 && w.length <= 5);
  else if (diff === "medium") pool = WORDS.filter(w => w.length >= 6 && w.length <= 7);
  else if (diff === "hard") pool = WORDS.filter(w => w.length >= 8 && w.length <= 10);
  if (!pool.length) pool = WORDS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function renderTargetWord() {
  const box = document.getElementById("targetWord");
  if (!currentWord) { box.classList.add("hidden"); return; }
  document.getElementById("wordText").textContent = currentWord;
  document.getElementById("wordTiles").innerHTML = currentWord.split("").map(tileHtml).join("");

  // Lettres nécessaires + vérif disponibilité dans le set Scrabble
  const need = {};
  currentWord.split("").forEach(c => need[c] = (need[c] || 0) + 1);
  const warn = Object.entries(need)
    .filter(([c, n]) => n > (LETTER_COUNTS[c] || 0))
    .map(([c, n]) => `${c}×${n} (set FR : ${LETTER_COUNTS[c] || 0})`);
  let meta = `${currentWord.length} lettres • ${wordScore(currentWord)} points`;
  if (warn.length) meta += ` • ⚠️ jokers nécessaires : ${warn.join(", ")}`;
  document.getElementById("wordMeta").textContent = meta;

  box.classList.toggle("hidden", !wordVisible);
}

document.getElementById("genWordBtn").addEventListener("click", () => {
  currentWord = pickWord(document.getElementById("difficulty").value);
  wordVisible = true;
  renderTargetWord();
});
document.getElementById("toggleWordBtn").addEventListener("click", () => {
  if (!currentWord) currentWord = pickWord(document.getElementById("difficulty").value);
  wordVisible = !wordVisible;
  renderTargetWord();
});

// Trouve les mots possibles à partir d'une réserve de lettres
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
document.getElementById("findWordsBtn").addEventListener("click", findWords);
document.getElementById("lettersInput").addEventListener("keydown", e => { if (e.key === "Enter") findWords(); });

function findWords() {
  const raw = document.getElementById("lettersInput").value.toUpperCase().replace(/[^A-Z?]/g, "");
  const out = document.getElementById("foundWords");
  if (!raw) { out.innerHTML = `<div class="fw-empty">Entre des lettres ci-dessus.</div>`; return; }
  const pool = {};
  raw.split("").forEach(c => pool[c] = (pool[c] || 0) + 1);
  const matches = WORDS.filter(w => w.length >= 3 && w.length <= raw.length && canForm(w, pool));
  const uniq = [...new Set(matches)].sort((a, b) => wordScore(b) - wordScore(a) || b.length - a.length);
  if (!uniq.length) { out.innerHTML = `<div class="fw-empty">Aucun mot trouvé avec ces lettres.</div>`; return; }
  out.innerHTML = uniq.slice(0, 40).map(w =>
    `<div class="fw-row"><span class="fw-word">${w}</span><span class="fw-score">${wordScore(w)} pts</span></div>`
  ).join("") + (uniq.length > 40 ? `<div class="fw-empty">… et ${uniq.length - 40} autres</div>` : "");
}

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
      <div class="epreuve-head">
        <span class="epreuve-num">${e.n}</span>
        <span class="epreuve-name">${e.name}</span>
      </div>
      <div class="epreuve-desc">${e.desc}</div>
      <div class="epreuve-mat">🧰 ${e.mat}</div>
    </div>`).join("");
}

/* ---------- Reset ---------- */
document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("Réinitialiser tous les scores, duels et paris ?")) {
    localStorage.removeItem(STORE_KEY);
    state = load();
    persistAndRefresh();
  }
});

/* ---------- Init ---------- */
renderClassement();
renderDuels();
renderAwale();
renderLetterValues();
renderTargetWord();
renderEpreuves();
