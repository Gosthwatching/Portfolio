import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Project {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

const ManageProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '', link: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/projects');
      setProjects(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Title is required');
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      if (form.description) fd.append('description', form.description);
      if (form.link) fd.append('link', form.link);
      if (imageFile) fd.append('image', imageFile);

      if (editing) {
        await axios.put(`http://localhost:4000/api/projects/${editing}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        setEditing(null);
      } else {
        await axios.post('http://localhost:4000/api/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setForm({ title: '', description: '', imageUrl: '', link: '' });
      setImageFile(null);
      fetchProjects();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (p: Project) => { setForm({ title: p.title || '', description: p.description || '', imageUrl: p.imageUrl || '', link: p.link || '' }); setImageFile(null); setEditing(p._id); };
  const handleDelete = async (id: string) => { try { await axios.delete(`http://localhost:4000/api/projects/${id}`); fetchProjects(); } catch (err) { console.error(err); } };

  return (
    <div className="manage-projects">
      <h1>Manage Projects</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" required />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
        <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="Link" />
        <button type="submit">{editing ? 'Update' : 'Add'} Project</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ title: '', description: '', imageUrl: '', link: '' }); }}>Cancel</button>}
      </form>
      <ul>
        {projects.map(p => (
          <li key={p._id}>
            {p.title}
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProjects;