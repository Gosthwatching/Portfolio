import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Skill {
  _id: string;
  name: string;
  level: string;
  category: string;
}

const ManageSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState({ name: '', level: '', category: '' });
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:4000/api/skills/${editing}`, form);
        setEditing(null);
      } else {
        await axios.post('http://localhost:4000/api/skills', form);
      }
      setForm({ name: '', level: '', category: '' });
      fetchSkills();
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleEdit = (skill: Skill) => {
    setForm({ name: skill.name, level: skill.level, category: skill.category });
    setEditing(skill._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/skills/${id}`);
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <div className="manage-skills">
      <h1>Manage Skills</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Level"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <button type="submit">{editing ? 'Update' : 'Add'} Skill</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', level: '', category: '' }); }}>Cancel</button>}
      </form>
      <ul>
        {skills.map(skill => (
          <li key={skill._id}>
            {skill.name} - {skill.level} - {skill.category}
            <button onClick={() => handleEdit(skill)}>Edit</button>
            <button onClick={() => handleDelete(skill._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSkills;