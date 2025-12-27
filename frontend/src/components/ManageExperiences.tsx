import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Experience {
  _id: string;
  company: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

const ManageExperiences: React.FC = () => {
  const [items, setItems] = useState<Experience[]>([]);
  const [form, setForm] = useState({ company: '', position: '', startDate: '', endDate: '', description: '' });
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => { try { const res = await axios.get('http://localhost:4000/api/experiences'); setItems(res.data); } catch (err) { console.error(err); } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await axios.put(`http://localhost:4000/api/experiences/${editing}`, form); setEditing(null); } else { await axios.post('http://localhost:4000/api/experiences', form); }
      setForm({ company: '', position: '', startDate: '', endDate: '', description: '' });
      fetchItems();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (it: Experience) => { setForm({ company: it.company || '', position: it.position || '', startDate: it.startDate || '', endDate: it.endDate || '', description: it.description || '' }); setEditing(it._id); };
  const handleDelete = async (id: string) => { try { await axios.delete(`http://localhost:4000/api/experiences/${id}`); fetchItems(); } catch (err) { console.error(err); } };

  return (
    <div className="manage-experiences">
      <h1>Manage Experiences</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" required />
        <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Position" />
        <input value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} placeholder="Start Date" />
        <input value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} placeholder="End Date" />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
        <button type="submit">{editing ? 'Update' : 'Add'} Experience</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ company: '', position: '', startDate: '', endDate: '', description: '' }); }}>Cancel</button>}
      </form>
      <ul>
        {items.map(it => (
          <li key={it._id}>
            {it.position} at {it.company}
            <button onClick={() => handleEdit(it)}>Edit</button>
            <button onClick={() => handleDelete(it._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageExperiences;