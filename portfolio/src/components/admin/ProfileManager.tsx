import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSave, FiUser } from 'react-icons/fi';

interface Profile {
  _id?: string;
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  avatar: string;
  cvUrl: string;
}

const ProfileManager: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    avatar: '',
    cvUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/profile');
      if (response.data) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      if (profile._id) {
        // Update existing profile
        await axios.put(
          `http://localhost:4000/api/profile/${profile._id}`,
          profile,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage('✅ Profil mis à jour avec succès !');
      } else {
        // Create new profile
        const response = await axios.post(
          'http://localhost:4000/api/profile',
          profile,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(response.data);
        setMessage('✅ Profil créé avec succès !');
      }
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setMessage('❌ Erreur lors de la sauvegarde du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiUser className="text-3xl text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mon Profil</h2>
            <p className="text-sm text-gray-500">Gérez vos informations personnelles et professionnelles</p>
          </div>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Informations de base */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de base</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Nom *
              </label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Titre / Poste
            </label>
            <input
              type="text"
              name="title"
              value={profile.title}
              onChange={handleChange}
              placeholder="Ex: Développeur Full Stack"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Biographie / Présentation
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Parlez de vous, votre parcours, vos passions..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Coordonnées */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coordonnées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Localisation
              </label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="Ex: Paris, France"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Site web
              </label>
              <input
                type="url"
                name="website"
                value={profile.website}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Réseaux sociaux</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                GitHub
              </label>
              <input
                type="url"
                name="github"
                value={profile.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Twitter / X
              </label>
              <input
                type="url"
                name="twitter"
                value={profile.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Médias */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Médias</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Photo de profil (URL)
              </label>
              <input
                type="url"
                name="avatar"
                value={profile.avatar}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {profile.avatar && (
                <div className="mt-2">
                  <img
                    src={profile.avatar}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                CV (URL)
              </label>
              <input
                type="url"
                name="cvUrl"
                value={profile.cvUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FiSave />
            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileManager;
