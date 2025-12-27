const Profile = require('../models/Profile');

async function get() {
  let profile = await Profile.findOne();
  if (!profile) {
    // Créer un profil par défaut si aucun n'existe
    profile = await Profile.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      title: 'Developer',
      bio: 'Passionate developer',
    });
  }
  return profile;
}

async function update(data) {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(data);
  } else {
    Object.assign(profile, data);
    await profile.save();
  }
  return profile;
}

module.exports = { get, update };
