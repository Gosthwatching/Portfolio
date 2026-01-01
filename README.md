
# 🚀 Portfolio Professionnel Full-Stack (Projet Personnel)

> Ceci est le portfolio personnel de Yarno Chedemail. Il n'est pas destiné à être téléchargé, adapté ou réutilisé par d'autres personnes.

Ce projet a été développé sur-mesure pour mon usage personnel. Merci de ne pas le cloner, ni l'utiliser comme base pour vos propres projets. Toute reproduction, adaptation ou diffusion sans autorisation est interdite.

---

## 📌 Attribution

Ce projet est basé sur un template créé par [Satya Subudhi](https://github.com/satyasubudhi). Le template original a été considérablement étendu avec :
- Backend Node.js/Express complet
- Base de données MongoDB dynamique
- Système CMS avec authentification JWT
- Upload de fichiers (images, CV)
- Interface d'administration complète

---

## ✨ Fonctionnalités

### 🌐 Site Public
- ✅ Page d'accueil avec profil personnalisé (bio bilingue FR/EN)
- ✅ Galerie de projets interactive avec modales détaillées
- ✅ Visualisation des compétences par catégories
- ✅ Section expériences professionnelles multilingue (description_fr, description_en)
- ✅ Section formation académique multilingue (description_fr, description_en)
- ✅ Page CV/Resume téléchargeable en PDF
- ✅ Formulaire de contact avec stockage en base
- ✅ Mode sombre/clair avec animations fluides
- ✅ Design 100% responsive

### 🔐 Dashboard Admin
- ✅ Authentification JWT sécurisée
- ✅ Gestion du profil (avatar, bio, réseaux sociaux, CV)
- ✅ CRUD Projets (images, tags, technologies, liens GitHub/Live)
- ✅ CRUD Compétences (catégories, niveaux)
- ✅ CRUD Expériences professionnelles (description_fr, description_en)
- ✅ CRUD Formations académiques (description_fr, description_en)
- ✅ Consultation des messages de contact
- ✅ Upload de fichiers (images, PDF)

---

## 🛠️ Technologies

### Frontend
```
React 19          TypeScript        Vite
Tailwind CSS 4    Framer Motion     React Router
Axios             React Icons       React Markdown
```

### Backend
```
Node.js           Express.js        MongoDB
Mongoose          JWT               Bcrypt
Multer            Cloudinary        CORS
Dotenv            Streamifier
```

---

## 📦 Installation Rapide

### Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)
- Git

### 1️⃣ Cloner et installer

```bash
# Cloner le projet
git clone https://github.com/Gosthwatching/Portfolio.git
cd Portfolio

# Installer backend
cd backend
npm install

# Installer frontend
cd ../portfolio
npm install
```

### 2️⃣ Configurer le backend

Créer `backend/.env` :

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=votre_secret_jwt_changez_moi_URGENT
NODE_ENV=development

# Cloudinary (stockage images - créer compte gratuit sur cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Pour MongoDB Atlas :**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 3️⃣ Initialiser la base de données

```bash
cd backend
node scripts/seedAdmin.js
```

### 4️⃣ Lancer le projet

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
```
→ API : `http://localhost:4000`

**Terminal 2 - Frontend :**
```bash
cd portfolio
npm run dev
```
→ Site : `http://localhost:5173`

**Accéder au dashboard :**
`http://localhost:5173/#/admin/login`

---

## 📁 Structure du Projet

```
Portfolio/
├── backend/                    # API Node.js/Express
│   ├── src/
│   │   ├── controllers/       # Logique métier (auth, projets, etc.)
│   │   ├── models/            # Modèles Mongoose (Profile, Project, etc.)
│   │   ├── routes/            # Routes API (/api/projects, /api/auth, etc.)
│   │   ├── middlewares/       # Auth JWT, upload Multer
│   │   ├── repositories/      # Requêtes base de données
│   │   ├── db/                # Connexion MongoDB
│   │   └── app.js             # Point d'entrée Express
│   ├── scripts/               # Scripts initialisation DB
│   ├── uploads/               # Images/CV uploadés
│   └── package.json
│
├── portfolio/                  # App React/TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/         # Dashboard (CRUD managers)
│   │   │   ├── resume/        # Page CV
│   │   │   └── shared/        # Composants réutilisables
│   │   ├── pages/             # PortfolioPage, DashboardPage, LoginPage
│   │   ├── context/           # AuthContext, ThemeContext, LanguageContext
│   │   ├── config/            # API config, données statiques
│   │   ├── types/             # Types TypeScript
│   │   └── utils/             # Helpers
│   └── package.json
│
└── README.md
```

---

## 🎮 Scripts Disponibles

### Backend

```bash
npm run dev      # Serveur développement (nodemon + hot-reload)
npm start        # Serveur production
```

### Frontend

```bash
npm run dev      # Vite dev server (hot-reload)
npm run build    # Build production
npm run preview  # Preview du build
npm run lint     # ESLint
```

### Scripts Base de Données

```bash
# Dans backend/
node scripts/seedAdmin.js              # Créer admin par défaut
node scripts/resetAdmin.js             # Réinitialiser mot de passe admin
node scripts/seedPortfolio.js          # Importer données d'exemple
```

---

## 🌐 Déploiement

### Stack Recommandée (100% Gratuit)

| Service | Usage | Plan Gratuit |
|---------|-------|--------------|
| **MongoDB Atlas** | Base de données | 512 MB |
| **Cloudinary** | Stockage images/PDF | 25 GB, 25k transformations |
| **Render** | Backend API | 750h/mois |
| **Vercel** | Frontend | Illimité |

### 1️⃣ MongoDB Atlas

1. Créer compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer cluster **M0 Free**
3. Database Access → Créer utilisateur
4. Network Access → Autoriser `0.0.0.0/0`
5. Récupérer connection string :
   ```
   mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

### 2️⃣ Cloudinary (Stockage Images)

1. Créer compte gratuit sur [Cloudinary](https://cloudinary.com)
2. Dashboard → Account Details
3. Noter :
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3️⃣ Backend sur Render

1. Aller sur [Render](https://render.com)
2. **New → Web Service**
3. Connecter repo GitHub
4. Configuration :
   - **Root Directory** : `backend`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Environment** : Node

5. **Variables d'environnement :**
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=changez_moi_secret_aleatoire
   PORT=4000
   NODE_ENV=production
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

6. Déployer → Noter l'URL : `https://votre-app.onrender.com`

**⚠️ Important Render :** Le plan gratuit met le serveur en veille après 15 minutes d'inactivité. Premier chargement peut prendre 30-60 secondes.

### 4️⃣ Frontend sur Vercel

**Modifier d'abord l'URL de l'API :**

Créer `portfolio/.env.production` :
```env
VITE_API_URL=https://votre-app.onrender.com/api
```

**Déployer :**
```bash
cd portfolio
npm run build

# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

**Ou via GitHub (recommandé) :**
1. Push sur GitHub
2. Importer sur [Vercel](https://vercel.com)
3. **Configuration importante :**
   - **Framework Preset** : Vite
   - **Root Directory** : `portfolio` ⚠️
   - **Environment Variables** : 
     - `VITE_API_URL` = `https://votre-app.onrender.com/api`
4. Deploy

**URL finale :** Vercel vous donnera une URL type `https://votre-portfolio.vercel.app`

---

## 🎨 Configuration Cloudinary

Les images et CV sont maintenant stockés sur Cloudinary (stockage cloud permanent) au lieu du système de fichiers local de Render qui est éphémère.

**Dossiers Cloudinary créés automatiquement :**
- `portfolio/projects` - Images de projets (redimensionnées 1200x800)
- `portfolio/avatars` - Photos de profil (400x400 crop centré visage)
- `portfolio/cv` - Fichiers PDF des CV

**Avantages :**
- ✅ Stockage permanent (pas de perte au redémarrage serveur)
- ✅ CDN mondial (chargement ultra-rapide)
- ✅ Transformations automatiques (resize, crop, optimisation)
- ✅ 25 GB gratuits

---

## 🔐 Sécurité

### ✅ Implémenté
- Mots de passe hashés avec bcrypt (10 rounds)
- Authentification JWT avec expiration 7 jours
- Routes admin protégées par middleware
- CORS configuré
- Validation des entrées utilisateur

### ⚠️ À faire en production
- [ ] Changer identifiants admin par défaut
- [ ] Générer JWT_SECRET fort (32+ caractères aléatoires)
- [ ] Configurer CORS avec origines spécifiques
- [ ] Activer HTTPS obligatoire
- [ ] Limiter tentatives de connexion (rate limiting)
- [ ] Valider/sanitiser uploads de fichiers
- [ ] Configurer CSP (Content Security Policy)

---

## 📚 API Endpoints

### Publiques
```
GET  /api/profile          # Récupérer profil
GET  /api/projects         # Liste projets
GET  /api/skills           # Liste compétences
GET  /api/experiences      # Liste expériences (description_fr, description_en)
GET  /api/education        # Liste formations (description_fr, description_en)
POST /api/messages         # Envoyer message contact
```

### Protégées (JWT required)
```
POST   /api/auth/login            # Login admin
PUT    /api/profile               # Modifier profil
POST   /api/projects              # Créer projet
PUT    /api/projects/:id          # Modifier projet
DELETE /api/projects/:id          # Supprimer projet
GET    /api/messages              # Consulter messages
DELETE /api/messages/:id          # Supprimer message
# + routes similaires pour skills, experiences, education
```

---

## 🐛 Troubleshooting

### Le frontend ne se connecte pas au backend
- Vérifier que le backend tourne sur port 4000
- Vérifier CORS dans `backend/src/app.js`
- Vérifier URL API dans `portfolio/src/config/api.ts`

### "MongooseServerSelectionError"
- Vérifier MongoDB est lancé (`mongod`)
- Vérifier MONGODB_URI dans `.env`
- Pour Atlas : vérifier IP autorisée

### Images ne s'affichent pas
- Vérifier dossier `backend/uploads/` existe
- Vérifier routes statiques dans `app.js` :
  ```javascript
  app.use('/uploads', express.static('uploads'));
  ```

### Token JWT invalide
- Vérifier JWT_SECRET identique dans `.env`
- Vérifier token stocké dans localStorage
- Se reconnecter au dashboard

---


## 📄 Licence

Ce projet est strictement personnel. Toute réutilisation, adaptation ou diffusion sans mon accord est interdite.

---

## 👤 Auteur

Yarno Chedemail 

---

## 🙏 Remerciements

- [Satya Subudhi](https://github.com/satyasubudhi) - Template original
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- Communauté Open Source

---

