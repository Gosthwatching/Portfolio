import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Education {
  _id: string;
  school: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const EducationManager: React.FC = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [form, setForm] = useState<Partial<Education>>({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/education`);
      setEducations(res.data);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du chargement des formations');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.school?.trim()) return alert('Le nom de l\'école est requis');

    try {
      setLoading(true);
      const payload = {
        ...form,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
      };

      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editing) {
        await axios.put(`${API_URL}/education/${editing}`, payload, config);
        setEditing(null);
      } else {
        await axios.post(`${API_URL}/education`, payload, config);
      }
      resetForm();
      fetchEducations();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (edu: Education) => {
    setForm({
      school: edu.school,
      degree: edu.degree || '',
      field: edu.field || '',
      startDate: edu.startDate ? edu.startDate.split('T')[0] : '',
      endDate: edu.endDate ? edu.endDate.split('T')[0] : '',
      description: edu.description || '',
    });
    setEditing(edu._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette formation ?')) return;
    try {
      await axios.delete(`${API_URL}/education/${id}`);
      fetchEducations();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setForm({ school: '', degree: '', field: '', startDate: '', endDate: '', description: '' });
    setEditing(null);
  };

  const formatDate = (date?: string) => {
    if (!date) return 'Présent';
    return new Date(date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Formulaire */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          {editing ? 'Modifier la formation' : 'Ajouter une formation'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">École/Université *</label>
              <input
                type="text"
                value={form.school}
                onChange={(e) => setForm({ ...form, school: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Diplôme</label>
              <input
                type="text"
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Domaine d'études</label>
            <input
              type="text"
              value={form.field}
              onChange={(e) => setForm({ ...form, field: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
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
              <p className="text-xs text-gray-500 mt-1">Laisser vide si en cours</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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
        <h2 className="text-xl font-bold mb-4">Formations ({educations.length})</h2>
        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : educations.length === 0 ? (
          <p className="text-center text-gray-500">Aucune formation</p>
        ) : (
          <div className="space-y-4">
            {educations.map((edu) => (
              <div key={edu._id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree || edu.school}</h3>
                    {edu.degree && <p className="text-sm text-gray-600">{edu.school}</p>}
                    {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Modifier"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(edu._id)}
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

export default EducationManager;
