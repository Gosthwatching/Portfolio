# Portfolio Professionnel

Portfolio moderne et responsive avec interface d'administration complète, développé avec React, TypeScript, Node.js et MongoDB.

> **📌 Attribution importante** : Ce projet est basé sur un template créé par [Satya Subudhi](https://github.com/satyasubudhi). Le template original a été adapté et étendu pour utiliser une base de données MongoDB dynamique avec un backend Node.js/Express et un système de gestion de contenu (CMS) complet.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Déploiement](#déploiement)

## 🎯 Aperçu

Ce portfolio professionnel offre une présentation complète de vos projets, compétences et expériences avec :

- **Interface publique** : Présentation de profil, projets, compétences, CV et formulaire de contact
- **Interface d'administration** : Gestion complète du contenu (CRUD pour projets, compétences, expériences, formations)
- **Design responsive** : Compatible tous supports (mobile, tablette, desktop)
- **Thème clair/sombre** : Bascule entre les modes avec transitions fluides

## ✨ Fonctionnalités

### Pages publiques
- ✅ Profil professionnel avec informations personnelles
- ✅ Galerie de projets avec modal détaillé
- ✅ Visualisation des compétences (graphiques circulaires)
- ✅ CV consultable et téléchargeable en PDF
- ✅ CV interactif style CLI (terminal)
- ✅ Formulaire de contact (messages stockés en base de données)
- ✅ Animations fluides et scroll progressif

### Interface d'administration sécurisée
- ✅ Authentification JWT
- ✅ Gestion du profil
- ✅ CRUD Projets (titre, description, tags, images, liens)
- ✅ CRUD Compétences (nom, niveau, catégorie)
- ✅ CRUD Expériences professionnelles
- ✅ CRUD Formations
- ✅ Consultation des messages de contact

## 🛠️ Technologies utilisées

### Frontend
- **React 19** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Outil de build rapide
- **Tailwind CSS 4** - Framework CSS utility-first
- **Framer Motion** - Animations
- **React Router DOM** - Routage
- **Axios** - Requêtes HTTP
- **React Markdown** - Rendu Markdown
- **Lucide React** - Icônes

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB + Mongoose** - Base de données NoSQL
- **JWT** - Authentification
- **Bcrypt** - Hashage de mots de passe
- **Multer** - Upload de fichiers
- **CORS** - Gestion des origines croisées

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn**
- **MongoDB** (local ou Atlas)
- **Git**

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone <url-du-repo>
cd Portfolio
```

### 2. Installer les dépendances

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd portfolio
npm install
```

## ⚙️ Configuration

### Configuration du Backend

1. Créer un fichier `.env` dans le dossier `backend/` :

```env
# Port du serveur
PORT=4000

# URL de connexion MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio
# OU pour MongoDB Atlas :
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio

# Secret pour JWT (générer une clé aléatoire sécurisée)
JWT_SECRET=votre_secret_jwt_ultra_securise_changez_moi

# Environnement
NODE_ENV=development
```

2. Initialiser la base de données avec un admin par défaut :

```bash
cd backend
node scripts/seedAdmin.js
```

**Identifiants par défaut :**
- Email : `admin@portfolio.com`
- Mot de passe : `admin123`

⚠️ **Important** : Changez ces identifiants dès la première connexion !

### Configuration du Frontend

Le frontend se connecte au backend via l'URL définie dans les fichiers :
- `portfolio/src/config/api.ts`
- `portfolio/src/pages/PortfolioPage.tsx`

Par défaut : `http://localhost:4000/api`

## 🎮 Utilisation

### Démarrer le projet en mode développement

#### 1. Démarrer MongoDB

**Avec MongoDB local :**
```bash
mongod
```

**Avec MongoDB Atlas :**
Assurez-vous que votre cluster est actif et l'URL de connexion configurée dans `.env`

#### 2. Démarrer le Backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur `http://localhost:4000`

#### 3. Démarrer le Frontend

```bash
cd portfolio
npm run dev
```

Le site est accessible sur `http://localhost:5173`

### Accéder à l'interface d'administration

1. Aller sur : `http://localhost:5173/admin/login`
2. Se connecter avec les identifiants par défaut ou vos identifiants
3. Gérer votre contenu via le dashboard

## 📁 Structure du projet

```
Portfolio/
├── backend/                 # Serveur Node.js/Express
│   ├── src/
│   │   ├── controllers/    # Logique métier
│   │   ├── models/         # Modèles MongoDB
│   │   ├── routes/         # Routes API
│   │   ├── middlewares/    # Auth, upload, etc.
│   │   ├── repositories/   # Accès aux données
│   │   └── app.js         # Point d'entrée
│   ├── scripts/           # Scripts d'initialisation
│   ├── uploads/           # Fichiers uploadés
│   └── package.json
│
├── portfolio/             # Application React
│   ├── src/
│   │   ├── components/   # Composants React
│   │   │   ├── admin/   # Interfaces d'administration
│   │   │   ├── resume/  # Composants CV
│   │   │   └── shared/  # Composants partagés
│   │   ├── pages/       # Pages principales
│   │   ├── context/     # Contextes React (Auth, Theme)
│   │   ├── config/      # Configuration et données
│   │   ├── types/       # Types TypeScript
│   │   └── utils/       # Utilitaires
│   └── package.json
│
└── README.md            # Ce fichier
```

## 📜 Scripts disponibles

### Backend (`backend/`)

```bash
npm run dev      # Démarrage en mode développement (nodemon)
npm start        # Démarrage en production
```

### Frontend (`portfolio/`)

```bash
npm run dev      # Serveur de développement Vite
npm run build    # Build de production
npm run preview  # Preview du build
npm run lint     # Linter ESLint
```

### Scripts d'initialisation (`backend/scripts/`)

```bash
node scripts/seedAdmin.js              # Créer un admin par défaut
node scripts/resetAdmin.js             # Réinitialiser le mot de passe admin
node scripts/seedPortfolio.js          # Données d'exemple
node scripts/seedFromPortfolioData.js  # Import depuis portfolioData.ts
```

## 🌐 Déploiement

### Backend

**Options recommandées :**
- [Render](https://render.com)
- [Railway](https://railway.app)
- [Heroku](https://heroku.com)
- [DigitalOcean](https://digitalocean.com)

**Variables d'environnement à configurer :**
- `MONGODB_URI`
- `JWT_SECRET`
- `PORT`
- `NODE_ENV=production`

### Frontend

**Options recommandées :**
- [Vercel](https://vercel.com) (recommandé pour React/Vite)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)

**Configuration :**
1. Mettre à jour l'URL du backend dans `src/config/api.ts`
2. Build : `npm run build`
3. Déployer le dossier `dist/`

### Base de données

**MongoDB Atlas** (gratuit pour commencer) :
1. Créer un cluster sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Configurer l'accès réseau (whitelist IP)
3. Copier l'URL de connexion dans `MONGODB_URI`

## 🔐 Sécurité

- Les mots de passe sont hashés avec bcrypt
- Authentification JWT pour l'administration
- Routes admin protégées par middleware
- CORS configuré pour les origines autorisées
- Variables d'environnement pour les secrets

⚠️ **À faire avant la mise en production :**
- Changer les identifiants admin par défaut
- Générer un JWT_SECRET fort et unique
- Configurer CORS avec les bonnes origines
- Activer HTTPS
- Limiter les tentatives de connexion

## 📝 Licence

Ce projet est développé dans un cadre éducatif.

## 👤 Auteur

Votre nom - Portfolio professionnel

---

**Bon développement ! 🚀**
