# 🏰 Fort Boyard — Tournoi

Petite app web (sans installation) pour animer une soirée **Fort Boyard entre amis** : suivi des scores, système de paris, Awalé et générateur de mots Scrabble. Fonctionne pour **n'importe quel groupe**.

Tout tient dans 3 fichiers (`index.html`, `style.css`, `app.js`) et fonctionne **hors-ligne**. Les données (duels, gagnants, paris) sont **sauvegardées automatiquement** dans le navigateur de l'appareil utilisé.

---

## 🚀 Lancer l'app

**Le plus simple :** télécharge le projet et double-clique sur `index.html` — ça s'ouvre dans ton navigateur.

> 📱 Astuce soirée : ouvre l'app sur **un seul appareil** (le téléphone/PC de l'arbitre). C'est lui qui note tout. Les scores y sont mémorisés tout au long de la soirée.

*(Optionnel : on peut aussi l'héberger en ligne via GitHub Pages pour y accéder par une URL.)*

---

## 🎲 Comment l'utiliser pendant la soirée

### 🎬 Au lancement — créer la partie
Au premier écran, tu **saisis les joueurs** (2 minimum, bouton « Ajouter un joueur ») et tu choisis le **nombre de duels** (12, 24, 36 ou 48). Au clic sur **« Lancer la partie »**, les duels sont générés automatiquement : les épreuves et les adversaires tournent de façon équilibrée (chaque joueur joue à peu près autant). Le bouton **« Nouvelle partie »** (en haut) permet de tout recommencer avec un autre groupe.

Une fois la partie lancée, l'app a **5 onglets** :

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
Pattern **généré aléatoirement** (🔴 rouge = J1, 🟡 jaune = J2, ⬜ neutre).
- Choisis le nombre de cases (6/8/10/12) et clique **« Nouveau pattern »** : un pattern aléatoire est créé, toutes cases cachées.
- **Révéler la suivante** : dévoile les cases une à une devant les joueurs.
- **Tout révéler** / **Tout cacher** : pour montrer le pattern complet puis le masquer.
- Tu peux aussi cliquer une case pour la révéler/cacher individuellement.

👉 Déroulé conseillé : génère un pattern, révèle-le case par case, puis **Tout cacher**, et laisse les joueurs le reconstituer avec les bâtonnets.

### 🔤 Scrabble (épreuve « Baguettes »)
1. **Lettres disponibles** : clique sur les lettres que les joueurs possèdent (plusieurs fois pour en avoir plusieurs ; `?` = joker), puis **« Valider le set »**.
2. **Mot cible** : le générateur tire un mot formable **uniquement** avec les lettres validées. *Afficher / Cacher* pour ne pas spoiler, et *Tous les mots possibles* pour voir toutes les options du set.

### 📋 Règles
Le rappel des règles de classement/paris et le détail des 12 épreuves avec le matériel nécessaire.

---

## 👥 Joueurs & épreuves

**Joueurs :** définis librement au lancement (2 minimum).
**12 épreuves** qui tournent automatiquement. Le nombre de duels (12/24/36/48) se choisit au démarrage. À chaque duel, 2 joueurs s'affrontent et les autres sont spectateurs/parieurs.

---

## ♻️ Nouvelle partie

Bouton **« Nouvelle partie »** en haut de l'écran : repart de l'écran de configuration pour rejouer avec un autre groupe (remet tout à zéro).

---

*Bonne soirée, et que le meilleur gagne le trésor ! 🏴‍☠️*
