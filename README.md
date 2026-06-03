# 🏰 Fort Boyard — Tournoi Coloc

Petite app web (sans installation) pour animer une soirée **Fort Boyard entre colocs** : suivi des scores, système de paris, patterns d'Awalé et générateur de mots Scrabble.

Tout tient dans 3 fichiers (`index.html`, `style.css`, `app.js`) et fonctionne **hors-ligne**. Les données (duels, gagnants, paris) sont **sauvegardées automatiquement** dans le navigateur de l'appareil utilisé.

---

## 🚀 Lancer l'app

**Le plus simple :** télécharge le projet et double-clique sur `index.html` — ça s'ouvre dans ton navigateur.

> 📱 Astuce soirée : ouvre l'app sur **un seul appareil** (le téléphone/PC de l'arbitre). C'est lui qui note tout. Les scores y sont mémorisés tout au long de la soirée.

*(Optionnel : on peut aussi l'héberger en ligne via GitHub Pages pour y accéder par une URL.)*

---

## 🎲 Comment l'utiliser pendant la soirée

L'app a **5 onglets** :

### 🏆 Classement
Le podium et le tableau se calculent **tout seuls** à partir des duels et des paris. Rien à remplir ici.
`TOTAL = Points Duels + Gains Paris (net)`. En cas d'égalité : 1) duels gagnés, 2) paris réussis, 3) pile ou face.

### ⚔️ Duels & Paris — *l'onglet principal de la soirée*
Les 24 duels sont déjà préparés (Round 1 & 2). Pour chaque duel :

1. **Avant le duel** → les **2 spectateurs** (ceux qui ne jouent pas) posent leur pari : une **mise de 1 à 3 points** + sur **quel joueur** ils parient.
2. **Après le duel** → clique sur le **gagnant**. Tout se règle automatiquement :
   - pari **gagné** → **+mise** ✅
   - pari **perdu** → **−mise** ❌ *(on peut parier à crédit, le solde peut être négatif)*

Le classement se met à jour instantanément.

### 🔴 Awalé
Les 7 patterns à reconstituer (🔴 rouge = J1, 🟡 jaune = J2, ⬜ barrette grise).
- **Révéler la suivante** : dévoile les cases une à une devant les joueurs.
- **Tout révéler** / **Tout cacher** : pour montrer le pattern complet puis le masquer.
- Tu peux aussi cliquer une case pour la révéler/cacher individuellement.

👉 Déroulé conseillé : révèle le pattern case par case, puis **Tout cacher**, et laisse les joueurs le reconstituer avec les bâtonnets.

### 🔤 Scrabble (épreuve « Baguettes »)
- **Générateur de mot cible** : tire un mot au hasard selon la difficulté (4-5 / 6-7 / 8-10 lettres). Affiche les jetons Scrabble à mélanger au centre + leur valeur, et **prévient s'il faut un joker**. Bouton *Afficher / Cacher* pour ne pas spoiler les joueurs.
- **Trouve les mots possibles** : entre tes lettres (`?` = joker) pour lister les mots réalisables.

### 📋 Règles
Le rappel des règles de classement/paris et le détail des 12 épreuves avec le matériel nécessaire.

---

## 👥 Joueurs & épreuves

**Joueurs :** Loulou · Flo · Livliv · El Pet
**12 épreuves**, jouées chacune 2 fois → **24 duels**. Chaque joueur dispute 12 duels ; les 2 autres sont spectateurs/parieurs.

---

## ♻️ Réinitialiser

Bouton **« Réinitialiser le tournoi »** en bas de l'onglet Classement : remet tous les scores, duels et paris à zéro (utile pour rejouer une autre soirée).

---

*Bonne soirée, et que le meilleur gagne le trésor ! 🏴‍☠️*
