import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const ManageMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => { try { const res = await axios.get('http://localhost:4000/api/messages'); setMessages(res.data); } catch (err) { console.error(err); } };

  const handleDelete = async (id: string) => { try { await axios.delete(`http://localhost:4000/api/messages/${id}`); fetchMessages(); } catch (err) { console.error(err); } };

  return (
    <div className="manage-messages">
      <h1>Messages</h1>
      <ul>
        {messages.map(m => (
          <li key={m._id}>
            <strong>{m.name}</strong> ({m.email})
            <p>{m.message}</p>
            <small>{new Date(m.createdAt).toLocaleString()}</small>
            <button onClick={() => handleDelete(m._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMessages;