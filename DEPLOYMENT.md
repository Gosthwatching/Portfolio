# 🚀 Guide de Déploiement Complet

Guide pas à pas pour mettre ton portfolio en ligne avec toutes tes données.

---

## 📋 Ce dont tu as besoin

- [ ] Compte GitHub (gratuit)
- [ ] Compte MongoDB Atlas (gratuit)
- [ ] Compte Render (gratuit)
- [ ] Compte Vercel (gratuit)
- [ ] Ton code sur GitHub

---

## Étape 1 : Pousser le code sur GitHub ✅

**Tu l'as déjà fait !** Ton code est sur : `https://github.com/Gosthwatching/Portfolio.git`

---

## Étape 2 : Créer la base de données MongoDB Atlas

### 2.1 Créer un compte
1. Va sur https://www.mongodb.com/cloud/atlas/register
2. Inscris-toi avec ton email (ou GitHub)
3. Choisis **Free Shared Cluster** (M0)

### 2.2 Créer un cluster
1. Sélectionne un provider : **AWS**
2. Région : Choisis la plus proche (ex: Paris, Frankfurt, ou Ireland)
3. Nom du cluster : `Portfolio` (ou laisse par défaut)
4. Clique sur **Create Cluster** (ça prend 3-5 minutes)

### 2.3 Créer un utilisateur
1. Dans le menu gauche → **Database Access**
2. **Add New Database User**
3. Choisis **Password**
   - Username : `portfolioAdmin` (note-le !)
   - Password : Clique sur **Autogenerate Secure Password** (COPIE ET SAUVEGARDE-LE !)
4. Database User Privileges : `Atlas admin` ou `Read and write to any database`
5. **Add User**

### 2.4 Autoriser les connexions
1. Menu gauche → **Network Access**
2. **Add IP Address**
3. **Allow Access from Anywhere** → `0.0.0.0/0`
4. **Confirm**

⚠️ En production, tu devrais limiter aux IPs de Render, mais pour commencer c'est OK.

### 2.5 Récupérer la Connection String
1. Retourne sur **Database** (menu gauche)
2. Ton cluster apparaît → clique sur **Connect**
3. **Connect your application**
4. Driver : **Node.js**, Version : **5.5 or later**
5. Copie la connection string :
   ```
   mongodb+srv://portfolioAdmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **IMPORTANT** : Remplace `<password>` par ton mot de passe généré à l'étape 2.3
7. Ajoute le nom de la base à la fin : `...mongodb.net/portfolio?retryWrites...`

**Exemple final :**
```
mongodb+srv://portfolioAdmin:MonMotDePasse123@cluster0.ab12cd.mongodb.net/portfolio?retryWrites=true&w=majority
```

✅ **SAUVEGARDE CETTE STRING** - Tu en auras besoin !

### 2.6 Migrer tes données locales vers Atlas

**Option A : Exporter/Importer avec MongoDB Compass**

1. Télécharge [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Connecte-toi à ta base **LOCALE** : `mongodb://localhost:27017`
3. Sélectionne la base `portfolio`
4. Pour chaque collection (profiles, projects, skills, etc.) :
   - Clique sur la collection
   - **Export Data** → Format : JSON
   - Sauvegarde le fichier
5. Connecte-toi maintenant à **Atlas** avec la connection string
6. Sélectionne la base `portfolio`
7. Pour chaque collection :
   - **Import Data**
   - Sélectionne le fichier JSON correspondant

**Option B : Avec mongodump/mongorestore (plus rapide)**

```powershell
# 1. Exporter la base locale
mongodump --db portfolio --out C:\backup-portfolio

# 2. Restaurer vers Atlas
mongorestore --uri "mongodb+srv://portfolioAdmin:password@cluster0.xxxxx.mongodb.net/portfolio" C:\backup-portfolio\portfolio
```

Remplace l'URI par ta connection string Atlas.

✅ Vérifie que tes données sont bien dans Atlas (regarde dans Compass ou le site Atlas)

---

## Étape 3 : Déployer le Backend sur Render

### 3.1 Créer un compte Render
1. Va sur https://render.com
2. **Sign Up** avec GitHub (recommandé)
3. Autorise Render à accéder à tes repos

### 3.2 Créer un Web Service
1. Dashboard → **New +** → **Web Service**
2. Connecte ton repo : `Gosthwatching/Portfolio`
3. Si tu ne le vois pas, clique **Configure Account** et autorise l'accès

