import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

interface Project {
  _id: string;
  title: string;
  description?: string;
  longDescription?: string;
  imageUrl?: string;
  link?: string;
  github?: string;
  live?: string;
  tags?: string[];
  techStack?: string[];
}

const API_URL = 'http://localhost:4000/api';

const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Partial<Project>>({
    title: '',
    description: '',
    longDescription: '',
    imageUrl: '',
    link: '',
    github: '',
    live: '',
    tags: [],
    techStack: [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim()) return alert('Le titre est requis');

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append('title', form.title);
      if (form.description) fd.append('description', form.description);
      if (form.longDescription) fd.append('longDescription', form.longDescription);
      if (form.link) fd.append('link', form.link);
      if (form.github) fd.append('github', form.github);
      if (form.live) fd.append('live', form.live);
      if (form.tags) fd.append('tags', JSON.stringify(form.tags));
      if (form.techStack) fd.append('techStack', JSON.stringify(form.techStack));
      if (imageFile) fd.append('image', imageFile);

      const token = localStorage.getItem('token');
      if (editing) {
        await axios.put(`${API_URL}/projects/${editing}`, fd, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });
        setEditing(null);
      } else {
        await axios.post(`${API_URL}/projects`, fd, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });
      }

      resetForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde du projet');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p: Project) => {
    setForm({
      title: p.title || '',
      description: p.description || '',
      longDescription: p.longDescription || '',
      imageUrl: p.imageUrl || '',
      link: p.link || '',
      github: p.github || '',
      live: p.live || '',
      tags: p.tags || [],
      techStack: p.techStack || [],
    });
    setImageFile(null);
    setEditing(p._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression du projet');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      longDescription: '',
      imageUrl: '',
      link: '',
      github: '',
      live: '',
      tags: [],
      techStack: [],
    });
    setImageFile(null);
    setEditing(null);
    setTagInput('');
    setTechInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags?.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...(form.tags || []), tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags?.filter((t) => t !== tag) });
  };

  const addTech = () => {
    if (techInput.trim() && !form.techStack?.includes(techInput.trim())) {
      setForm({ ...form, techStack: [...(form.techStack || []), techInput.trim()] });
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setForm({ ...form, techStack: form.techStack?.filter((t) => t !== tech) });
  };

  return (
    <div className="space-y-6">
      {/* Formulaire */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          {editing ? 'Modifier le projet' : 'Ajouter un projet'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Titre *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Description courte</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Description longue</label>
            <textarea
              value={form.longDescription}
              onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Lien du projet</label>
              <input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">GitHub</label>
              <input
                type="url"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Demo Live</label>
              <input
                type="url"
                value={form.live}
                onChange={(e) => setForm({ ...form, live: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <FiPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Technologies</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <FiPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.techStack?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1"
                >
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)}>
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
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

      {/* Liste des projets */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Projets ({projects.length})</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-500">Chargement...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Aucun projet pour le moment</div>
        ) : (
          <div className="divide-y">
            {projects.map((p) => (
              <div key={p._id} className="p-4 hover:bg-gray-50 flex items-center gap-4">
                {p.imageUrl && (
                  <img src={p.imageUrl} alt={p.title} className="w-16 h-16 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-1">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {p.tags && p.tags.length > 0 && (
                      <div className="flex gap-1">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {p.techStack && p.techStack.length > 0 && (
                      <div className="flex gap-1">
                        {p.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition"
                      title="Voir la démo"
                    >
                      Live Demo
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title="Modifier"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
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

export default ProjectsManager;
