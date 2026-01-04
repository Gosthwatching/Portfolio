

# 🌍 Accès en ligne

Vous pouvez accéder directement au portfolio à l'adresse suivante :
👉 https://yarno-chedemail.com/

Pour accéder au dashboard administrateur :
👉 https://yarno-chedemail.com/#/admin/login

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