### 3.3 Configuration du service

**Nom et région :**
- **Name** : `portfolio-backend` (ou ce que tu veux)
- **Region** : Frankfurt (ou le plus proche)
- **Branch** : `master`

**Build settings :**
- **Root Directory** : `backend`
- **Runtime** : `Node`
- **Build Command** : `npm install`
- **Start Command** : `npm start`

**Plan :**
- Sélectionne **Free** (0$/mois)

### 3.4 Variables d'environnement

Clique sur **Advanced** → **Add Environment Variable**

Ajoute ces 4 variables :

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Ta connection string Atlas (étape 2.5) |
| `JWT_SECRET` | Un texte aléatoire long (ex: `Mon_Super_Secret_JWT_2025_ChangeMe!`) |
| `PORT` | `4000` |
| `NODE_ENV` | `production` |

**Exemple MONGODB_URI :**
```
mongodb+srv://portfolioAdmin:MonMotDePasse123@cluster0.ab12cd.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 3.5 Créer le service
1. Clique sur **Create Web Service**
2. Le déploiement démarre (ça prend 5-10 minutes)
3. Attends que le statut passe à **Live** (vert)

### 3.6 Noter l'URL du backend
Une fois déployé, tu vois l'URL en haut :
```
https://portfolio-backend-xxxx.onrender.com
```

✅ **COPIE CETTE URL** - Tu en auras besoin pour le frontend !

**Tester le backend :**
Va sur : `https://ton-url.onrender.com/api/profile`

Tu devrais voir tes données en JSON !

---

## Étape 4 : Préparer le Frontend pour le Déploiement

### 4.1 Créer le fichier de config environnement

```powershell
cd C:\Users\yarno\OneDrive\Bureau\portoflio_v2\Portfolio\portfolio
```

Crée le fichier `.env.production` :

```env
VITE_API_URL=https://ton-backend.onrender.com/api
```

Remplace par ton URL Render de l'étape 3.6 (avec `/api` à la fin).

### 4.2 Modifier le code pour utiliser les variables d'env

**Fichier : `portfolio/src/config/api.ts`**

Remplace tout le contenu par :
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
export default API_URL;
```

**Fichier : `portfolio/src/pages/PortfolioPage.tsx` (ligne ~18)**

Change :
```typescript
const API_URL = "http://localhost:4000/api";
```

En :
```typescript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
```

**Fichier : `portfolio/src/components/resume/Resume.tsx` (ligne ~23)**

Change :
```typescript
const API_URL = "http://localhost:4000/api";
```

En :
```typescript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
```

**Fichier : `portfolio/src/utils/api.ts` (si existe)**

Change l'URL hardcodée en :
```typescript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
```

### 4.3 Pousser les modifications sur GitHub

```powershell
cd C:\Users\yarno\OneDrive\Bureau\portoflio_v2\Portfolio
git add .
git commit -m "Configuration pour déploiement production"
git push origin master
```

---

## Étape 5 : Déployer le Frontend sur Vercel

### 5.1 Créer un compte Vercel
1. Va sur https://vercel.com
2. **Sign Up** avec GitHub
3. Autorise Vercel

### 5.2 Importer le projet
1. Dashboard → **Add New** → **Project**
2. Cherche ton repo : `Portfolio`
3. Clique sur **Import**

### 5.3 Configuration du build

**Framework Preset** : Vite (détecté automatiquement)

**Root Directory** : 
- Clique sur **Edit**
- Sélectionne `portfolio`

**Build Settings** (normalement détectées auto) :
- Build Command : `npm run build` ou `vite build`
- Output Directory : `dist`
- Install Command : `npm install`

**Environment Variables** :
- Clique sur **Environment Variables**
- Ajoute :
  - **Key** : `VITE_API_URL`
  - **Value** : `https://ton-backend.onrender.com/api`
  - **Environments** : Coche `Production`, `Preview`, `Development`

### 5.4 Déployer
1. Clique sur **Deploy**
2. Ça prend 2-3 minutes
3. Une fois terminé, tu vois : **Congratulations!**

### 5.5 Noter l'URL du site
Vercel te donne une URL type :
```
https://portfolio-xxxx.vercel.app
```

✅ **C'est l'URL de ton portfolio en ligne !**

---

## Étape 6 : Configurer CORS sur le Backend

