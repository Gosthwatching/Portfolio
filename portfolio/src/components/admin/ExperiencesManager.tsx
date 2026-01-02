import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Experience {
  _id: string;
  company: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  description_fr?: string;
  description_en?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const ExperiencesManager: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [form, setForm] = useState<Partial<Experience>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    description_fr: '',
    description_en: '',
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/experiences`);
      setExperiences(res.data);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du chargement des expériences');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company?.trim()) return alert('Le nom de l\'entreprise est requis');

    try {
      setLoading(true);
      const payload = {
        ...form,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
      };

      const token = localStorage.getItem('admin_token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editing) {
        await axios.put(`${API_URL}/experiences/${editing}`, payload, config);
        setEditing(null);
      } else {
        await axios.post(`${API_URL}/experiences`, payload, config);
      }
      resetForm();
      fetchExperiences();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (exp: Experience) => {
    setForm({
      company: exp.company,
      position: exp.position || '',
      startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      description: exp.description || '',
      description_fr: exp.description_fr || '',
      description_en: exp.description_en || '',
    });
    setEditing(exp._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette expérience ?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${API_URL}/experiences/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchExperiences();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setForm({ company: '', position: '', startDate: '', endDate: '', description: '', description_fr: '', description_en: '' });
    setEditing(null);
  };

  const formatDate = (date?: string) => {
    if (!date || date === '' || date === undefined || date === null) return 'En cours';
    const parts = date.split('-');
    let month = '', year = '';
    if (parts.length === 3) {
      year = parts[0].slice(-2);
      month = parts[1];
    } else if (parts.length === 2) {
      year = parts[0].slice(-2);
      month = parts[1];
    } else if (parts.length === 1 && parts[0]) {
      year = parts[0].slice(-2);
      month = '';
    } else {
      return 'En cours';
    }
    // Vérifie que le mois est entre 01 et 12 et que l'année est numérique
    if (!year || isNaN(Number(year))) return 'En cours';
    if (!month || isNaN(Number(month)) || Number(month) < 1 || Number(month) > 12) {
      return year ? `/${year}` : 'En cours';
    }
    return `${month.padStart(2, '0')}/${year}`;
  };

  return (
    <div className="space-y-6">
      {/* Formulaire */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          {editing ? 'Modifier l\'expérience' : 'Ajouter une expérience'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Entreprise *</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Poste</label>
              <input
                type="text"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Date de début</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Date de fin</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Laisser vide si toujours en cours</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Description (Français)</label>
            <textarea
              value={form.description_fr}
              onChange={(e) => setForm({ ...form, description_fr: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Description (Anglais)</label>
            <textarea
              value={form.description_en}
              onChange={(e) => setForm({ ...form, description_en: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : editing ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Expériences ({experiences.length})</h2>
        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : experiences.length === 0 ? (
          <p className="text-center text-gray-500">Aucune expérience</p>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp._id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position || exp.company}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </p>
                    {exp.description_fr && (
                      <p className="text-sm text-gray-700 mt-2">Description (FR) : {exp.description_fr}</p>
                    )}
                    {exp.description_en && (
                      <p className="text-sm text-gray-700 mt-2">Description (EN) : {exp.description_en}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Modifier"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Supprimer"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperiencesManager;
