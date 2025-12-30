require('dotenv').config();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cloudinaryConfig = require('../src/config/cloudinary');
const cloudinary = cloudinaryConfig.cloudinary;

const Project = require('../src/models/Project');
const Profile = require('../src/models/Profile');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI not set in environment');
  process.exit(1);
}

async function uploadFile(localFilePath, options = {}) {
  if (!fs.existsSync(localFilePath)) {
    throw new Error(`Local file not found: ${localFilePath}`);
  }
  const ext = path.extname(localFilePath).toLowerCase();
  const resource_type = ext === '.pdf' ? 'raw' : 'image';

  const res = await cloudinary.uploader.upload(localFilePath, {
    resource_type,
    folder: options.folder || 'portfolio/migrated',
    use_filename: true,
    unique_filename: false,
  });
  return res;
}

function extractFilenameFromUrl(url) {
  if (!url) return null;
  // handle /uploads/filename.ext or http://host/uploads/filename.ext
  const m = url.match(/uploads\/(.+)$/);
  if (m) return m[1];
  // if it's already a full cloudinary url, return null
  if (url.includes('res.cloudinary.com')) return null;
  // fallback: last segment
  const parts = url.split('/');
  return parts[parts.length - 1] || null;
}

async function migrateProjects() {
  const projects = await Project.find({});
  console.log(`Found ${projects.length} projects`);
  for (const p of projects) {
    try {
      const fname = extractFilenameFromUrl(p.imageUrl || '');
      if (!fname) continue;
      const localPath = path.join(__dirname, '..', 'uploads', fname);
      const uploadRes = await uploadFile(localPath, { folder: 'portfolio/projects' });
      p.imageUrl = uploadRes.secure_url;
      await p.save();
      console.log(`Project ${p._id} -> uploaded ${fname}`);
    } catch (err) {
      console.warn(`Project ${p._id} skipped: ${err.message}`);
    }
  }
}

async function migrateProfile() {
  const profiles = await Profile.find({});
  console.log(`Found ${profiles.length} profiles`);
  for (const prof of profiles) {
    try {
      const avatarF = extractFilenameFromUrl(prof.avatar || '');
      if (avatarF) {
        const localPath = path.join(__dirname, '..', 'uploads', avatarF);
        const uploadRes = await uploadFile(localPath, { folder: 'portfolio/avatars' });
        prof.avatar = uploadRes.secure_url;
      }
      const cvF = extractFilenameFromUrl(prof.cvUrl || '');
      if (cvF) {
        const localPath = path.join(__dirname, '..', 'uploads', cvF);
        const uploadRes = await uploadFile(localPath, { folder: 'portfolio/cv' });
        prof.cvUrl = uploadRes.secure_url;
      }
      await prof.save();
      console.log(`Profile ${prof._id} updated`);
    } catch (err) {
      console.warn(`Profile ${prof._id} skipped: ${err.message}`);
    }
  }
}

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await migrateProjects();
    await migrateProfile();

    await mongoose.disconnect();
    console.log('Migration finished');
  } catch (err) {
    console.error('Migration error', err);
    process.exit(1);
  }
}

run();