Le frontend (Vercel) doit pouvoir appeler le backend (Render).

### 6.1 Modifier CORS dans Render

1. Va sur ton service Render
2. **Environment** → Ajoute une variable :
   - **Key** : `FRONTEND_URL`
   - **Value** : `https://ton-site.vercel.app`
3. **Save Changes** → Le service redémarre

### 6.2 Mettre à jour le code CORS (optionnel mais recommandé)

**Fichier : `backend/src/app.js`**

Trouve la ligne CORS et modifie :
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

Commit et push :
```powershell
git add .
git commit -m "Configuration CORS pour production"
git push origin master
```

Render redéploiera automatiquement.

---

## Étape 7 : Initialiser l'Admin sur la Prod

### 7.1 Se connecter au serveur Render

1. Dashboard Render → ton service `portfolio-backend`
2. Onglet **Shell** (en haut à droite)
3. Ça ouvre un terminal dans le serveur

### 7.2 Créer l'admin

Dans le terminal Render :
```bash
cd /opt/render/project/src
node scripts/seedAdmin.js
```

Tu verras : `Admin créé avec succès !`

**Identifiants par défaut :**
- Email : `admin@portfolio.com`
- Mot de passe : `admin123`

---

## Étape 8 : Tester le Site en Ligne

### 8.1 Accéder au site
Va sur : `https://ton-site.vercel.app`

Tu devrais voir :
✅ Ton profil
✅ Tes projets
✅ Tes compétences
✅ Tes expériences
✅ Tes formations

### 8.2 Se connecter au dashboard
1. Va sur : `https://ton-site.vercel.app/#/login`
2. Connecte-toi avec `admin@portfolio.com` / `admin123`
3. **Change immédiatement ton mot de passe !**

### 8.3 Tester les fonctionnalités
- Crée un nouveau projet
- Modifie ton profil
- Upload une nouvelle image
- Consulte les messages du formulaire de contact

---

## 🎉 C'EST EN LIGNE !

Ton portfolio est maintenant accessible 24/7 :
- **Site public** : `https://ton-site.vercel.app`
- **Dashboard** : `https://ton-site.vercel.app/#/login`
- **API** : `https://ton-backend.onrender.com/api`

---

## 🔧 Maintenance et Mises à Jour

### Mettre à jour le site
Chaque fois que tu modifies le code et push sur GitHub :

```powershell
git add .
git commit -m "Description des changements"
git push origin master
```

- **Render** redéploie automatiquement le backend
- **Vercel** redéploie automatiquement le frontend

### Sauvegarder la base de données

**Automatique avec Atlas** : Sauvegardes quotidiennes gratuites (restauration payante)

**Manuel :**
```powershell
mongodump --uri "mongodb+srv://..." --out C:\backups\portfolio-$(Get-Date -Format 'yyyy-MM-dd')
```

---

## ⚠️ Limites du Plan Gratuit

### Render (Backend)
- Le service s'endort après 15 min d'inactivité
- Premier accès peut être lent (10-30 secondes de réveil)
- 750h/mois gratuit (suffit pour un site)

**Solution :** Utilise un service de "ping" gratuit comme [UptimeRobot](https://uptimerobot.com) pour le garder actif.

### MongoDB Atlas
- 512 MB de stockage
- Largement suffisant pour un portfolio

### Vercel
- Bande passante illimitée
- 100 GB/mois largement suffisant

---

## 🐛 Résolution de Problèmes

### "Failed to fetch" ou erreurs CORS
- Vérifie que `VITE_API_URL` est correct dans Vercel
- Vérifie que `FRONTEND_URL` est correct dans Render
- Vérifie les logs Render : Dashboard → Logs

### Images ne s'affichent pas
- Les images uploadées localement ne sont PAS sur Render
- Tu dois les re-uploader via le dashboard en ligne
- OU utiliser un service comme Cloudinary (gratuit)

### Backend lent au premier chargement
- Normal avec Render gratuit (service en veille)
- Première requête = 10-30 secondes
- Ensuite ça va vite

### Token JWT invalide
- `JWT_SECRET` doit être identique entre déploiements
- Reconnecte-toi au dashboard

---

## 📞 Support

Si un problème persiste :
1. Vérifie les logs Render : Dashboard → Logs
2. Vérifie la console navigateur (F12)
3. Vérifie que toutes les variables d'env sont correctes

---

**Bon déploiement ! 🚀**
