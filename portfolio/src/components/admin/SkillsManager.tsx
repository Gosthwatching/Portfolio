import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Skill {
  _id: string;
  name: string;
  category?: string;
  description?: string;
  icon?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const SkillsManager: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState<Partial<Skill>>({
    name: '',
    category: '',
    description: '',
    icon: '',
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = Array.from(new Set(skills.map((s) => s.category).filter(Boolean)));

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/skills`);
      setSkills(res.data);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du chargement des compétences');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim()) return alert('Le nom est requis');

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editing) {
        await axios.put(`${API_URL}/skills/${editing}`, form, config);
        setEditing(null);
      } else {
        await axios.post(`${API_URL}/skills`, form, config);
      }

      resetForm();
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde de la compétence');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (s: Skill) => {
    setForm({
      name: s.name || '',
      category: s.category || '',
      description: s.description || '',
      icon: s.icon || '',
    });
    setEditing(s._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/skills/${id}`, config);
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression de la compétence');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      category: '',
      description: '',
      icon: '',
    });
    setEditing(null);
  };

  const filteredSkills =
    filterCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Formulaire */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          {editing ? 'Modifier la compétence' : 'Ajouter une compétence'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Catégorie</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Icône</label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'En cours...' : editing ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              filterCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Toutes ({skills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat!)}
              className={`px-3 py-1 rounded-full text-sm ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat} ({skills.filter((s) => s.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Liste des compétences */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold">
            Compétences ({filteredSkills.length})
          </h2>
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-500">Chargement...</div>
        ) : filteredSkills.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Aucune compétence pour le moment</div>
        ) : (
          <div className="divide-y">
            {filteredSkills.map((s) => (
              <div key={s._id} className="p-4 hover:bg-gray-50 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{s.name}</h3>
                    {s.category && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                        {s.category}
                      </span>
                    )}
                  </div>
                  {s.description && (
                    <p className="text-sm text-gray-600 mt-1">{s.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title="Modifier"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    title="Supprimer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;
