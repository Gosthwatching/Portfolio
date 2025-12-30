require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!MONGO_URI) throw new Error('MONGO_URI manquant dans .env');

const Project = require('../src/models/Project');
const Experience = require('../src/models/experience');

const CLOUDINARY_PLACEHOLDER = 'https://res.cloudinary.com/demo/image/upload/v1690000000/placeholder.jpg';

async function fixImages() {
  await mongoose.connect(MONGO_URI);
  console.log('Connecté à MongoDB');

  // Corriger les projets
  const projects = await Project.find({ $or: [
    { imageUrl: { $exists: false } },
    { imageUrl: { $regex: '/uploads/' } },
    { imageUrl: '' },
    { imageUrl: null }
  ] });
  for (const p of projects) {
    p.imageUrl = CLOUDINARY_PLACEHOLDER;
    await p.save();
    console.log(`Projet corrigé: ${p.title}`);
  }

  // Corriger les expériences
  const experiences = await Experience.find({ $or: [
    { image: { $exists: false } },
    { image: { $regex: '/uploads/' } },
    { image: '' },
    { image: null }
  ] });
  for (const e of experiences) {
    e.image = CLOUDINARY_PLACEHOLDER;
    await e.save();
    console.log(`Expérience corrigée: ${e.company}`);
  }

  await mongoose.disconnect();
  console.log('Terminé. Toutes les images locales remplacées par Cloudinary.');
}

fixImages();
