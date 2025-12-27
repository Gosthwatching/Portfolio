import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Education {
  _id: string;
  school: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

const ManageEducation: React.FC = () => {
  const [items, setItems] = useState<Education[]>([]);
  const [form, setForm] = useState({ school: '', degree: '', field: '', startDate: '', endDate: '', description: '' });
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => { try { const res = await axios.get('http://localhost:4000/api/education'); setItems(res.data); } catch (err) { console.error(err); } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await axios.put(`http://localhost:4000/api/education/${editing}`, form); setEditing(null); } else { await axios.post('http://localhost:4000/api/education', form); }
      setForm({ school: '', degree: '', field: '', startDate: '', endDate: '', description: '' });
      fetchItems();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (it: Education) => { setForm({ school: it.school || '', degree: it.degree || '', field: it.field || '', startDate: it.startDate || '', endDate: it.endDate || '', description: it.description || '' }); setEditing(it._id); };
  const handleDelete = async (id: string) => { try { await axios.delete(`http://localhost:4000/api/education/${id}`); fetchItems(); } catch (err) { console.error(err); } };

  return (
    <div className="manage-education">
      <h1>Manage Education</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} placeholder="School" required />
        <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} placeholder="Degree" />
        <input value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} placeholder="Field" />
        <input value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} placeholder="Start Date" />
        <input value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} placeholder="End Date" />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
        <button type="submit">{editing ? 'Update' : 'Add'} Education</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ school: '', degree: '', field: '', startDate: '', endDate: '', description: '' }); }}>Cancel</button>}
      </form>
      <ul>
        {items.map(it => (
          <li key={it._id}>
            {it.school} - {it.degree}
            <button onClick={() => handleEdit(it)}>Edit</button>
            <button onClick={() => handleDelete(it._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEducation;